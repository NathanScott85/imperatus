import styled from 'styled-components';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { BreadCrumb } from '../../components/breadcrumbs';
import { MainContainer } from '../../components/styled';
import { Footer } from '../../components/footer';
import { generatePath, Link } from 'react-router-dom';
import { FancyContainer } from '../../components/fancy-container';
import Reviews from '../../components/reviews';
import { mediaQueries } from '../../styled/breakpoints';

// TODO: bring back preorders from api
import { preorders } from '../../lib/preorder-mocks';

const getCategoriesPath = (orders: any) => {
    const comingsoonPath = orders
        ? generatePath('/shop/coming-soon/new/:id/:name', {
            id: orders.id,
            name: orders.name.replace(/\s+/g, '-').toLowerCase(),
        })
        : '';
    return {
        comingsoonPath,
    };
};
export const Preorders = () => {
    return (
        <>
            <TopHeader />
            <Header background />
            <Navigation background />
            <BreadCrumb label="Coming Soon" />
            <PreOrdersMain>
                <PreOrdersContainer>
                    <CategoriesFilterContainer>
                        <h1>Coming Soon</h1>
                        <FancyContainer variant="filters" size="filters">
                            <PreOrdersFilter>
                                {preorders
                                    .sort((a, b) =>
                                        a.name.localeCompare(b.name),
                                    )
                                    .map((orders) => {
                                        const { comingsoonPath } =
                                            getCategoriesPath(orders);
                                        return (
                                            <OrdersLinkContainer
                                                key={orders.id}
                                            >
                                                <StyledLink to={comingsoonPath}>
                                                    {orders.name}
                                                </StyledLink>
                                            </OrdersLinkContainer>
                                        );
                                    })}
                            </PreOrdersFilter>
                        </FancyContainer>
                    </CategoriesFilterContainer>
                    <PreordersListContainer>
                        {preorders.map((orders) => {
                            const { comingsoonPath } =
                                getCategoriesPath(orders);
                            return (
                                <>
                                    <Link to={comingsoonPath}>
                                        <PreOrderItem key={orders.id}>
                                            <ImageWrapper>
                                                <PreOrdersImage
                                                    src={orders?.img.url}
                                                    alt={orders?.name}
                                                />
                                            </ImageWrapper>
                                            <p> {orders?.name}</p>
                                        </PreOrderItem>
                                    </Link>
                                </>
                            );
                        })}
                    </PreordersListContainer>
                </PreOrdersContainer>

                {/* <Reviews /> */}
                <p>Replace with Latest Products</p>
            </PreOrdersMain>
            <Footer />
        </>
    );
};

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
`;

const PreOrdersContainer = styled.section`
    display: flex;
    flex-direction: row;
    margin-bottom: 2.5rem;
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

const PreOrdersImage = styled.img`
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    margin: 0 auto;
    &:hover {
        transform: scale(1.1);
    }
`;

const PreOrdersMain = styled(MainContainer)`
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

const PreOrdersFilter = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    text-align: center;
`;

const OrdersLinkContainer = styled.div`
    &:not(:last-child) {
        border-bottom: 1px solid #4d3c7b;
    }
    padding: 1rem;
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

const PreOrderItem = styled.div`
    border-radius: 12px;
    background: #160d35;
    padding: 1rem;
    text-align: left;
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
