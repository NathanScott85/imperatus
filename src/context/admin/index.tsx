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
    UPDATE_PRODUCT_TYPE,
} from '../../graphql/products';
import { CREATE_CATEGORY } from '../../graphql/categories';
import { CREATE_RARITY, GET_RARITIES, UPDATE_RARITY } from '../../graphql/rarities';
import { GET_VARIANTS, CREATE_VARIANT, UPDATE_VARIANT } from '../../graphql/variants';
import { GET_ALL_CARD_TYPES, CREATE_CARD_TYPE, UPDATE_CARD_TYPE } from '../../graphql/card-type';

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
    cardTypeId?: string; 
    brandId: string;
    setId: string;
    variantId?: string;
    rrp: number;
    description?: string;
    img: {
        url: string;
    };
    category: {
        id: string;
        name: string;
        description: string
        slug: string
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
    }
    stock: Stock;
    preorder: boolean;
}

interface ProductType {
    id: number;
    name: string;
}

interface Rarity {
    id: number;
    name: string;
}

interface CardType {
    id: number;
    name: string;
    brand: any;
}

interface Variant {
    id: number;
    name: string
}

interface AdminContextProps {
    users: User[] | null;
    products: Product[] | null;
    productTypes: ProductType[] | null;
    rarities: Rarity[] | null; 
    variants: Variant[] | null;
    cardTypes: CardType[] | null;
    loading: boolean;
    error: any;
    totalCount: number;
    totalPages: number;
    page: number;
    setPage: (page: number) => void;
    search: string;
    setSearch: (search: string) => void;
    fetchUsers: () => void;
    fetchProducts: () => void;
    fetchProductTypes: () => void;
    fetchRarities: () => void; 
    fetchVariants: () => void;
    fetchCardTypes: () => void;
    resetPagination: () => void;
    createProductType: (variables: { name: string }) => Promise<{ success: boolean; message: string; productType: ProductType | null }>;
    createCategory: (variables: {
        name: string;
        description: string;
        img: File;
    }) => Promise<{ success: boolean; message: string; category: any }>;
    createRarity: (variables: { name: string }) => Promise<{ success: boolean; message: string; rarity: Rarity | null }>;
    updateRarity: (id: number, name: string) => Promise<{ 
        success: boolean; 
        message: string; 
        rarity: Rarity | null;
    }>;
    createVariant: (name: string) => Promise<{ success: boolean; message: string; variant: Variant | null }>;
    updateVariant: (id: number, name: string) => Promise<{ 
        success: boolean; 
        message: string; 
        variant: Variant | null;
    }>;
    updateProductType: (id: number, name: string) => Promise<{ 
        success: boolean; 
        message: string; 
        productType: ProductType | null;
    }>;
    createCardType: (variables: { name: string; brandId: number }) => Promise<{ 
        success: boolean; 
        message: string; 
        cardType: CardType | null;
    }>;
    updateCardType: (variables: { id: number; name: string; brandId: number }) => Promise<{ success: boolean; message: string; cardType: CardType | null }>;

    createProduct: (
        variables: {
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
                instock: string;
                soldout: string;
                preorder: boolean;
            };
            preorder: boolean;
            description: string;
            rrp?: string | number;
        }
    ) => Promise<{ success: boolean; message: string; product: Product | null }>;

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
        stockInstock: string;
        stockSoldout: string;
        preorder: boolean;
        rrp?: number;
    }) => Promise<{
        success: boolean;
        message: string;
        product: Product | null;
    }>;
    deleteProduct: (id: number) => Promise<{ success: boolean; message: string }>;
    categoryLoading: boolean;
    categoryError: string | null;
    categorySuccess: string | null;
}

