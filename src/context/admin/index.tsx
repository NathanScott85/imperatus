import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useMemo,
} from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_ALL_USERS } from '../../graphql/get-users';
import { GET_ALL_PRODUCTS } from '../../graphql/products';

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
}

const AdminContext = createContext<AdminContextProps | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');

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
