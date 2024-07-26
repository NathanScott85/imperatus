import React, { createContext, useEffect, useContext } from 'react';
import { useAppContext } from '../';

// Categories Context
// const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }: any) => {
    // const { categories, fetchCategories } = useAppContext();

    // useEffect(() => {
    //   fetchCategories();
    // }, [fetchCategories]);

    return (
        <div />
        // <CategoriesContext.Provider value={{ categories }}>
        //   {children}
        // </CategoriesContext.Provider>
    );
};

// export const useCategoriesContext = () => useContext(CategoriesContext);

// Repeat similar structure for CardGames, Brands, Accessories
