import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useMemo,
    useCallback,
} from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import {
    GET_ALL_PRODUCTS,
    GET_PRODUCT_BY_ID,
    GET_LATEST_PRODUCTS,
    CREATE_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
} from '../../graphql/products';
import { useDebouncedEffect } from '../../lib';

interface Stock {
    amount: number;
    preorder: boolean;
    sold?: number;
}

export interface ProductFilters {
    brandId?: number[];
    setId?: number[];
    rarityId?: number[];
    inStockOnly?: boolean;
    outOfStockOnly?: boolean;
    preorderOnly?: boolean;
    priceMin?: number;
    priceMax?: number;
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
        slug: string;
        description: string;
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
    rarities?: {
        id: number;
        name: string;
    }[];
    stock: Stock;
    img: {
        url: string;
    };
}

interface Brand {
    id: number;
    name: string;
    description: string;
}

interface Set {
    id: number;
    setName: string;
    setCode: string;
    description: string;
}

interface Rarity {
    id: number;
    name: string;
}

interface CreateProductInput {
    name: string;
    price: string | number;
    productTypeId: number;
    cardTypeId?: number;
    variantId?: number;
    brandId: number;
    setId: number;
    img: File;
    categoryId: number;
    stock: {
        amount: number;
        sold: number;
        preorder: boolean;
    };
    preorder: boolean;
    description: string;
    rrp?: string | number;
    rarityId?: number;
}

interface ProductsContextProps {
    products: Product[] | null;
    latestProducts: Product[] | null;
    latestLoading: boolean;
    product: Product | null;
    loading: boolean;
    error: any;
    totalCount: number;
    totalPages: number;
    page: number;
    setPage: (page: number) => void;
    limit: number;
    setLimit: (limit: number) => void;
    search: string;
    setSearch: (search: string) => void;
    setProduct: (product: any) => void;
    fetchProducts: () => void;
    fetchLatestProducts: () => void;
    fetchProductById: (id: string) => void;
    createProduct: (variables: {
        name: string;
        price: string | number;
        productTypeId: number;
        cardTypeId?: number;
        variantId?: number;
        brandId: number;
        setId: number;
        img: File;
        categoryId: number;
        stock: {
            amount: number;
            sold: number;
            preorder: boolean;
        };
        preorder: boolean;
        description: string;
        rrp?: string | number;
        rarityId?: number;
    }) => Promise<{
        success: boolean;
        message: string;
        product: Product | null;
    }>;
    updateProduct: (variables: {
        id: number;
        name: string;
        price: number;
        productTypeId: number;
        description?: string;
        img?: File;
        categoryId: number;
        stockAmount: number;
        stockSold: number;
        preorder: boolean;
        rrp?: number;
    }) => Promise<{
        success: boolean;
        message: string;
        product: Product | null;
    }>;
    deleteProduct: (
        id: number,
    ) => Promise<{ success: boolean; message: string }>;
    filters: ProductFilters;
    setFilters: React.Dispatch<React.SetStateAction<ProductFilters>>;
    brands: Brand[];
    sets: Set[];
    rarities: Rarity[];
}

const ProductsContext = createContext<ProductsContextProps | undefined>(
    undefined,
);