const AdminContext = createContext<AdminContextProps | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [rarities, setRarities] = useState<Rarity[]>([]);
    const [variants, setVariants] = useState<Rarity[]>([]);
    const [cardTypes, setCardTypes] = useState<CardType[]>([]);
    const [page, setPage] = useState(1);
    const [productTypes, setProductTypes] = useState<ProductType[]>([]);
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

    const [fetchProducts, { loading: productsLoading, error: productsError, data: productsData }] = useLazyQuery(GET_ALL_PRODUCTS, {
        variables: queryVariables,
        fetchPolicy: 'cache-and-network',
        onCompleted: (data) => {
            setProducts(data.getAllProducts.products);
            setTotalCount(data.getAllProducts.totalCount);
            setTotalPages(data.getAllProducts.totalPages);
        },
    });

    const [fetchProductTypes, { loading: productTypesLoading, error: productTypesError, data: productTypesData }] = useLazyQuery(GET_ALL_PRODUCT_TYPES, {
        fetchPolicy: 'cache-and-network',
        variables: queryVariables,
        onCompleted: (data) => {
            setProductTypes(data.getAllProductTypes.types || []);
        },
    });

    const [fetchRarities, { loading: raritiesLoading, error: raritiesError, data: raritiesData }] =
        useLazyQuery(GET_RARITIES, {
            variables: queryVariables,
            fetchPolicy: 'cache-and-network',
            onCompleted: (data) => {
                setRarities(data.getAllRarity.rarities || []);
                setTotalCount(data.getAllRarity.totalCount);
                setTotalPages(data.getAllRarity.totalPages);
        },
    });

    const [fetchVariants, { loading: variantsLoading, error: variantsError }] =
        useLazyQuery(GET_VARIANTS, {
            variables: queryVariables,
            fetchPolicy: 'cache-and-network',
            onCompleted: (data) => {
                setVariants(data.getAllVariants.variants || []);
                setTotalCount(data.getAllVariants.totalCount);
                setTotalPages(data.getAllVariants.totalPages);
            },
    });

    const [createCardTypeMutation] = useMutation(CREATE_CARD_TYPE);
    const [updateCardTypeMutation] = useMutation(UPDATE_CARD_TYPE);

    const updateCardType = async (variables: { id: number; name: string; brandId: number }): Promise<{ success: boolean; message: string; cardType: CardType | null }> => {
        try {
            const { data } = await updateCardTypeMutation({ variables });

            if (data?.updateCardType) {
                return {
                    success: true,
                    message: "Card Type updated successfully!",
                    cardType: data.updateCardType,
                };
            } else {
                throw new Error("Failed to update card type.");
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            return {
                success: false,
                message: errorMessage,
                cardType: null,
            };
        }
    };

    const createCardType = async (variables: { name: string; brandId: number }): Promise<{ 
        success: boolean; 
        message: string; 
        cardType: CardType | null;
    }> => {
        try {
            const { data } = await createCardTypeMutation({ variables });
    
            if (data?.createCardType) {
                return {
                    success: true,
                    message: "Card type created successfully!",
                    cardType: data.createCardType,
                };
            } else {
                throw new Error("Failed to create card type.");
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            return {
                success: false,
                message: errorMessage,
                cardType: null,
            };
        }
    };

    const [fetchCardTypes, { loading: cardTypeLoading, error: cardTypeError }] =
        useLazyQuery(GET_ALL_CARD_TYPES, {
            variables: queryVariables,
            fetchPolicy: 'cache-and-network',
            onCompleted: (data) => {
                setCardTypes(data.getAllCardTypes.cardTypes || []);
                setTotalCount(data.getAllVariants.totalCount);
                setTotalPages(data.getAllVariants.totalPages);
            },
    });

    const [createProductMutation] = useMutation(CREATE_PRODUCT);
    const [updateProductTypeMutation] = useMutation(UPDATE_PRODUCT_TYPE);
    const [createProductTypeMutation] = useMutation(CREATE_PRODUCT_TYPE);
    const [updateProductMutation] = useMutation(UPDATE_PRODUCT);
    const [deleteProductMutation] = useMutation(DELETE_PRODUCT);

    const [createRarityMutation] = useMutation(CREATE_RARITY);
    const [updateRarityMutation] = useMutation(UPDATE_RARITY);

    const createRarity = async (variables: { name: string }): Promise<{ success: boolean; message: string; rarity: Rarity | null }> => {
        try {
            const { data } = await createRarityMutation({ variables });

            if (data?.createRarity) {
                return {
                    success: true,
                    message: "Rarity created successfully!",
                    rarity: data.createRarity,
                };
            } else {
                throw new Error("Failed to create rarity.");
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            return {
                success: false,
                message: errorMessage,
                rarity: null,
            };
        }
    };

    const updateRarity = async (id: number, name: string): Promise<{ success: boolean; message: string; rarity: Rarity | null }> => {
        try {
            const { data } = await updateRarityMutation({ variables: { id, name } });
    
            if (data?.updateRarity) {
                return {
                    success: true,
                    message: "Rarity updated successfully!",
                    rarity: data.updateRarity,
                };
            } else {
                throw new Error("Failed to update rarity.");
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            return {
                success: false,
                message: errorMessage,
                rarity: null,
            };
        }
    };
    
    const [createVariantMutation] = useMutation(CREATE_VARIANT);
    const [updateVariantMutation] = useMutation(UPDATE_VARIANT);

    const createVariant = async (name: string): Promise<{ success: boolean; message: string; variant: Variant | null }> => {
        try {
            const { data } = await createVariantMutation({ variables: { name } });
    
            if (data?.createVariant) {
                return {
                    success: true,
                    message: 'Variant created successfully!',
                    variant: data.createVariant,
                };
            } else {
                throw new Error('Failed to create variant.');
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            return {
                success: false,
                message: errorMessage,
                variant: null,
            };
        }
    };

    const updateVariant = async (id: number, name: string): Promise<{ success: boolean; message: string; variant: Variant | null }> => {
        try {
            const { data } = await updateVariantMutation({ variables: { id, name } });
    
            if (data?.updateVariant) {
                return {
                    success: true,
                    message: "Variant updated successfully!",
                    variant: data.updateVariant,
                };
            } else {
                throw new Error("Failed to update variant.");
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            return {
                success: false,
                message: errorMessage,
                variant: null,
            };
        }
    };

    const createProduct = async (variables: {
        name: string;
        price: string | number;
        productTypeId: number;
        cardTypeId?: number;
        brandId: number;
        setId: number;
        variantId?: number;
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
    }): Promise<{ success: boolean; message: string; product: Product | null }> => {
        try {
            const { data } = await createProductMutation({
                variables,
            });
    
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
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            return {
                success: false,
                message: errorMessage,
                product: null,
            };
        }
    };
    

    const createProductType = async (variables: { name: string }): Promise<{ success: boolean; message: string; productType: ProductType | null }> => {
        try {
            const { data } = await createProductTypeMutation({ variables: { input: variables } });

            if (data?.createProductType) {
                return {
                    success: true,
                    message: 'Product type created successfully!',
                    productType: data.createProductType,
                };
            } else {
                throw new Error('Failed to create product type.');
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            return {
                success: false,
                message: errorMessage,
                productType: null,
            };
        }
    };

    const updateProduct = async (variables: {
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
    }): Promise<{
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

            const { data } = await updateProductMutation({
                variables: {
                    ...variables,
                    stock,
                },
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
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            return {
                success: false,
                message: errorMessage,
                product: null,
            };
        }
    };

    const deleteProduct = async (id: number): Promise<{ success: boolean; message: string }> => {
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
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            return {
                success: false,
                message: errorMessage,
            };
        }
    };

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

    const updateProductType = async (id: number, name: string): Promise<{ success: boolean; message: string; productType: ProductType | null }> => {
        try {
            const { data } = await updateProductTypeMutation({ variables: { id, name } });
    
            if (data?.updateProductType) {
                return {
                    success: true,
                    message: "Product type updated successfully!",
                    productType: data.updateProductType,
                };
            } else {
                throw new Error("Failed to update product type.");
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            return {
                success: false,
                message: errorMessage,
                productType: null,
            };
        }
    };

    const users = usersData ? usersData.users.users : [];
    const loading = usersLoading || productsLoading || productTypesLoading || raritiesLoading || variantsLoading;
    const error = usersError || productsError || productTypesError || raritiesError || variantsError;

    return (
        <AdminContext.Provider
            value={{
                users,
                products,
                productTypes,
                rarities,
                variants,
                cardTypes,
                loading,
                search,
                error,
                totalCount,
                totalPages,
                page,
                setPage,
                setSearch,
                fetchUsers,
                fetchProducts,
                fetchProductTypes,
                fetchRarities,
                fetchVariants,
                fetchCardTypes,
                createCardType,
                resetPagination,
                createCategory,
                categoryLoading,
                categoryError,
                categorySuccess,
                createProduct,
                updateProduct,
                deleteProduct,
                createProductType,
                createRarity,
                createVariant,
                updateVariant,
                updateProductType,
                updateRarity,
                updateCardType
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
