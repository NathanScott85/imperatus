import React, { createContext, useContext, useState, ReactNode, useMemo, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_ALL_PRODUCTS } from '../../graphql/products';

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
    slug: string;
    description?: string;
    rrp?: number;
    preorder: boolean;
    category: {
        id: string;
        name: string;
    };
    brand?: {
        id: string;
        name: string;
        description?: string;
    };
    set?: {
        id: string;
        setName: string;
        setCode: string;
        description: string;
    };
    stock: Stock;
    img: {
        url: string;
    };
}

interface ProductsContextProps {
    products: Product[] | null;
    loading: boolean;
    error: any;
    totalCount: number;
    totalPages: number;
    page: number;
    setPage: (page: number) => void;
    search: string;
    setSearch: (search: string) => void;
    fetchProducts: () => void;
}

const ProductsContext = createContext<ProductsContextProps | undefined>(undefined);

export const ProductsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');

    const queryVariables = useMemo(() => ({ page, limit: 10, search }), [page, search]);

    const [fetchProducts, { loading, error }] = useLazyQuery(GET_ALL_PRODUCTS, {
        variables: queryVariables,
        fetchPolicy: 'cache-and-network',
        onCompleted: (data) => {
            setProducts(data?.getAllProducts?.products || []);
            setTotalCount(data?.getAllProducts?.totalCount || 0);
            setTotalPages(data?.getAllProducts?.totalPages || 1);
        },
    });

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts, page, search]);

    return (
        <ProductsContext.Provider
            value={{
                products,
                loading,
                error,
                totalCount,
                totalPages,
                page,
                setPage,
                search,
                setSearch,
                fetchProducts,
            }}
        >
            {children}
        </ProductsContext.Provider>
    );
};

export const useProductsContext = () => {
    const context = useContext(ProductsContext);
    if (!context) {
        throw new Error('useProductsContext must be used within a ProductsProvider');
    }
    return context;
};
