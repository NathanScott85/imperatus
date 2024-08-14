import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from 'react';
import { useAppContext } from '..';
import { useQuery, gql } from '@apollo/client';
import { GET_ALL_USERS } from '../../graphql/get-users';

interface User {
    id: number;
    fullname: string;
    email: string;
    dob?: string;
    phone?: string;
    address?: string;
    city?: string;
    postcode?: string;
    emailVerified?: boolean;
}

interface AdminContextProps {
    isAdminOrOwner: boolean;
    users: User[] | null;
    loading: boolean;
    error: any;
}

const AdminContext = createContext<AdminContextProps | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const { isAdminOrOwner } = useAppContext();
    const { loading, error, data } = useQuery(GET_ALL_USERS, {
        skip: !isAdminOrOwner,
    });

    const users = data ? data.users : null;

    return (
        <AdminContext.Provider
            value={{
                isAdminOrOwner,
                users,
                loading,
                error,
            }}
        >
            {children}
        </AdminContext.Provider>
    );
};

export const useAdminContext = () => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error('useAdminContext must be used within an AdminProvider');
    }
    return context;
};
