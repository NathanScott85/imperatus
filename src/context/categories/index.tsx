import React, { createContext, useContext, useEffect, useState, ReactNode, useMemo, useCallback } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import {
    GET_CATEGORIES,
    GET_CATEGORY_BY_ID,
    UPDATE_CATEGORY,
    DELETE_CATEGORY,
} from '../../graphql/categories';

interface File {
    id: string;
    url: string;
    key: string;
    fileName: string;
    contentType: string;
    createdAt: string;
}

interface Category {
    id: string;
    name: string;
    description: string;
    img?: File | null;
    products: any
}

interface UpdateCategoryInput {
    id: string;
    name: string;
    description: string;
    img: any;
}

export interface CategoryFilters {
    brandId?: number;
    variantId?: number;
    setId?: number;
    productTypeId?: number;
    preorder?: boolean;
    priceMin?: number;
    priceMax?: number;
    stockMin?: number;
    stockMax?: number;
}

interface CategoriesContextProps {
    categories: Category[] | null;
    loading: boolean;
    error: any;
    updateCategory: ( variables: UpdateCategoryInput ) => Promise<void>;
    deleteCategory: ( id: string ) => Promise<void>;
    fetchCategories: () => void;
    currentCategory: Category | null;
    fetchCategoryById: (id: number, page?: number, limit?: number) => void;
    categoryLoading: boolean;
    totalCount: number;
    totalPages: number;
    currentPage: number;
    categoryError: any;
    updating: boolean;
    updateError: any;
    deleteloading: boolean;
    deleteError: any;
    setPage: ( page: number ) => void;
    categorySuccess: boolean;
    limit: number;
    setLimit: ( limit: number ) => void;
    search: string;
    setSearch: ( search: string ) => void;
    resetPagination: () => void;
    filters: CategoryFilters;
    setFilters: React.Dispatch<React.SetStateAction<CategoryFilters>>;
}

const CategoriesContext = createContext<CategoriesContextProps | null>( null );

export const CategoriesProvider = ( { children }: { children: ReactNode } ) => {
    const [categories, setCategories] = useState<Category[]>( [] );
    const [currentCategory, setCurrentCategory] = useState<Category | null>( null );
    const [limit, setLimit] = useState( 9 );
    const [totalCount, setTotalCount] = useState( 0 );
    const [totalPages, setTotalPages] = useState( 1 );
    const [currentPage, setCurrentPage] = useState( 1 );
    const [search, setSearch] = useState( '' );
    const [filters, setFilters] = useState<CategoryFilters>({});   

    const queryVariables = useMemo(() => ({
        page: currentPage,
        limit: limit,
        search,
    }), [currentPage, limit, search, filters]);    

    const resetPagination = () => {
        setCurrentPage( 1 );
    };

    const [fetchCategories, { loading, error }] = useLazyQuery( GET_CATEGORIES, {
        fetchPolicy: 'cache-and-network',
        variables: queryVariables,
        onCompleted: ( data ) => {
            setCategories( data?.getAllCategories?.categories || [] );
            setTotalCount( data?.getAllCategories?.totalCount || 0 );
            setTotalPages( data?.getAllCategories?.totalPages || 1 );
        },
    } );

    const [
        fetchCategoryByIdQuery,
        { loading: categoryLoading, error: categoryError },
    ] = useLazyQuery(GET_CATEGORY_BY_ID, {
        fetchPolicy: "cache-and-network",
        onCompleted: (data) => {
            setTotalCount(data?.getCategoryById?.totalCount || 0);
            setTotalPages(data?.getCategoryById?.totalPages || 1);
            setCurrentCategory(data?.getCategoryById);
        },
    });
    
    const fetchCategoryById = useCallback(
        (id: number) => {
            fetchCategoryByIdQuery({ variables: { id, page: 1, limit: 1000 } });
        },
        [fetchCategoryByIdQuery]
    );
    
    
    const [
        updateCategoryMutation,
        { loading: updating, error: updateError, data: updatedCategoryData },
    ] = useMutation( UPDATE_CATEGORY );

    const [
        deleteCategoryMutation,
        { loading: deleteloading, error: deleteError },
    ] = useMutation( DELETE_CATEGORY );

    useEffect( () => {
        fetchCategories();
    }, [fetchCategories, limit] );

    const updateCategory = async ( { id, name, description, img }: UpdateCategoryInput ) => {
        try {
            const { data } = await updateCategoryMutation( {
                variables: {
                    id,
                    name,
                    description,
                    img,
                },
            } );

            if ( data && data.updateCategory ) {
                setCategories( ( prevCategories ) =>
                    prevCategories.map( ( category ) =>
                        category.id === id ? data.updateCategory : category,
                    ),
                );
            }
        } catch ( error ) {
            console.error( 'Error updating category:', error );
        }
    };

    const deleteCategory = async ( id: string ) => {
        try {
            const { data } = await deleteCategoryMutation( {
                variables: { id },
            } );

            if ( data && data.deleteCategory ) {
                setCategories( ( prevCategories ) =>
                    prevCategories.filter( ( category ) => category.id !== id ),
                );
            }
        } catch ( error ) {
            console.error( 'Error deleting category:', error );
        }
    };


    return (
        <CategoriesContext.Provider
            value={{
                categories,
                loading,
                error,
                updateCategory,
                deleteCategory,
                fetchCategories,
                currentCategory,
                fetchCategoryById,
                categoryLoading,
                totalCount,
                totalPages,
                currentPage,
                categoryError,
                updating,
                updateError,
                deleteloading,
                deleteError,
                search,
                setPage: setCurrentPage,
                categorySuccess: !!updatedCategoryData,
                limit,
                setLimit,
                setSearch,
                resetPagination,
                filters,
                setFilters,
            }}
        >
            {children}
        </CategoriesContext.Provider>
    );
};

export const useCategoriesContext = () => {
    const context = useContext( CategoriesContext );
    if ( !context ) {
        throw new Error( "useCategoriesContext must be used within a CategoriesProvider" );
    }
    return context;
};
