import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import {
    GET_CATEGORIES,
    GET_CATEGORY_BY_ID,
    UPDATE_CATEGORY,
} from '../../graphql/categories';

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

    const [
        updateCategoryMutation,
        { loading: updating, error: updateError, data: updatedCategoryData },
    ] = useMutation(UPDATE_CATEGORY);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const updateCategory = async ({
        id,
        name,
        description,
        img,
    }: {
        id: string;
        name: string;
        description: string;
        img: any;
    }) => {
        try {
            const { data } = await updateCategoryMutation({
                variables: {
                    id,
                    name,
                    description,
                    img,
                },
            });

            if (data && data.updateCategory) {
                setCategories((prevCategories) =>
                    prevCategories.map((category) =>
                        category.id === id ? data.updateCategory : category,
                    ),
                );
            }
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    return (
        <CategoriesContext.Provider
            value={{
                categories,
                loading,
                error,
                updateCategory,
                fetchCategories,
                currentCategory,
                fetchCategoryById,
                categoryLoading,
                categoryError,
                updating,
                updateError,
                categorySuccess: !!updatedCategoryData,
            }}
        >
            {children}
        </CategoriesContext.Provider>
    );
};

export const useCategoriesContext = () => useContext(CategoriesContext);
