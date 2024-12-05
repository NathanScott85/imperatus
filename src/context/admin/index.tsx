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
    CREATE_PRODUCT,
    GET_ALL_PRODUCTS,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
    GET_ALL_PRODUCT_TYPES,
    CREATE_PRODUCT_TYPE,
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
    productTypeId: string;
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

interface ProductType {
    id: number;
    name: string;
}

interface AdminContextProps {
    users: User[] | null;
    products: Product[] | null;
    productTypes: ProductType[] | null;
    loading: boolean;
    error: any;
    totalCount: number;
    totalPages: number;
    currentPage: number;
    setPage: ( page: number ) => void;
    setSearch: ( search: string ) => void;
    fetchUsers: () => void;
    fetchProducts: () => void;
    fetchProductTypes: () => void;
    resetPagination: () => void;
    createProductType: ( variables: { name: string } ) => Promise<{ success: boolean; message: string; productType: ProductType | null }>;
    createCategory: ( variables: {
        name: string;
        description: string;
        img: File;
    } ) => Promise<{ success: boolean; message: string; category: any }>;
    createProduct: (
        variables: {
            name: string;
            price: string | number;
            productTypeId: number;
            img: File;
            categoryId: number;
            stock: {
                amount: number;
                sold: number;
                instock: string;
                soldout: string;
                preorder: boolean;
            };
            preorder: boolean;
            description: string;
            rrp?: string | number;
        }
    ) => Promise<{ success: boolean; message: string; product: Product | null }>;

    updateProduct: ( variables: {
        id: number;
        name: string;
        price: number;
        productTypeId: number;
        description?: string;
        img?: File;
        categoryId: number;
        stockAmount: number;
        stockSold: number;
        stockInstock: string;
        stockSoldout: string;
        preorder: boolean;
        rrp?: number;
    } ) => Promise<{
        success: boolean;
        message: string;
        product: Product | null
    }>;
    deleteProduct: ( id: number ) => Promise<{ success: boolean; message: string }>;
    categoryLoading: boolean;
    categoryError: string | null;
    categorySuccess: string | null;
}

const AdminContext = createContext<AdminContextProps | undefined>( undefined );

