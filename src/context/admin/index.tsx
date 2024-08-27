import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useMemo,
} from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_ALL_USERS } from '../../graphql/get-users';
import {
    CREATE_PRODUCT_MUTATION,
    GET_ALL_PRODUCTS,
} from '../../graphql/products';
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

interface Stock {
    amount: number;
    instock: string;
    soldout: string;
    preorder: boolean;
    sold?: number;
}

interface Product {
    id: number;
    name: string;
    price: number;
    type: string;
    rrp: number;
    description?: string;
    img: {
        url: string;
    };
    category: {
        name: string;
    };
    stock: Stock;
    preorder: boolean;
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
    }) => Promise<{ success: boolean; message: string; category: any }>;
    createProduct: (variables: {
        name: string;
        price: number;
        type: string;
        description?: string;
        img: File;
        categoryId: number;
        stockAmount: number;
        preorder: boolean;
        rrp?: number;
    }) => Promise<{
        success: boolean;
        message: string;
        product: Product | null;
    }>;
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

    const [createProductMutation] = useMutation(CREATE_PRODUCT_MUTATION);

    const createProduct = async (variables: {
        name: string;
        price: number;
        type: string;
        description?: string;
        img: File;
        categoryId: number;
        stockAmount: number;
        preorder: boolean;
        rrp?: number;
    }): Promise<{ success: boolean; message: string; product: any }> => {
        try {
            const stock = {
                amount: variables.stockAmount,
                sold: 0,
                instock: variables.stockAmount > 0 ? 'In Stock' : 'Sold Out',
                soldout: variables.stockAmount > 0 ? 'Sold Out' : 'In Stock',
                preorder: variables.preorder ? 'true' : 'false',
            };

            const { data } = await createProductMutation({
                variables: {
                    ...variables,
                    stock, // Pass the stock input
                },
            });
            console.log(data?.createProduct, 'data?.createProduct');
            if (data?.createProduct) {
                return {
                    success: true,
                    message: 'Product created successfully!',
                    product: data.createProduct,
                };
            } else {
                throw new Error('Failed to create product.');
            }
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : 'Unknown error';
            return {
                success: false,
                message: errorMessage,
                product: null,
            };
        }
    };

    const [createCategoryMutation, { loading: categoryLoading }] =
        useMutation(CREATE_CATEGORY);

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
            const errorMessage =
                error instanceof Error ? error.message : 'Unknown error';
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
                createProduct, // <-- Expose createProduct here
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
