import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useMemo,
} from 'react';
import { useLazyQuery } from '@apollo/client';
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
    users: User[] | null;
    loading: boolean;
    error: any;
    totalCount: number;
    totalPages: number;
    currentPage: number;
    setPage: (page: number) => void;
    setSearch: (search: string) => void;
    fetchUsers: () => void;
}

const AdminContext = createContext<AdminContextProps | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');

    const queryVariables = useMemo(
        () => ({ page, limit: 10, search }),
        [page, search],
    );

    const [fetchUsers, { loading, error, data }] = useLazyQuery(GET_ALL_USERS, {
        variables: queryVariables,
        fetchPolicy: 'cache-and-network',
    });

    const users = data ? data.users.users : null;
    const totalCount = data ? data.users.totalCount : 0;
    const totalPages = data ? data.users.totalPages : 0;
    const currentPage = data ? data.users.currentPage : 1;

    return (
        <AdminContext.Provider
            value={{
                users,
                loading,
                error,
                totalCount,
                totalPages,
                currentPage,
                setPage,
                setSearch,
                fetchUsers, // Pass the fetchUsers function through context
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