export const AdminProvider: React.FC<{ children: ReactNode }> = ( { children } ) => {
    const [totalCount, setTotalCount] = useState( 0 );
    const [totalPages, setTotalPages] = useState( 1 );
    const [currentPage, setCurrentPage] = useState( 1 );
    const [search, setSearch] = useState( '' );
    const [products, setProducts] = useState<Product[]>( [] );
    const [productTypes, setProductTypes] = useState<ProductType[]>( [] );
    const [categoryError, setCategoryError] = useState<string | null>( null );
    const [categorySuccess, setCategorySuccess] = useState<string | null>( null );

    const queryVariables = useMemo( () => ( { page: currentPage, limit: 10, search } ), [currentPage, search] );

    const resetPagination = () => {
        setCurrentPage( 1 );
    };

    const [fetchUsers, { loading: usersLoading, error: usersError, data: usersData }] = useLazyQuery( GET_ALL_USERS, {
        variables: queryVariables,
        fetchPolicy: 'cache-and-network',
        onCompleted: ( data ) => {
            setTotalCount( data.users.totalCount );
            setTotalPages( data.users.totalPages );
        },
    } );

    const [fetchProducts, { loading: productsLoading, error: productsError, data: productsData }] = useLazyQuery( GET_ALL_PRODUCTS, {
        variables: queryVariables,
        fetchPolicy: 'cache-and-network',
        onCompleted: ( data ) => {
            setProducts( data.getAllProducts.products );
            setTotalCount( data.getAllProducts.totalCount );
            setTotalPages( data.getAllProducts.totalPages );
        },
    } );

    const [fetchProductTypes, { loading: productTypesLoading, error: productTypesError, data: productTypesData }] = useLazyQuery( GET_ALL_PRODUCT_TYPES, {
        fetchPolicy: 'cache-and-network',
        onCompleted: ( data ) => {
            setProductTypes( data.getAllProductTypes );
        },
    } );

    const [createProductMutation] = useMutation( CREATE_PRODUCT );
    const [createProductTypeMutation] = useMutation( CREATE_PRODUCT_TYPE );
    const [updateProductMutation] = useMutation( UPDATE_PRODUCT );
    const [deleteProductMutation, { loading: deleteLoading, error: deleteError }] = useMutation( DELETE_PRODUCT );

    const createProduct = async ( variables: {
        name: string;
        price: string | number;
        productTypeId: number; // Pass ID instead of name
        img: File;
        categoryId: number;
        stock: {
            amount: number;
            sold: number;
            instock: string;
            soldout: string;
            preorder: boolean;
        };
        preorder: boolean;
        description: string;
        rrp?: string | number;
    } ): Promise<{ success: boolean; message: string; product: Product | null }> => {
        try {
            const { data } = await createProductMutation( {
                variables: {
                    name: variables.name,
                    price: variables.price,
                    productTypeId: variables.productTypeId, // Pass the ID
                    categoryId: variables.categoryId,
                    img: variables.img,
                    stock: variables.stock,
                    preorder: variables.preorder,
                    description: variables.description,
                    rrp: variables.rrp,
                },
            } );

            if ( data?.createProduct ) {
                return {
                    success: true,
                    message: 'Product created successfully!',
                    product: data.createProduct,
                };
            } else {
                throw new Error( 'Failed to create product.' );
            }
        } catch ( error ) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            return {
                success: false,
                message: errorMessage,
                product: null,
            };
        }
    };



    const createProductType = async ( variables: { name: string } ): Promise<{ success: boolean; message: string; productType: ProductType | null }> => {
        try {
            const { data } = await createProductTypeMutation( { variables: { input: variables } } );

            if ( data?.createProductType ) {
                return {
                    success: true,
                    message: 'Product type created successfully!',
                    productType: data.createProductType,
                };
            } else {
                throw new Error( 'Failed to create product type.' );
            }
        } catch ( error ) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            return {
                success: false,
                message: errorMessage,
                productType: null,
            };
        }
    };

    const updateProduct = async ( variables: {
        id: number;
        name: string;
        price: number;
        productTypeId: number;
        description?: string;
        img?: File;
        categoryId: number;
        stockAmount: number;
        stockSold: number;
        stockInstock: string;
        stockSoldout: string;
        preorder: boolean;
        rrp?: number;
    } ): Promise<{
        success: boolean;
        message: string;
        product: Product | null;
    }> => {
        try {
            const stock = {
                amount: variables.stockAmount,
                sold: variables.stockSold,
                instock: variables.stockInstock,
                soldout: variables.stockSoldout,
            };

            const { data } = await updateProductMutation( {
                variables: {
                    ...variables,
                    stock, // Pass the stock input
                },
            } );
            if ( data?.updateProduct ) {
                return {
                    success: true,
                    message: 'Product updated successfully!',
                    product: data.updateProduct,
                };
            } else {
                throw new Error( 'Failed to update product.' );
            }
        } catch ( error ) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            return {
                success: false,
                message: errorMessage,
                product: null,
            };
        }
    };

    const deleteProduct = async ( id: number ): Promise<{ success: boolean; message: string }> => {
        try {
            const { data } = await deleteProductMutation( {
                variables: { id },
            } );

            if ( data?.deleteProduct ) {
                return {
                    success: true,
                    message: 'Product deleted successfully!',
                };
            } else {
                throw new Error( 'Failed to delete product.' );
            }
        } catch ( error ) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            return {
                success: false,
                message: errorMessage,
            };
        }
    };

    const [createCategoryMutation, { loading: categoryLoading }] = useMutation( CREATE_CATEGORY );

    const createCategory = async ( variables: {
        name: string;
        description: string;
        img: File;
    } ): Promise<{ success: boolean; message: string; category: any }> => {
        try {
            const { data } = await createCategoryMutation( { variables } );

            if ( data?.createCategory ) {
                setCategorySuccess( 'Category created successfully!' );
                setCategoryError( null );
                return {
                    success: true,
                    message: 'Category created successfully!',
                    category: data.createCategory,
                };
            } else {
                throw new Error( 'Failed to create category.' );
            }
        } catch ( error ) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            setCategoryError( errorMessage );
            setCategorySuccess( null );
            return {
                success: false,
                message: errorMessage,
                category: null,
            };
        }
    };

    const users = usersData ? usersData.users.users : [];
    const loading = usersLoading || productsLoading || productTypesLoading;
    const error = usersError || productsError || productTypesError;

    return (
        <AdminContext.Provider
            value={{
                users,
                products,
                productTypes,
                loading,
                error,
                totalCount,
                totalPages,
                currentPage,
                setPage: setCurrentPage,
                setSearch,
                fetchUsers,
                fetchProducts,
                fetchProductTypes,
                resetPagination,
                createCategory,
                categoryLoading,
                categoryError,
                categorySuccess,
                createProduct,
                updateProduct,
                deleteProduct,
                createProductType,
            }}
        >
            {children}
        </AdminContext.Provider>
    );
};

export const useAdminContext = () => {
    const context = useContext( AdminContext );
    if ( !context ) {
        throw new Error( 'useAdminContext must be used within an AdminProvider' );
    }
    return context;
};