export const ProductsProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [latestProducts, setLatestProducts] = useState<Product[]>([]);
    const [latestLoading, setLatestLoading] = useState(false);
    const [product, setProduct] = useState<Product | null>(null);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState<ProductFilters>({});
    const [search, setSearch] = useState('');
    const [brands, setBrands] = useState<Brand[]>([]);
    const [sets, setSets] = useState<Set[]>([]);
    const [limit, setLimit] = useState(10);
    const [rarities, setRarities] = useState<Rarity[]>([]);

    const queryVariables = useMemo(
        () => ({
            page,
            limit,
            search,
            filters,
        }),
        [page, limit, search, filters],
    );

    const [fetchProductsQuery, { loading, error }] = useLazyQuery(
        GET_ALL_PRODUCTS,
        {
            fetchPolicy: 'cache-and-network',
            variables: queryVariables,
            onCompleted: (data) => {
                setProducts(data?.getAllProducts?.products || []);
                setTotalCount(data?.getAllProducts?.totalCount || 0);
                setTotalPages(data?.getAllProducts?.totalPages || 1);
                setBrands(data?.getAllProducts?.brands || []);
                setSets(data?.getAllProducts?.sets || []);
                setRarities(data?.getAllProducts?.rarities || []);
            },
        },
    );

    const fetchProducts = useCallback(() => {
        fetchProductsQuery({
            variables: {
                page,
                limit: 8,
                search,
                filters,
            },
        });
    }, [page, search, filters, fetchProductsQuery]);

    const [fetchLatestProductsQuery] = useLazyQuery(GET_LATEST_PRODUCTS, {
        fetchPolicy: 'cache-and-network',
        onCompleted: (data) => {
            setLatestProducts(data?.getLatestProducts || []);
            setLatestLoading(false);
        },
        onError: () => {
            setLatestLoading(false);
        },
    });

    const [getProductByIdQuery] = useLazyQuery(GET_PRODUCT_BY_ID, {
        fetchPolicy: 'cache-and-network',
        onCompleted: (data) => {
            setProduct(data?.getProductById || null);
        },
    });

    const fetchProductById = useCallback(
        (id: string) => {
            getProductByIdQuery({ variables: { id } });
        },
        [getProductByIdQuery],
    );

    const fetchLatestProducts = useCallback(() => {
        setLatestLoading(true);
        fetchLatestProductsQuery();
    }, [fetchLatestProductsQuery]);

    const [createProductMutation] = useMutation(CREATE_PRODUCT);
    const [updateProductMutation] = useMutation(UPDATE_PRODUCT);
    const [deleteProductMutation] = useMutation(DELETE_PRODUCT);

    const createProduct = useCallback(
        async (variables: CreateProductInput) => {
            try {
                const { data } = await createProductMutation({ variables });
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
                return { success: false, message: errorMessage, product: null };
            }
        },
        [createProductMutation],
    );

    const updateProduct = useCallback(
        async (variables: {
            id: number;
            name: string;
            price: number;
            productTypeId: number;
            description?: string;
            img?: File;
            categoryId: number;
            stockAmount: number;
            stockSold: number;
            preorder: boolean;
            rrp?: number;
        }): Promise<{
            success: boolean;
            message: string;
            product: Product | null;
        }> => {
            try {
                const stock = {
                    amount: variables.stockAmount,
                    sold: variables.stockSold,
                };

                const { data } = await updateProductMutation({
                    variables: { ...variables, stock },
                });

                if (data?.updateProduct) {
                    return {
                        success: true,
                        message: 'Product updated successfully!',
                        product: data.updateProduct,
                    };
                } else {
                    throw new Error('Failed to update product.');
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
        },
        [updateProductMutation],
    );

    const deleteProduct = useCallback(
        async (id: number): Promise<{ success: boolean; message: string }> => {
            try {
                const { data } = await deleteProductMutation({
                    variables: { id },
                });

                if (data?.deleteProduct) {
                    return {
                        success: true,
                        message: 'Product deleted successfully!',
                    };
                } else {
                    throw new Error('Failed to delete product.');
                }
            } catch (error) {
                const errorMessage =
                    error instanceof Error ? error.message : 'Unknown error';
                return {
                    success: false,
                    message: errorMessage,
                };
            }
        },
        [deleteProductMutation],
    );

    useDebouncedEffect(
        () => {
            fetchProducts();
        },
        [fetchProducts, page, search, filters],
        1500,
    );

    const contextValue = useMemo(
        () => ({
            products,
            latestProducts,
            product,
            loading,
            error,
            totalCount,
            totalPages,
            page,
            setPage,
            limit,
            setLimit,
            search,
            filters,
            setFilters,
            setSearch,
            setProduct,
            fetchProducts,
            latestLoading,
            fetchLatestProducts,
            fetchProductById,
            createProduct,
            updateProduct,
            deleteProduct,
            brands,
            sets,
            rarities,
        }),
        [
            products,
            latestProducts,
            product,
            loading,
            error,
            totalCount,
            totalPages,
            page,
            setPage,
            limit,
            setLimit,
            search,
            filters,
            setFilters,
            setSearch,
            setProduct,
            fetchProducts,
            latestLoading,
            fetchLatestProducts,
            fetchProductById,
            createProduct,
            updateProduct,
            deleteProduct,
            brands,
            sets,
            rarities,
        ],
    );

    return (
        <ProductsContext.Provider value={contextValue}>
            {children}
        </ProductsContext.Provider>
    );
};

export const useProductsContext = () => {
    const context = useContext(ProductsContext);
    if (!context) {
        throw new Error(
            'useProductsContext must be used within a ProductsProvider',
        );
    }
    return context;
};
