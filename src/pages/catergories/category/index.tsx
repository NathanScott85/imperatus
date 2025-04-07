import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Header, TopHeader } from '../../../components/header';
import { Navigation } from '../../../components/navigation';
import { Filters, FiltersType } from '../../../components/filters';
import { Products } from '../../../components/products';
import { Footer } from '../../../components/footer';
import { useCategoriesContext } from '../../../context/categories';
import { BreadCrumb } from '../../../components/breadcrumbs';
import { mediaQueries } from '../../../styled/breakpoints';
import { useDebouncedEffect } from '../../../lib';

interface CategoryFilters extends FiltersType {}

export const Category = () => {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const [selectedFilters, setSelectedFilters] = useState<CategoryFilters>({});
    const [filterOptions, setFilterOptions] = useState<{
        brands: { id: number; name: string }[];
        sets: { id: number; setName: string; }[];
        rarities: { id: number; name: string }[];
    }>({ brands: [], sets: [], rarities: [] });

    const {
        currentCategory,
        setCurrentCategory,
        loading,
        error,
        totalPages,
        limit,
        setPage,
        currentPage,
        fetchCategoryById,
    } = useCategoriesContext();

    const hasFetched = useRef(false);

    useEffect(() => {
        if (location.state?.category) {
            setCurrentCategory(location.state.category);
        } else if (id && !hasFetched.current) {
            hasFetched.current = true;
            fetchCategoryById(Number(id), currentPage, limit, selectedFilters);
        }
    }, [id, setCurrentCategory]);

    useDebouncedEffect(() => {
        if (id) {
            setPage(1);
            fetchCategoryById(Number(id), 1, limit, selectedFilters);
        }
    }, [selectedFilters, id, limit], 300);

    useEffect(() => {
        if (currentCategory) {
            const transformedBrands = (currentCategory.brands || []).map((brand: any) => ({
                ...brand,
                id: Number(brand.id),
            }));

            const transformedSets = (currentCategory.sets || []).map((set: any) => ({
                ...set,
                id: Number(set.id),
            }));

            const transformedRarities = (currentCategory.rarities || []).map((rarity: any) => ({
                ...rarity,
                id: Number(rarity.id),
            }));

            setFilterOptions({
                brands: transformedBrands,
                sets: transformedSets,
                rarities: transformedRarities,
            });
        }
    }, [currentCategory]);

    const handleFilterChange = (key: keyof CategoryFilters, value: any) => {
        if (key === 'brandId' || key === 'setId' || key === 'rarityId') {
            const updated = Array.isArray(value) ? value.map(Number) : [];
            setSelectedFilters((prev) => ({
                ...prev,
                [key]: updated.length > 0 ? updated : undefined,
            }));
        } else if (
            key === 'inStockOnly' ||
            key === 'outOfStockOnly' ||
            key === 'preorderOnly' ||
            key === 'priceMin' ||
            key === 'priceMax'
        ) {
            setSelectedFilters((prev) => ({
                ...prev,
                [key]: value,
            }));
        }
    };

    const resetFilters = () => {
        setSelectedFilters({});
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages && id) {
            setPage(newPage);
            fetchCategoryById(Number(id), newPage, limit, selectedFilters);
        }
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
                <p>{currentCategory?.name || '404 Error, Page Not Found'}</p>
            </ImageWrapper>
            <CategoriesMain background={!!currentCategory?.name}>
                <CategoriesContainer>
                    <CategoriesFilterContainer>
                        {currentCategory?.name && (
                            <Filters
                                categoryName={currentCategory.name}
                                filters={selectedFilters}
                                brands={filterOptions.brands}
                                sets={filterOptions.sets}
                                rarities={filterOptions.rarities}
                                onFilterChange={handleFilterChange}
                                resetFilters={resetFilters}
                                onPriceChange={(min: number, max: number) => {
                                    handleFilterChange('priceMin', min);
                                    handleFilterChange('priceMax', max);
                                }}
                                priceMin={0}
                                priceMax={1000}
                            />
                        )}
                    </CategoriesFilterContainer>
                    <CategoriesListContainer>
                        <ProductsWrapper>
                            {currentCategory && (
                                <>
                                    <Products products={currentCategory.products} />
                                    {totalPages > 1 && (
                                        <PaginationWrapper>
                                            <PaginationControls>
                                                <PageButton
                                                    onClick={() => handlePageChange(currentPage - 1)}
                                                    disabled={currentPage === 1}
                                                >
                                                    Previous
                                                </PageButton>
                                                <span>Page {currentPage} of {totalPages}</span>
                                                <PageButton
                                                    onClick={() => handlePageChange(currentPage + 1)}
                                                    disabled={currentPage >= totalPages}
                                                >
                                                    Next
                                                </PageButton>
                                            </PaginationControls>
                                        </PaginationWrapper>
                                    )}
                                </>
                            )}
                        </ProductsWrapper>
                    </CategoriesListContainer>
                </CategoriesContainer>
            </CategoriesMain>
            <Footer />
        </>
    );
};

const PaginationWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 2rem;
`;

const PaginationControls = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1.5rem;
    font-size: 16px;
    font-family: Barlow, sans-serif;
    color: black;
`;

const PageButton = styled.button<{ disabled?: boolean }>`
    background-color: ${({ disabled }) => (disabled ? '#ccc' : '#4d3c7b')};
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    border-radius: 5px;
    font-size: 14px;

    &:hover {
        background-color: ${({ disabled }) => (disabled ? '#ccc' : '#2a1f51')};
    }
`;

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
    align-items: center;
    align-content: center;
    color: #c79d0a;
    padding: 2rem;
    margin: auto;
    padding: 1rem 0rem;
`;

const CategoriesFilterContainer = styled.div`
    flex: 0 0 250px;
    min-height: 600px;
    padding-right: 2rem;
`;

const CategoriesListContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 1.5rem;
    width: 100%;
    min-width: 600px;
    max-width: 1000px;
    min-height: 675px;
    position: relative;

    ${mediaQueries('md')`
        min-width: 300px;
    `}

    ${mediaQueries('lg')`
        min-height: 675px;
    `}

    ${mediaQueries('xl')`
        min-height: 675px;
    `}
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
