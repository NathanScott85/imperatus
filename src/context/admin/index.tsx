import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useMemo,
} from 'react';
import { useAppContext } from '..';
import { useQuery } from '@apollo/client';
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
    totalCount: number;
    totalPages: number;
    currentPage: number;
    setPage: (page: number) => void;
    setSearch: (search: string) => void;
}

const AdminContext = createContext<AdminContextProps | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const { isAdminOrOwner } = useAppContext();
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const queryVariables = useMemo(
        () => ({ page, limit: 10, search }),
        [page, search],
    );

    const { loading, error, data } = useQuery(GET_ALL_USERS, {
        skip: !isAdminOrOwner,
        variables: queryVariables,
        fetchPolicy: 'cache-and-network', // Optimized fetching strategy
        onError: (error) => {
            console.error('Error fetching users:', error.message); // Improved error logging
        },
    });
    const users = data ? data.users.users : null;
    const totalCount = data ? data.users.totalCount : 0;
    const totalPages = data ? data.users.totalPages : 0;
    const currentPage = data ? data.users.currentPage : 1;

    return (
        <AdminContext.Provider
            value={{
                isAdminOrOwner,
                users,
                loading,
                error,
                totalCount,
                totalPages,
                currentPage,
                setPage,
                setSearch,
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
