import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_CATEGORIES, GET_CATEGORY_BY_ID } from '../../graphql/categories';

const CategoriesContext = createContext<any>(null);

export const CategoriesProvider = ({ children }: any) => {
    const [categories, setCategories] = useState<any[]>([]);
    const [currentCategory, setCurrentCategory] = useState<any>(null);

    const [fetchCategories, { loading, error }] = useLazyQuery(GET_CATEGORIES, {
        fetchPolicy: 'cache-and-network',
        onCompleted: (data) => setCategories(data.categories),
    });

    const [
        fetchCategoryById,
        { loading: categoryLoading, error: categoryError },
    ] = useLazyQuery(GET_CATEGORY_BY_ID, {
        onCompleted: (data) => setCurrentCategory(data.category),
        fetchPolicy: 'cache-and-network',
    });

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories, categories]);

    return (
        <CategoriesContext.Provider
            value={{
                categories,
                loading,
                error,
                fetchCategories,
                currentCategory,
                fetchCategoryById,
                categoryLoading,
                categoryError,
            }}
        >
            {children}
        </CategoriesContext.Provider>
    );
};

// Custom hook to use the CategoriesContext
export const useCategoriesContext = () => useContext(CategoriesContext);
