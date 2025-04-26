import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { BreadCrumb } from '../../components/breadcrumbs';
import { MainContainer } from '../../components/styled';
import { Footer } from '../../components/footer';
import { Link } from 'react-router-dom';
import { FancyContainer } from '../../components/fancy-container';
import { mediaQueries } from '../../styled/breakpoints';
import { usePreordersContext } from '../../context/pre-order';
import { Error } from '../../components/error';

export const Preorders: React.FC = () => {
    const {
        preorders,
        loading,
        error,
        fetchPreorders,
        page,
        limit,
        setPage,
        totalPages,
    } = usePreordersContext();

    useEffect(() => {
        fetchPreorders();
    }, [fetchPreorders, page, limit]);

    if (error) return <Error error={error} />;

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
            fetchPreorders();
        }
    };

    if (!preorders) return null;

    const sortedBrands = preorders.brands
        .filter((brand: any) =>
            preorders.products?.some(
                (product: any) =>
                    product.preorder === true && product.brand?.id === brand.id,
            ),
        )
        .sort((a: any, b: any) => a.name.localeCompare(b.name));

    return (
        <>
            <TopHeader />
            <Header background />
            <Navigation background />
            <BreadCrumb label="Coming Soon" />
            <PreordersMain>
                {loading ? (
                    <PreordersContainer>
                        <FancyContainer variant="login" size="login">
                            <NoProductsMessage>
                                <p>Loading preorders...</p>
                            </NoProductsMessage>
                        </FancyContainer>
                    </PreordersContainer>
                ) : preorders.brands?.length === 0 ? (
                    <PreordersContainer>
                        <FancyContainer variant="login" size="login">
                            <NoProductsMessage>
                                <p>No preorders available at the moment.</p>
                            </NoProductsMessage>
                        </FancyContainer>
                    </PreordersContainer>
                ) : (
                    <PreordersContainer>
                        <FiltersAndPreordersContainer>
                            <PreordersFilterContainer>
                                <h1>Coming Soon</h1>
                                <FancyContainer
                                    variant="filters"
                                    size="filters"
                                >
                                    <PreordersFilter>
                                        {sortedBrands.map((brand: any) => (
                                            <PreorderWrapper key={brand.id}>
                                                <StyledLink
                                                    to={`/shop/coming-soon/${brand.id}/${brand.name.replace(/\s+/g, '-').toLowerCase()}`}
                                                    state={{
                                                        brand,
                                                        products:
                                                            preorders.products?.filter(
                                                                (
                                                                    product: any,
                                                                ) =>
                                                                    product.preorder ===
                                                                        true &&
                                                                    product
                                                                        .brand
                                                                        ?.id ===
                                                                        brand.id,
                                                            ),
                                                    }}
                                                >
                                                    {brand.name}
                                                </StyledLink>
                                            </PreorderWrapper>
                                        ))}
                                    </PreordersFilter>
                                </FancyContainer>
                            </PreordersFilterContainer>
                            <PreordersListContainer>
                                {sortedBrands.map((brand: any) => (
                                    <Link
                                        key={brand.id}
                                        to={`/shop/coming-soon/${brand.id}/${brand.name.replace(/\s+/g, '-').toLowerCase()}`}
                                        state={{
                                            brand,
                                            products:
                                                preorders.products?.filter(
                                                    (product: any) =>
                                                        product.preorder ===
                                                            true &&
                                                        product.brand?.id ===
                                                            brand.id,
                                                ),
                                        }}
                                    >
                                        <PreorderItem>
                                            <ImageWrapper>
                                                <PreorderImage
                                                    src={brand.img?.url}
                                                    alt={brand.name}
                                                />
                                            </ImageWrapper>
                                            <p>{brand.name}</p>
                                        </PreorderItem>
                                    </Link>
                                ))}
                            </PreordersListContainer>
                        </FiltersAndPreordersContainer>
                        {totalPages > 1 && (
                            <PaginationContainer>
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
                            </PaginationContainer>
                        )}
                    </PreordersContainer>
                )}
            </PreordersMain>
            <Footer />
        </>
    );
};

const PreordersMain = styled(MainContainer)`
    flex-direction: column;
`;

const PreordersContainer = styled.section`
    display: flex;
    flex-direction: column;
    margin: 2.5rem;
    min-height: 50vh;
`;

const FiltersAndPreordersContainer = styled.div`
    display: flex;
    margin-bottom: 1rem;
`;

const PreordersFilterContainer = styled.div`
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

const PreordersFilter = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    text-align: center;
    z-index: 50;
`;

const PreorderWrapper = styled.div`
    padding: 1rem;
    &:not(:last-child) {
        border-bottom: 1px solid #4d3c7b;
    }
    z-index: 50;
`;

const StyledLink = styled(Link)`
    font-family: Cinzel;
    font-size: 18px;
    font-weight: 500;
    line-height: 25px;
    letter-spacing: 0.02em;
    color: white;
    &:hover {
        color: #c79d0a;
    }
    p {
        margin: 1rem;
    }
    z-index: 50;
`;

const PreordersListContainer = styled.div`
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
    p {
        color: white;
    }
`;

const PreorderItem = styled.div`
    border-radius: 12px;
    background: #160d35;
    padding: 0.4rem;
    text-align: center;
    border: 1px solid #ac8fff;
    &:hover {
        color: #ac8fff;
        border: 1px solid #c79d0a;
    }
    p {
        font-family: Barlow, sans-serif;
        font-size: 18px;
        font-weight: 600;
        line-height: 16.8px;
        margin: 1rem;
    }
`;

const ImageWrapper = styled.div`
    padding: 1rem;
    width: 260px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    ${mediaQueries('sm')`
        width: 200px;
        height: 175px;
    `};
`;

const PreorderImage = styled.img`
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    margin: 0 auto;
    &:hover {
        transform: scale(1.1);
    }
`;

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    margin-left: 26rem;
`;

const PaginationControls = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 1rem;

    span {
        color: white;
        text-align: center;
        margin: 0 1rem;
    }
`;

const PageButton = styled.button<{ disabled?: boolean }>`
    background-color: ${({ disabled }) => (disabled ? '#999' : '#4d3c7b')};
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    font-family: Barlow, sans-serif;
    font-size: 14px;
    border-radius: 4px;
    &:hover {
        background-color: ${({ disabled }) => (disabled ? '#999' : '#2a1f51')};
    }
`;

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
        color: white;
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
    }
`;
