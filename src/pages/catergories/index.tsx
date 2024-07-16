import styled from 'styled-components';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { BreadCrumb } from '../../components/breadcrumbs';
import { MainContainer } from '../../components/styled';
import { Footer } from '../../components/footer';
import Button from '../../components/button';
import { Link } from 'react-router-dom';
import { FancyContainer } from '../../components/fancy-container';
import Reviews from '../../components/reviews';
import { mediaQueries } from '../../styled/breakpoints';

// TODO: bring back categories from api
import { categories } from '../../lib/category-mocks';

export const Categories = () => (
    <>
        <TopHeader />
        <Header background />
        <Navigation background />
        <BreadCrumb label="Categories" />
        <CategoriesMain>
            <CategoriesContainer>
                <CategoriesFilterContainer>
                    <h1>Categories</h1>
                    <FancyContainer variant="filters" size="filters">
                        <CategoriesFilter>
                            {categories.map((category) => (
                                <CatergoriesWrapper key={category.id}>
                                    <Button
                                        variant="none"
                                        pathname={`/shop/categories/category/${category.id}/${category.name}`}
                                        label={category.name}
                                    />
                                </CatergoriesWrapper>
                            ))}
                        </CategoriesFilter>
                    </FancyContainer>
                </CategoriesFilterContainer>
                <CategoriesListContainer>
                    {categories.map((category) => (
                        <>
                            <Link
                                to={`/shop/categories/category/${category.id}/${category.name}`}
                            >
                                <CategoryItem key={category.id}>
                                    <ImageWrapper>
                                        <CategoryImage
                                            src={category?.img}
                                            alt={category?.name}
                                        />
                                    </ImageWrapper>
                                </CategoryItem>
                            </Link>
                        </>
                    ))}
                </CategoriesListContainer>
            </CategoriesContainer>

            <Reviews />
        </CategoriesMain>
        <Footer />
    </>
);

const CategoriesContainer = styled.section`
    display: flex;
    flex-direction: row;
`;

const ImageWrapper = styled.div`
    padding: 1rem;
    width: 100%;
    height: 200px;
    max-width: 100%;
    max-height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 260px;
    height: 298px;
    top: 630px;
    left: 584px;
    gap: 0px;
`;

const CategoryImage = styled.img`
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    margin: 0 auto;
    &:hover {
        transform: scale(1.1);
    }
`;

const CategoriesMain = styled(MainContainer)`
    flex-direction: column;
`;

const CategoriesFilterContainer = styled.div`
    h1 {
        color: white;
        font-family: Cinzel;
        font-size: 30px;
        font-weight: 700;
        line-height: 57px;
        letter-spacing: 0.02em;
        text-align: left;
        padding-bottom: 2rem;
        margin-left: 2rem;
    }
`;

const CategoriesFilter = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    text-align: center;
`;

const CatergoriesWrapper = styled.div`
    &:not(:last-child) {
        border-bottom: 1px solid #4d3c7b;
    }
    padding: 1rem;
    z-index: 50;
`;

const CategoriesListContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    padding: 2rem;
    ${mediaQueries('sm')`
        grid-template-columns: repeat(2, 1fr);
    `};
    ${mediaQueries('xl')`
        grid-template-columns: repeat(3, 1fr);
    `};
`;

const CategoryItem = styled.div`
    border-radius: 12px;
    background: transparent;
    padding: 1rem;
    font-family: Barlow, sans-serif;
    font-size: 14px;
    font-weight: 600;
    line-height: 16.8px;
    text-align: left;
    padding: 0.4rem;
    text-align: center;
    border: 1px solid #ac8fff;
    &:hover {
        color: #ac8fff;
        border: 1px solid #d4b05f;
    }
`;
