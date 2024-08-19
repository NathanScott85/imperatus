import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Header, TopHeader } from '../../../components/header';
import { Navigation } from '../../../components/navigation';
import { Filters } from '../../../components/filters';
import { Products } from '../../../components/products';
import { Footer } from '../../../components/footer';
import { useCategoriesContext } from '../../../context/categories';
import { mediaQueries } from '../../../styled/breakpoints';
import { FancyContainer } from '../../../components/fancy-container';

export const Category = () => {
    const { id } = useParams();
    const {
        currentCategory,
        fetchCategoryById,
        categoryLoading,
        categoryError,
    } = useCategoriesContext();

    const [categoryName, setCategoryName] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            fetchCategoryById({ variables: { id: parseInt(id) } })
                .then((response: any) => {
                    if (response?.data?.category) {
                        setCategoryName(response.data.category.name);
                    }
                })
                .catch((error: any) =>
                    console.error('Error fetching category:', error),
                );
        }
    }, [id, fetchCategoryById]);

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

    return (
        <>
            <TopHeader />
            <Header background />
            <Navigation background />

            <ImageWrapper>
                <p>{categoryName || categoryName}</p>
            </ImageWrapper>
            <CategoriesMain>
                {categoryLoading ? (
                    <CategoriesContainer>
                        <FancyContainer variant="filters" size="filters">
                            <NoProductsMessage>
                                <p> Loading category details...</p>
                            </NoProductsMessage>
                        </FancyContainer>
                    </CategoriesContainer>
                ) : categoryError ? (
                    <CategoriesContainer>
                        <ErrorMessage>
                            Error loading category: {categoryError.message}
                        </ErrorMessage>
                    </CategoriesContainer>
                ) : currentCategory ? (
                    <>
                        <CategoriesContainer>
                            <CategoriesFilterContainer>
                                <Filters
                                    filters
                                    checkedStatus={checkedStatus}
                                    handleChecked={handleChecked}
                                />
                            </CategoriesFilterContainer>
                            <CategoriesListContainer>
                                <Products products={currentCategory.products} />
                            </CategoriesListContainer>
                        </CategoriesContainer>
                    </>
                ) : (
                    <CategoriesContainer>
                        <p>No category found.</p>
                    </CategoriesContainer>
                )}
            </CategoriesMain>
            <Footer />
        </>
    );
};

const NoProductsMessage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: #777;
    text-align: center;
    width: 100%;
    p {
        height: 100%;
        color: black;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 50;
        font-family: Cinzel, serif;
        font-size: 24px;
        font-weight: 700;
        line-height: 1.5;
        letter-spacing: 0.02em;
        padding: 6rem;
        width: 100%;
    }
`;

const ErrorMessage = styled.p`
    text-align: center;
    font-size: 1.2rem;
    color: red;
    margin: 2rem 0;
`;

const CategoriesContainer = styled.section`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 2.5rem;
`;

const CategoriesMain = styled.main`
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

const CategoriesFilterContainer = styled.div`
    h1 {
        color: black;
        font-family: Cinzel;
        font-size: 30px;
        font-weight: 700;
        line-height: 57px;
        letter-spacing: 0.02em;
        text-align: left;
        padding-bottom: 2rem;
    }
`;

const ImageWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 650px);
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
    ${mediaQueries('sm')`
         height: calc(100vh - 1450px); 
    `};
    ${mediaQueries('md')`
        height: calc(100vh - 1250px);
    `};
    ${mediaQueries('lg')`
        height: calc(100vh - 1250px);
    `};
    ${mediaQueries('xl')`
           height: calc(100vh - 450px);
   `};
`;

const CategoriesListContainer = styled.div`
    display: flex;
    padding: 2rem;
`;
