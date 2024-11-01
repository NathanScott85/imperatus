import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
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
}

interface CategoriesResponse {
    categories: Category[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
}

interface UpdateCategoryInput {
    id: string;
    name: string;
    description: string;
    img: any;
}

const CategoriesContext = createContext<any | null>( null );

export const CategoriesProvider = ( { children }: { children: ReactNode } ) => {
    const [categories, setCategories] = useState<Category[]>( [] );
    const [currentCategory, setCurrentCategory] = useState<Category | null>( null );
    const [page, setPage] = useState( 1 );
    const [limit, setLimit] = useState( 9 );
    const [totalCount, setTotalCount] = useState( 0 );

    const [fetchCategories, { loading, error }] = useLazyQuery( GET_CATEGORIES, {
        fetchPolicy: 'cache-and-network',
        variables: { page, limit },
        onCompleted: ( data ) => {
            setCategories( data.getAllCategories.categories );
            setTotalCount( data.getAllCategories.totalCount );
        },
    } );

    const [
        fetchCategoryById,
        { loading: categoryLoading, error: categoryError },
    ] = useLazyQuery( GET_CATEGORY_BY_ID, {
        onCompleted: ( data ) => setCurrentCategory( data.getCategoryById ),
        fetchPolicy: 'cache-and-network',
    } );

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
    }, [fetchCategories, page, limit] );

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

    // Methods for pagination
    const nextPage = () => {
        if ( page < Math.ceil( totalCount / limit ) ) {
            setPage( ( prevPage ) => prevPage + 1 );
        }
    };

    const previousPage = () => {
        if ( page > 1 ) {
            setPage( ( prevPage ) => prevPage - 1 );
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
                categoryError,
                updating,
                updateError,
                deleteloading,
                deleteError,
                categorySuccess: !!updatedCategoryData,
                page,
                limit,
                totalCount,
                nextPage,
                previousPage,
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
