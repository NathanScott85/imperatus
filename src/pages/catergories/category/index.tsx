import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Header, TopHeader } from '../../../components/header';
import { Navigation } from '../../../components/navigation';
import { Filters } from '../../../components/filters';
import { Products } from '../../../components/products';
import { Footer } from '../../../components/footer';
import { useCategoriesContext } from '../../../context/categories';
import { BreadCrumb } from '../../../components/breadcrumbs';

interface CategoryFilters {
    brandId?: number[];
    setId?: number[];
    preorder?: boolean;
    priceMin?: number;
    priceMax?: number;
    stockMin?: number;
    stockMax?: number;
}

export const Category = () => {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const [selectedFilters, setSelectedFilters] = useState<CategoryFilters>({});
    const [checkedStatus, setCheckedStatus] = useState({ inStock: false, outOfStock: false });
    const [categoryName, setCategoryName] = useState<string | null>(null);
    const [filterOptions, setFilterOptions] = useState<{
        brands: { id: number; name: string }[];
        sets: { id: number; setName: string }[];
        stockMin: number;
        stockMax: number;
        priceMin: number;
        priceMax: number;
    }>({
        brands: [],
        sets: [],
        stockMin: 0,
        stockMax: 0,
        priceMin: 0,
        priceMax: 0,
    });
    const {
        currentCategory,
        setCurrentCategory,
        loading,
        error,
        fetchCategoryById,
    } = useCategoriesContext();

    const hasFetched = useRef(false);

    useEffect(() => {
        if (location.state?.category) {
            setCurrentCategory(location.state.category);
        } else if (id && !hasFetched.current) {
            hasFetched.current = true;
           fetchCategoryById(Number(id));
      
        }
    }, [id, setCurrentCategory, fetchCategoryById, location.state]);

    useEffect(() => {
        if (currentCategory) {
            setCategoryName(currentCategory.name);
            setCurrentCategory(currentCategory);
            const brandsMap = new Map();
            const setsMap = new Map();
            let stockMin = Infinity;
            let stockMax = -Infinity;
            let priceMin = Infinity;
            let priceMax = -Infinity;

            currentCategory.products.forEach((product: any) => {

                const isInStock = product.stock?.amount > 0;
                if (checkedStatus.inStock && !isInStock) return;
                if (checkedStatus.outOfStock && isInStock) return;

                priceMin = Math.min(priceMin, product.price);
                priceMax = Math.max(priceMax, product.price);

                if (product.brand) brandsMap.set(product.brand.id, product.brand);
                if (product.set) setsMap.set(product.set.id, product.set);
                if (product.stock?.amount !== undefined) {
                    stockMin = Math.min(stockMin, product.stock.amount);
                    stockMax = Math.max(stockMax, product.stock.amount);
                }
            });
            setFilterOptions({
                brands: Array.from(brandsMap.values()),
                sets: Array.from(setsMap.values()),
                stockMin: stockMin === Infinity ? 0 : stockMin,
                stockMax: stockMax === -Infinity ? 0 : stockMax,
                priceMin: priceMin === Infinity ? 0 : priceMin,
                priceMax: priceMax === -Infinity ? 0 : priceMax,
            });
        }
    }, [currentCategory, setCurrentCategory, id, checkedStatus]);

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
        if (!currentCategory) return [];

        return currentCategory.products.filter((product: any) => {
            const { brandId, setId, priceMin, priceMax } = selectedFilters;
            const isInStock = product.stock?.amount > 0;

            if (checkedStatus.inStock && !checkedStatus.outOfStock && !isInStock) return false;
            if (checkedStatus.outOfStock && !checkedStatus.inStock && isInStock) return false;

            const matchesBrand = !brandId?.length || brandId.includes(Number(product.brand?.id));
            const matchesSet = !setId?.length || setId.includes(Number(product.set?.id));
            const matchesMinPrice = !priceMin || product.price >= priceMin;
            const matchesMaxPrice = !priceMax || product.price <= priceMax;

            return matchesBrand && matchesSet && matchesMinPrice && matchesMaxPrice;
        });
    }, [currentCategory, selectedFilters, checkedStatus]);

    const resetFilters = () => {
        setSelectedFilters({});
        setCheckedStatus({ 
            inStock: false, 
            outOfStock: false,
        });
    };

    if (loading) return <p>Loading...</p>;

    if (error) return <p>Error fetching product</p>;

    return (
        <>
            <TopHeader />
            <Header background />
            <Navigation background />
            <BreadCrumb />
            <ImageWrapper>
            <p>
                    {loading ? 'Loading...' : categoryName ? categoryName : '404 Error, Page Not Found'}
                </p>
            </ImageWrapper>
            <CategoriesMain background={!!currentCategory?.name}>
                <CategoriesContainer>
                    <CategoriesFilterContainer>
                        {currentCategory?.name && (
                            <Filters
                                categoryName={currentCategory.name}
                                checkedStatus={checkedStatus}
                                handleChecked={handleChecked}
                                filters={selectedFilters}
                                brands={filterOptions.brands}
                                sets={filterOptions.sets}
                                priceMin={filterOptions.priceMin}
                                priceMax={filterOptions.priceMax}
                                onPriceChange={(min, max) =>
                                    setSelectedFilters((prevFilters) => ({
                                        ...prevFilters,
                                        priceMin: min,
                                        priceMax: max,
                                    }))
                                }
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

const ProductsWrapper = styled.div`
    width: 100%;
    min-height: 400px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
`;

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
