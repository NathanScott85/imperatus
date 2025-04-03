import React, {
    createContext,
    useContext,
    useState,
    useMemo,
    ReactNode,
} from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_ALL_USERS } from '../../graphql/get-users';
import { CREATE_CATEGORY } from '../../graphql/categories';

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
    page: number;
    setPage: (page: number) => void;
    search: string;
    setSearch: (search: string) => void;
    fetchUsers: () => void;
    resetPagination: () => void;
    createCategory: (variables: {
        name: string;
        description: string;
        img: File;
    }) => Promise<{ success: boolean; message: string; category: any }>;
    categoryLoading: boolean;
    categoryError: string | null;
    categorySuccess: string | null;
}

const AdminContext = createContext<AdminContextProps | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [categoryError, setCategoryError] = useState<string | null>(null);
    const [categorySuccess, setCategorySuccess] = useState<string | null>(null);

    const queryVariables = useMemo(() => ({ page, limit: 10, search }), [page, search]);

    const resetPagination = () => {
        setPage(1);
    };

    const [fetchUsers, { loading: usersLoading, error: usersError, data: usersData }] = useLazyQuery(GET_ALL_USERS, {
        variables: queryVariables,
        fetchPolicy: 'cache-and-network',
        onCompleted: (data) => {
            setTotalCount(data.users.totalCount);
            setTotalPages(data.users.totalPages);
        },
    });

    const [createCategoryMutation, { loading: categoryLoading }] = useMutation(CREATE_CATEGORY);

    const createCategory = async (variables: {
        name: string;
        description: string;
        img: File;
    }): Promise<{ success: boolean; message: string; category: any }> => {
        try {
            const { data } = await createCategoryMutation({ variables });

            if (data?.createCategory) {
                setCategorySuccess('Category created successfully!');
                setCategoryError(null);
                return {
                    success: true,
                    message: 'Category created successfully!',
                    category: data.createCategory,
                };
            } else {
                throw new Error('Failed to create category.');
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            setCategoryError(errorMessage);
            setCategorySuccess(null);
            return {
                success: false,
                message: errorMessage,
                category: null,
            };
        }
    };

    const users = usersData ? usersData.users.users : [];
    const loading = usersLoading;
    const error = usersError;

    return (
        <AdminContext.Provider
            value={{
                users,
                loading,
                error,
                totalCount,
                totalPages,
                page,
                setPage,
                search,
                setSearch,
                fetchUsers,
                resetPagination,
                createCategory,
                categoryLoading,
                categoryError,
                categorySuccess,
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
