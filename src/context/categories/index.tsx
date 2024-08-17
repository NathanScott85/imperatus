import React, { createContext, useContext, useEffect, useState } from 'react';
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import { GET_CATEGORIES, GET_CATEGORY_BY_ID } from '../../graphql/categories';

const CategoriesContext = createContext<any>(null);

export const CategoriesProvider = ({ children }: any) => {
    const { loading, error, data, refetch } = useQuery(GET_CATEGORIES);
    const [categories, setCategories] = useState<any[]>([]);
    const [currentCategory, setCurrentCategory] = useState<any>(null);

    const [
        fetchCategoryById,
        { loading: categoryLoading, error: categoryError },
    ] = useLazyQuery(GET_CATEGORY_BY_ID, {
        onCompleted: (data) => setCurrentCategory(data.category),
    });

    useEffect(() => {
        if (data) {
            setCategories(data.categories);
        }
    }, [data]);

    return (
        <CategoriesContext.Provider
            value={{
                categories,
                loading,
                error,
                refetch,
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
