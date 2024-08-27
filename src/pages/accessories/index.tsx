import React from 'react';
import styled from 'styled-components';
import { Link, generatePath } from 'react-router-dom';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { BreadCrumb } from '../../components/breadcrumbs';
import { MainContainer } from '../../components/styled';
import { Footer } from '../../components/footer';
import { FancyContainer } from '../../components/fancy-container';
import Reviews from '../../components/reviews';
import { mediaQueries } from '../../styled/breakpoints';
import { accessories } from '../../lib/accessories-mocks';

const getAccessoryPath = (accessory: any) => {
    const accessoryPath = accessory
        ? generatePath('/shop/accessories/accessory/:id/:name', {
              id: accessory.id,
              name: accessory.name.replace(/\s+/g, '-').toLowerCase(),
          })
        : '';
    return {
        accessoryPath,
    };
};

export const Accessories = () => {
    return (
        <>
            <TopHeader />
            <Header background />
            <Navigation background />
            <BreadCrumb label="Accessories" />
            <AccessoriesMain>
                <AccessoriesContainer>
                    <AccessoriesFiltersContainer>
                        <h1>Accessories</h1>
                        <FancyContainer variant="filters" size="filters">
                            <AccessoryFilter>
                                {accessories
                                    .sort((a, b) =>
                                        a.name.localeCompare(b.name),
                                    )
                                    .map((accessory) => {
                                        const { accessoryPath } =
                                            getAccessoryPath(accessory);
                                        return (
                                            <AccessoriesWrapper
                                                key={accessory.id}
                                            >
                                                <StyledLink to={accessoryPath}>
                                                    {accessory.name}
                                                </StyledLink>
                                            </AccessoriesWrapper>
                                        );
                                    })}
                            </AccessoryFilter>
                        </FancyContainer>
                    </AccessoriesFiltersContainer>
                    <AccessoriesListContainer>
                        {accessories.map((accessory) => {
                            const { accessoryPath } =
                                getAccessoryPath(accessory);
                            return (
                                <Link to={accessoryPath} key={accessory.id}>
                                    <AccessoryItem>
                                        <ImageWrapper>
                                            <AccessoryImage
                                                src={accessory?.img?.url}
                                                alt={accessory?.name}
                                            />
                                        </ImageWrapper>
                                        <p>{accessory?.name}</p>
                                    </AccessoryItem>
                                </Link>
                            );
                        })}
                    </AccessoriesListContainer>
                </AccessoriesContainer>
                <Reviews />
            </AccessoriesMain>
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

const AccessoriesContainer = styled.section`
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
    gap: 0px;
`;

const AccessoryImage = styled.img`
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    margin: 0 auto;
    &:hover {
        transform: scale(1.1);
    }
`;

const AccessoriesMain = styled(MainContainer)`
    flex-direction: column;
`;

const AccessoriesFiltersContainer = styled.div`
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

const AccessoryFilter = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    text-align: center;
`;

const AccessoriesWrapper = styled.div`
    &:not(:last-child) {
        border-bottom: 1px solid #4d3c7b;
    }
    padding: 1rem;
    z-index: 50;
`;

const AccessoriesListContainer = styled.div`
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

const AccessoryItem = styled.div`
    border-radius: 12px;
    background: #160d35;
    padding: 1rem;
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
