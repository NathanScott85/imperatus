import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { Filters, FiltersType } from '../../components/filters';
import { Products } from '../../components/products';
import { Footer } from '../../components/footer';
import { useProductsContext } from '../../context/products';
import { mediaQueries } from '../../styled/breakpoints';

export const SearchResults = () => {
    const { query } = useParams();
    const {
        products,
        fetchProducts,
        search,
        setSearch,
        page,
        totalPages,
        setPage,
        filters,
        setFilters,
        brands,
        sets,
        rarities
    } = useProductsContext();

    const [filterOptions, setFilterOptions] = useState<{
        brands: { id: number; name: string }[];
        sets: { id: number; setName: string }[];
        rarities: { id: number; name: string }[];
    }>({ brands: [], sets: [], rarities: [] });

    const hasFetched = useRef(false);

    useEffect(() => {
        if (!hasFetched.current) {
            hasFetched.current = true;
            fetchProducts();
        }
    }, [filters]);

    useEffect(() => {
        if (query) {
            setSearch(query);
            fetchProducts();
        }
    }, [query]);

    useEffect(() => {
        const transformedBrands = (brands || []).map((b: any) => ({ ...b, id: Number(b.id) }));
        const transformedSets = (sets || []).map((s: any) => ({ ...s, id: Number(s.id) }));
        const transformedRarities = (rarities || []).map((r: any) => ({ ...r, id: Number(r.id) }));
        setFilterOptions({
            brands: transformedBrands,
            sets: transformedSets,
            rarities: transformedRarities,
        });
    }, [brands, sets, rarities]);

    const handleFilterChange = (key: keyof FiltersType, value: any) => {
        if (key === 'brandId' || key === 'setId' || key === 'rarityId') {
            const updated = Array.isArray(value) ? value.map(Number) : [];
            setFilters((prev) => ({
                ...prev,
                [key]: updated.length > 0 ? updated : undefined,
            }));
        } else {
            setFilters((prev) => ({
                ...prev,
                [key]: value,
            }));
        }
    };

    const resetFilters = () => {
        setFilters({});
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    return (
        <>
            <TopHeader />
            <Header background />
            <Navigation background />
            <ImageWrapper>
                {search ? (
                    <p>Search Results for "{search}"</p>
                ) : (
                    <p>Please enter a search query</p>
                )}
            </ImageWrapper>
            <SearchMain>
                <SearchContainer>
                    <SearchFilterContainer>
                        <Filters
                            filters={filters}
                            brands={filterOptions.brands}
                            sets={filterOptions.sets}
                            rarities={filterOptions.rarities}
                            priceMin={0}
                            priceMax={1000}
                            onPriceChange={(min, max) => {
                                handleFilterChange('priceMin', min);
                                handleFilterChange('priceMax', max);
                            }}
                            categoryName="Search"
                            onFilterChange={handleFilterChange}
                            resetFilters={resetFilters}
                        />
                    </SearchFilterContainer>
                    <SearchListContainer>
                        <>
                            <Products products={products || []} />
                            {totalPages > 1 && (
                                <PaginationWrapper>
                                    <PaginationControls>
                                        <PageButton
                                            onClick={() => handlePageChange(page - 1)}
                                            disabled={page === 1}
                                        >
                                            Previous
                                        </PageButton>
                                        <span>Page {page} of {totalPages}</span>
                                        <PageButton
                                            onClick={() => handlePageChange(page + 1)}
                                            disabled={page >= totalPages}
                                        >
                                            Next
                                        </PageButton>
                                    </PaginationControls>
                                </PaginationWrapper>
                            )}
                        </>
                    </SearchListContainer>
                </SearchContainer>
            </SearchMain>
            <Footer />
        </>
    );
};


const NoResultsMessage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-width: 600px;
    text-align: center;
    font-size: 18px;
    color: #777;

    p {
        height: 100%;
        color: black;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: Cinzel, serif;
        font-size: 24px;
        font-weight: 700;
        padding: 6rem;
        width: 100%;
    }
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
        padding-bottom: 2rem;
        margin-left: 2rem;
    }
`;

const SearchMain = styled.main`
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    color: #c79d0a;
    padding: 2rem;
    margin: auto;
    padding: 1rem 0rem;
`;

const SearchContainer = styled.section`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    margin-bottom: 2.5rem;
    width: 100%;
    max-width: 1200px;
    ${mediaQueries('md')`
        min-width: 100%;
    `}
`;

const SearchFilterContainer = styled.div`
    h1 {
        color: black;
        font-family: Cinzel;
        font-size: 30px;
        font-weight: 700;
        padding-bottom: 2rem;
    }
`;

const SearchListContainer = styled.div`
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

export default SearchResults;
