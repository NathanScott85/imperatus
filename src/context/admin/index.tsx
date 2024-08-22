import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useMemo,
} from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_ALL_USERS } from '../../graphql/get-users';
import { GET_ALL_PRODUCTS } from '../../graphql/products';
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

interface Product {
    id: number;
    name: string;
    price: number;
    category: {
        name: string;
    };
    stock: {
        amount: number;
        instock: string;
        soldout: string;
    };
}

interface AdminContextProps {
    users: User[] | null;
    products: Product[] | null;
    loading: boolean;
    error: any;
    totalCount: number;
    totalPages: number;
    currentPage: number;
    setPage: (page: number) => void;
    setSearch: (search: string) => void;
    fetchUsers: () => void;
    fetchProducts: () => void;
    resetPagination: () => void;
    createCategory: (variables: {
        name: string;
        description: string;
        img: File;
    }) => Promise<void>;
    categoryLoading: boolean;
    categoryError: string | null;
    categorySuccess: string | null;
}

const AdminContext = createContext<AdminContextProps | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');

    // State for category creation
    const [categoryError, setCategoryError] = useState<string | null>(null);
    const [categorySuccess, setCategorySuccess] = useState<string | null>(null);

    const queryVariables = useMemo(
        () => ({ page: currentPage, limit: 10, search }),
        [currentPage, search],
    );

    const resetPagination = () => {
        setCurrentPage(1);
    };

    const [
        fetchUsers,
        { loading: usersLoading, error: usersError, data: usersData },
    ] = useLazyQuery(GET_ALL_USERS, {
        variables: queryVariables,
        fetchPolicy: 'cache-and-network',
        onCompleted: (data) => {
            setTotalCount(data.users.totalCount);
            setTotalPages(data.users.totalPages);
        },
    });

    const [
        fetchProducts,
        { loading: productsLoading, error: productsError, data: productsData },
    ] = useLazyQuery(GET_ALL_PRODUCTS, {
        variables: queryVariables,
        fetchPolicy: 'cache-and-network',
        onCompleted: (data) => {
            setTotalCount(data.products.totalCount);
            setTotalPages(data.products.totalPages);
        },
    });

    // Mutation for creating a category
    const [createCategoryMutation, { loading: categoryLoading }] = useMutation(
        CREATE_CATEGORY,
        {
            onCompleted: () => {
                setCategorySuccess('Category created successfully!');
                setCategoryError(null);
            },
            onError: (error) => {
                setCategoryError(error.message);
                setCategorySuccess(null);
            },
        },
    );

    const createCategory = async (variables: {
        name: string;
        description: string;
        img: File;
    }) => {
        try {
            await createCategoryMutation({ variables });
        } catch (error) {
            console.error('Failed to create category:', error);
            throw error;
        }
    };

    const users = usersData ? usersData.users.users : [];
    const products = productsData ? productsData.products.products : [];
    const loading = usersLoading || productsLoading;
    const error = usersError || productsError;

    return (
        <AdminContext.Provider
            value={{
                users,
                products,
                loading,
                error,
                totalCount,
                totalPages,
                currentPage,
                setPage: setCurrentPage,
                setSearch,
                fetchUsers,
                fetchProducts,
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
