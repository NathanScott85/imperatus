import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Header, TopHeader } from '../../../components/header';
import { Navigation } from '../../../components/navigation';
import { Filters } from '../../../components/filters';
import { Products } from '../../../components/products';
import { Footer } from '../../../components/footer';
import {  useCategoriesContext } from '../../../context/categories';
import { BreadCrumb } from '../../../components/breadcrumbs';

interface CategoryFilters {
    brandId?: number[];
    variantId?: number[];
    setId?: number[];
    productTypeId?: number[];
    preorder?: boolean;
    priceMin?: number;
    priceMax?: number;
    stockMin?: number;
    stockMax?: number;
}

export const Category = () => {
    const { id } = useParams();
    const { currentCategory, fetchCategoryById } = useCategoriesContext();

    const [categoryName, setCategoryName] = useState<string | null>(null);
    const [selectedFilters, setSelectedFilters] = useState<CategoryFilters>({});
    const [filterOptions, setFilterOptions] = useState<{
        brands: { id: number; name: string }[];
        sets: { id: number; setName: string }[];
        variants: { id: number; name: string }[];
        productTypes: { id: number; name: string }[];
    }>({
        brands: [],
        sets: [],
        variants: [],
        productTypes: [],
    });

    useEffect(() => {
        if (id) fetchCategoryById(parseInt(id));
    }, [id, fetchCategoryById]);

    useEffect(() => {
        if (currentCategory) {
            setCategoryName(currentCategory.name);
    
            const brandsMap = new Map();
            const setsMap = new Map();
            const variantsMap = new Map();
            const productTypesMap = new Map();

            currentCategory.products.forEach((product: any) => {
                if (!selectedFilters.brandId?.length || selectedFilters.brandId.includes(product.brand?.id)) {
                    if (product.brand)  brandsMap.set(product.brand.id, product.brand);
                    if (product.set) setsMap.set(product.set.id, product.set);
                    if (product.variant) variantsMap.set(product.variant.id, product.variant);
                    if (product.type) productTypesMap.set(product.type.id, product.type);
                }
            });
            setFilterOptions({
                brands: Array.from(brandsMap.values()),
                sets: Array.from(setsMap.values()),
                variants: Array.from(variantsMap.values()),
                productTypes: Array.from(productTypesMap.values()),
            });
        }
    }, [currentCategory]);
    

    const [checkedStatus, setCheckedStatus] = useState({
        inStock: false,
        outOfStock: false,
    });

    const handleChecked = (type: keyof typeof checkedStatus) => {
        setCheckedStatus((prevState) => ({
            ...prevState,
            [type]: !prevState[type],
        }));
    };

    const handleFilterChange = useCallback((key: keyof CategoryFilters, value: any) => {
        setSelectedFilters((prevFilters: CategoryFilters) => {
            prevFilters[key] = value as any;
            return {
                ...prevFilters
            };
        });
    }, []);    

    const filteredProducts = useMemo(() => {
        return currentCategory?.products.filter((product: any) => {
            return (
                (!selectedFilters.brandId?.length || selectedFilters.brandId.includes(Number(product.brand?.id))) &&
                (!selectedFilters.setId?.length || selectedFilters.setId.includes(product.set?.id)) &&
                (!selectedFilters.variantId?.length || selectedFilters.variantId.includes(product.variant?.id)) &&
                (!selectedFilters.productTypeId?.length || selectedFilters.productTypeId.includes(product.type?.id)) &&
                (!selectedFilters.priceMin || product.price >= selectedFilters.priceMin) &&
                (!selectedFilters.priceMax || product.price <= selectedFilters.priceMax)
            );
        });
    }, [currentCategory, selectedFilters]);    
    

    const resetFilters = () => {
        setSelectedFilters({});
    };

    return (
        <>
            <TopHeader />
            <Header background />
            <Navigation background />
            <BreadCrumb />
            <ImageWrapper>
                <p>{categoryName ? categoryName : '404 Error, Page Not Found'}</p>
            </ImageWrapper>
            <CategoriesMain background={!!categoryName}>
                <CategoriesContainer>
                    <CategoriesFilterContainer>
                        {categoryName && (
                            <Filters
                                checkedStatus={checkedStatus}
                                handleChecked={handleChecked}
                                filters={selectedFilters}
                                brands={filterOptions.brands}
                                sets={filterOptions.sets}
                                variants={filterOptions.variants}
                                productTypes={filterOptions.productTypes}
                                onFilterChange={handleFilterChange}
                                resetFilters={resetFilters}
                            />
                        )}
                    </CategoriesFilterContainer>
                    <CategoriesListContainer>
                        <ProductsWrapper>
                            {currentCategory?.products.length && <Products products={filteredProducts} />}
                        </ProductsWrapper>
                    </CategoriesListContainer>
                </CategoriesContainer>
            </CategoriesMain>
            <Footer />
        </>
    );
};

const CategoriesContainer = styled.section`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    min-height: 80vh;
    margin-bottom: 2.5rem;
`;

const CategoriesMain = styled.main<{ background: any }>`
    background-color: ${({ background }) => (background ? 'white' : '#130a30')};
    display: flex;
    justify-content: center;
    align-items: flex-start;
    color: #c79d0a;
    padding: 2rem;
    margin: auto;
    width: 100%;
`;

const CategoriesFilterContainer = styled.div`
    flex: 0 0 250px;
    min-height: 600px;
    padding-right: 2rem;
`;

const CategoriesListContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    min-height: 600px;
    padding: 2rem;
    width: 100%;
`;

const FancyContainerSubWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: white;
    height: 100%;
    p {
        margin: 0.5rem;
        font-family: 'Barlow', sans-serif;
        font-size: 16px;
    }
    h1 {
        margin: 1rem;
        font-family: Cinzel;
        font-size: 24px;
    }
    z-index: 50;
`;


const ProductsWrapper = styled.div`
    width: 100%;
    min-height: 400px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
`;

// const FancyContainerSubWrapper = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     text-align: center;
//     color: white;
//     p {
//         margin: 0.5rem;
//         font-family: 'Barlow', sans-serif;
//         font-size: 16px;
//     }
//     h1 {
//         margin: 1rem;
//         font-family: Cinzel;
//         font-size: 24px;
//     }
//     z-index: 50;
// `;


const ImageWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    background-color: #130a30;
    p {
        color: #c79d0a;
        font-family: Cinzel;
        font-size: 40px;
        font-weight: 700;
        line-height: 57px;
        letter-spacing: 0.02em;
        text-align: left;
        padding-bottom: 2rem;
        margin-left: 2rem;
    }
`;

export default Category;
