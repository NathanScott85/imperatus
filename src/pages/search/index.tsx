import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { Filters } from '../../components/filters';
import { Products } from '../../components/products';
import { Footer } from '../../components/footer';
import { useProductsContext } from '../../context/products';
import { FancyContainer } from '../../components/fancy-container';
import { mediaQueries } from '../../styled/breakpoints';

export const SearchResults = () => {
    const { query } = useParams();
    const {
        products,
        fetchProducts,
        loading,
        error,
        search,
        setSearch,
        page,
        totalPages,
        setPage
    } = useProductsContext();

    const [filters, setFilters] = useState({
        brandId: [] as number[],
        setId: [] as number[],
        preorder: false,
        priceMin: 0,
        priceMax: 0,
        stockMin: 0,
        stockMax: 0,
    });


    const [checkedStatus, setCheckedStatus] = useState({
        inStock: false,
        outOfStock: false,
    });

    useEffect(() => {
        if (query) {
            setSearch(query);
            fetchProducts();
        }
    }, [query, setSearch, fetchProducts]);

    const [filterOptions, setFilterOptions] = useState({
        brands: [] as { id: number; name: string }[],
        sets: [] as { id: number; setName: string }[],
        priceMin: 0,
        priceMax: 0,
    });

    useEffect(() => {
        if (!products || products.length === 0) return;

        const brandsMap = new Map();
        const setsMap = new Map();
        let priceMin = Infinity;
        let priceMax = -Infinity;

        const filteredForOptions = products.filter((product: any) => {
            const isInStock = product.stock?.amount > 0;
            if (checkedStatus.inStock && !isInStock) return false;
            if (checkedStatus.outOfStock && isInStock) return false;
            return true;
        });

        if (filteredForOptions.length === 0) {
            setFilterOptions({
                brands: [],
                sets: [],
                priceMin: 0,
                priceMax: 0,
            });
            setFilters((prev) => ({
                ...prev,
                priceMin: 0,
                priceMax: 0,
            }));
            return;
        }

        filteredForOptions.forEach((product: any) => {
            if (product.brand) brandsMap.set(product.brand.id, product.brand);
            if (product.set) setsMap.set(product.set.id, product.set);
            if (product.price < priceMin) priceMin = product.price;
            if (product.price > priceMax) priceMax = product.price;
        });

        setFilterOptions({
            brands: Array.from(brandsMap.values()),
            sets: Array.from(setsMap.values()),
            priceMin,
            priceMax,
        });

        setFilters((prev) => ({
            ...prev,
            priceMin,
            priceMax,
        }));
    }, [products, checkedStatus]);

    const handleChecked = (type: keyof typeof checkedStatus) => {
        setCheckedStatus((prevState) => ({
            ...prevState,
            [type]: !prevState[type],
        }));
    };

    const onFilterChange = (key: keyof typeof filters, value: any) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const resetFilters = () => {
        setFilters({
            brandId: [],
            setId: [],
            preorder: false,
            priceMin: filterOptions.priceMin,
            priceMax: filterOptions.priceMax,
            stockMin: 0,
            stockMax: 0,
        });
        setCheckedStatus({ inStock: false, outOfStock: false });
    };


    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };


    const filteredProducts = useMemo(() => {
        return products?.filter((product) => {
            const { brandId, setId, priceMin, priceMax, preorder } = filters;

            const isInStock = product.stock?.amount > 0;

            if (checkedStatus.inStock && !checkedStatus.outOfStock && !isInStock) return false;
            if (checkedStatus.outOfStock && !checkedStatus.inStock && isInStock) return false;

            const matchesBrand =
                !Array.isArray(brandId) || brandId.length === 0 || brandId.includes(Number(product.brand?.id));
            const matchesSet =
                !Array.isArray(setId) || setId.length === 0 || setId.includes(Number(product.set?.id));
            const matchesMinPrice = !priceMin || product.price >= priceMin;
            const matchesMaxPrice = !priceMax || product.price <= priceMax;
            const matchesPreorder = !preorder || product.preorder;

            return matchesBrand && matchesSet && matchesMinPrice && matchesMaxPrice && matchesPreorder;
        });
    }, [products, filters, checkedStatus]);


    return (
        <>
            <TopHeader />
            <Header background />
            <Navigation background />
            <ImageWrapper>
                {search ? <p>Search Results for "{search}"</p> : <p>
                    Please enter a search query
                </p>}
            </ImageWrapper>
            <SearchMain>
                {loading ? (
                    <NoResultsMessage>
                        <FancyContainer variant="filters" size="medium">
                            <p>Loading results...</p>
                        </FancyContainer>
                    </NoResultsMessage>
                ) : error ? (<NoResultsMessage>
                    <FancyContainer variant="filters" size="medium">
                        <p>An Error has occurred.</p>
                    </FancyContainer>
                </NoResultsMessage>
                ) : products && products.length > 0 ? (
                    <SearchContainer>
                        <SearchFilterContainer>
                            <Filters
                                // checkedStatus={checkedStatus}
                                // handleChecked={handleChecked}
                                filters={filters}
                                brands={filterOptions.brands}
                                // sets={filterOptions.sets}
                                // priceMin={filterOptions.priceMin}
                                // priceMax={filterOptions.priceMax}
                                categoryName="Search"
                                // onPriceChange={(min, max) => {
                                //     onFilterChange("priceMin", min);
                                //     onFilterChange("priceMax", max);
                                // }}
                                onFilterChange={onFilterChange}
                                resetFilters={resetFilters}
                            />
                        </SearchFilterContainer>
                        <SearchListContainer>
                            <Products products={filteredProducts} />
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
                        </SearchListContainer>
                    </SearchContainer>
                ) : (
                    <SearchContainer>
                        <SearchFilterContainer>
                            {/* <Filters
                                  currentFilters={filters} // ✅ Pass filters
                                  setFilters={setFilters}  
                                filters
                                checkedStatus={checkedStatus}
                                handleChecked={handleChecked}
                            /> */}
                        </SearchFilterContainer>
                        <SearchListContainer>
                            <NoResultsMessage>
                                <FancyContainer variant="filters" size="medium">
                                    <p>No products available, please check back later</p>
                                </FancyContainer>
                            </NoResultsMessage>
                        </SearchListContainer>
                    </SearchContainer>

                )}
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
    s`}
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
