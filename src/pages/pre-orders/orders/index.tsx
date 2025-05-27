import React, { useEffect, useRef, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Header, TopHeader } from '../../../components/header';
import { Navigation } from '../../../components/navigation';
import { Filters, FiltersType } from '../../../components/filters';
import { Products } from '../../../components/products';
import { Footer } from '../../../components/footer';
import { usePreordersContext } from '../../../context/pre-order';
import { BreadCrumb } from '../../../components/breadcrumbs';
import { mediaQueries } from '../../../styled/breakpoints';
import { useDebouncedEffect } from '../../../lib';

interface OrdersFilters extends FiltersType {}

export const Orders = () => {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();

    const [selectedFilters, setSelectedFilters] = useState<OrdersFilters>({});
    const [filterOptions, setFilterOptions] = useState<{
        brands: { id: number; name: string }[];
        sets: { id: number; setName: string }[];
        rarities: { id: number; name: string }[];
    }>({ brands: [], sets: [], rarities: [] });

    const {
        currentPreorders,
        loading,
        error,
        totalPages,
        page,
        setPage,
        limit,
        fetchPreordersById,
    } = usePreordersContext();

    const hasFetched = useRef(false);

    useEffect(() => {
        if (id && !hasFetched.current) {
            hasFetched.current = true;
            fetchPreordersById(id, selectedFilters, page, limit);
        }
    }, [id, selectedFilters, page, limit, fetchPreordersById]);

    useDebouncedEffect(
        () => {
            if (id) {
                setPage(1);
                fetchPreordersById(id, selectedFilters, 1, limit);
            }
        },
        [selectedFilters, id, limit],
        300,
    );

    useEffect(() => {
        if (currentPreorders) {
            const transformedBrands = (currentPreorders.brands || []).map(
                (brand) => ({
                    ...brand,
                    id: Number(brand.id),
                }),
            );
            const transformedSets = (currentPreorders.sets || []).map(
                (set) => ({
                    ...set,
                    id: Number(set.id),
                }),
            );
            const transformedRarities = (currentPreorders.rarities || []).map(
                (rarity) => ({
                    ...rarity,
                    id: Number(rarity.id),
                }),
            );
            setFilterOptions({
                brands: transformedBrands as any,
                sets: transformedSets as any,
                rarities: transformedRarities as any,
            });
        }
    }, [currentPreorders]);

    const handleFilterChange = (key: keyof OrdersFilters, value: any) => {
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

    const resetFilters = () => setSelectedFilters({});

    const handlePageChange = (newPage: number) => {
        if (id && newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
            fetchPreordersById(id, selectedFilters, newPage, limit);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading preorders</p>;

    return (
        <>
            <TopHeader />
            <Header background />
            <Navigation background />
            <BreadCrumb />
            <ImageWrapper>
                {location.state?.brand?.img?.url && (
                    <BrandImage
                        src={location.state.brand.img.url}
                        alt={location.state.brand.name}
                    />
                )}
            </ImageWrapper>
            <OrdersMain>
                <OrdersContainer>
                    <OrdersFilterContainer>
                        <Filters
                            categoryName={
                                location.state?.brand?.name || 'Coming Soon'
                            }
                            filters={selectedFilters}
                            sets={filterOptions.sets}
                            rarities={filterOptions.rarities}
                            brands={filterOptions.brands}
                            onFilterChange={handleFilterChange}
                            resetFilters={resetFilters}
                            onPriceChange={(min, max) => {
                                handleFilterChange('priceMin', min);
                                handleFilterChange('priceMax', max);
                            }}
                            priceMin={0}
                            priceMax={1000}
                        />
                    </OrdersFilterContainer>
                    <OrdersListContainer>
                        <ProductsWrapper>
                            <Products
                                products={currentPreorders?.products || []}
                            />
                            {totalPages > 1 && (
                                <PaginationWrapper>
                                    <PaginationControls>
                                        <PageButton
                                            onClick={() =>
                                                handlePageChange(page - 1)
                                            }
                                            disabled={page === 1}
                                        >
                                            Previous
                                        </PageButton>
                                        <span>
                                            Page {page} of {totalPages}
                                        </span>
                                        <PageButton
                                            onClick={() =>
                                                handlePageChange(page + 1)
                                            }
                                            disabled={page >= totalPages}
                                        >
                                            Next
                                        </PageButton>
                                    </PaginationControls>
                                </PaginationWrapper>
                            )}
                        </ProductsWrapper>
                    </OrdersListContainer>
                </OrdersContainer>
            </OrdersMain>
            <Footer />
        </>
    );
};

const BrandImage = styled.img`
    max-width: 300px;
    height: auto;
    object-fit: contain;
    z-index: 0;
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

const OrdersContainer = styled.section`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    min-height: 80vh;
    margin-bottom: 2.5rem;
`;

const OrdersMain = styled.main`
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

const OrdersFilterContainer = styled.div`
    flex: 0 0 250px;
    min-height: 600px;
    padding-right: 2rem;
`;

const OrdersListContainer = styled.div`
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
