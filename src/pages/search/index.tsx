import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { Filters } from '../../components/filters';
import { Products } from '../../components/products';
import { Footer } from '../../components/footer';
import { useProductsContext } from '../../context/products';
import { FancyContainer } from '../../components/fancy-container';

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

    const handleChecked = (type: keyof typeof checkedStatus) => {
        setCheckedStatus((prevState) => ({
            ...prevState,
            [type]: !prevState[type],
        }));
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
                                filters
                                checkedStatus={checkedStatus}
                                handleChecked={handleChecked}
                            />
                        </SearchFilterContainer>
                        <SearchListContainer>
                            <Products products={products} />
                        </SearchListContainer>
                    </SearchContainer>
                ) : (
                    <SearchContainer>
                        <SearchFilterContainer>
                            <Filters
                                filters
                                checkedStatus={checkedStatus}
                                handleChecked={handleChecked}
                            />
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
    width: 80%;
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
`;

export default SearchResults;
