import React, { createContext, useContext, useState, ReactNode, useMemo, useCallback } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_ALL_PRODUCT_TYPES, CREATE_PRODUCT_TYPE, UPDATE_PRODUCT_TYPE } from '../../graphql/products';

interface ProductType {
    id: number;
    name: string;
}

interface ProductTypeContextProps {
    productTypes: ProductType[] | null;
    loading: boolean;
    error: any;
    totalCount: number;
    totalPages: number;
    page: number;
    setPage: (page: number) => void;
    search: string;
    setSearch: (search: string) => void;
    fetchProductTypes: () => void;
    createProductType: (variables: { name: string }) => Promise<{ success: boolean; message: string; productType: ProductType | null }>;
    updateProductType: (id: number, name: string) => Promise<{ success: boolean; message: string; productType: ProductType | null }>;
}

const ProductTypeContext = createContext<ProductTypeContextProps | undefined>(undefined);

export const ProductTypeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [productTypes, setProductTypes] = useState<ProductType[] | null>([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const queryVariables = useMemo(() => ({ page, limit: 10, search }), [page, search]);

    const [fetchProductTypesQuery, { loading, error }] = useLazyQuery(GET_ALL_PRODUCT_TYPES, {
        variables: queryVariables,
        fetchPolicy: 'network-only',
        onCompleted: (data) => {
            if (data?.getAllProductTypes?.types) {
                setProductTypes(data.getAllProductTypes.types);
                setTotalCount(data.getAllProductTypes.totalCount || 0);
                setTotalPages(data.getAllProductTypes.totalPages || 1);
            }
        },
    });

    const fetchProductTypes = useCallback(() => {
        fetchProductTypesQuery();
    }, [fetchProductTypesQuery]);

    const [createProductTypeMutation] = useMutation(CREATE_PRODUCT_TYPE);
    const [updateProductTypeMutation] = useMutation(UPDATE_PRODUCT_TYPE);

    const createProductType = async (variables: { name: string }) => {
        try {
            const { data } = await createProductTypeMutation({ variables: { input: variables } });
            if (data?.createProductType) {
                return {
                    success: true,
                    message: 'Product type created successfully!',
                    productType: data.createProductType,
                };
            }
            throw new Error('Failed to create product type.');
        } catch (error) {
            return {
                success: false,
                message: error instanceof Error ? error.message : 'Unknown error',
                productType: null,
            };
        }
    };

    const updateProductType = async (id: number, name: string) => {
        try {
            const { data } = await updateProductTypeMutation({ variables: { id, name } });
            if (data?.updateProductType) {
                return {
                    success: true,
                    message: 'Product type updated successfully!',
                    productType: data.updateProductType,
                };
            }
            throw new Error('Failed to update product type.');
        } catch (error) {
            return {
                success: false,
                message: error instanceof Error ? error.message : 'Unknown error',
                productType: null,
            };
        }
    };

    return (
        <ProductTypeContext.Provider
            value={{
                productTypes,
                loading,
                error,
                totalCount,
                totalPages,
                page,
                setPage,
                search,
                setSearch,
                fetchProductTypes,
                createProductType,
                updateProductType,
            }}
        >
            {children}
        </ProductTypeContext.Provider>
    );
};

export const useProductTypeContext = () => {
    const context = useContext(ProductTypeContext);
    if (!context) {
        throw new Error('useProductTypeContext must be used within a ProductTypeProvider');
    }
    return context;
};
