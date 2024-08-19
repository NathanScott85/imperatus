import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useMemo,
} from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_ALL_USERS } from '../../graphql/get-users';
import { GET_ALL_PRODUCTS } from '../../graphql/products'; // Import the products query

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
    fetchProducts: () => void; // Add fetchProducts to the context
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

    const [
        fetchUsers,
        { loading: usersLoading, error: usersError, data: usersData },
    ] = useLazyQuery(GET_ALL_USERS, {
        variables: queryVariables,
        fetchPolicy: 'cache-and-network',
    });

    const [
        fetchProducts,
        { loading: productsLoading, error: productsError, data },
    ] = useLazyQuery(GET_ALL_PRODUCTS, {
        variables: { page: 1, limit: 10 },
        fetchPolicy: 'cache-and-network',
    });

    const users = usersData ? usersData.users.users : null;
    const products = data ? data.products.products : [];
    const totalCount = usersData ? usersData.users.totalCount : 0;
    const totalPages = usersData ? usersData.users.totalPages : 0;
    const currentPage = usersData ? usersData.users.currentPage : 1;

    return (
        <AdminContext.Provider
            value={{
                users,
                products,
                loading: usersLoading || productsLoading,
                error: usersError || productsError,
                totalCount,
                totalPages,
                currentPage,
                setPage,
                setSearch,
                fetchUsers,
                fetchProducts, // Pass fetchProducts through the context
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
