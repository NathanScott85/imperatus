import React from 'react';
import styled from 'styled-components';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { BreadCrumb } from '../../components/breadcrumbs';
import { Footer } from '../../components/footer';
import DiscountImage from '../../components/svg/website-images/discount-image.png';

export const DiscountCodes = () => (
    <>
        <TopHeader />
        <Header background />
        <Navigation background />
        <BreadCrumb label="Discount Codes" />

        <MainContainer>
            <Title>Discounts</Title>
            <Paragraph>
                At Imperatus Games, we believe in rewarding our customers.
                Whether you&#39;re a first-time buyer <br /> or a loyal
                returning customer, we offer discount codes to help you save on
                your favorite games.
            </Paragraph>
            <Section>
                <LeftContent>
                    <Title>Save on Your First Purchase</Title>
                    <Image src={DiscountImage} alt="5% Off Your First Order" />
                </LeftContent>

                {/* Right Side */}
                <RightContent>
                    <Subtitle>First Order Discount</Subtitle>
                    <Paragraph>
                        Get <strong>5% off</strong> your first order when you
                        shop with us! Your discount will be applied
                        automatically at checkout—no code needed.
                    </Paragraph>

                    <Subtitle>How to Use Discount Codes</Subtitle>
                    <Paragraph>
                        If you have a discount code, simply enter it at
                        checkout, and the discount will be applied to your
                        total. Be sure to check the terms of the code, as some
                        discounts may have specific conditions.
                    </Paragraph>

                    <Subtitle>Stay Updated on New Discounts</Subtitle>
                    <Paragraph>
                        We regularly offer special promotions and exclusive
                        discounts. Sign up for our newsletter to be the first to
                        hear about new deals and upcoming offers!
                    </Paragraph>

                    <Subtitle>Terms & Conditions</Subtitle>
                    <Paragraph>
                        Discounts cannot be combined unless stated otherwise.
                        Some exclusions may apply, such as pre-orders, exclusive
                        items, or limited edition products. Check each promotion
                        for full details.
                    </Paragraph>
                </RightContent>
            </Section>
            <Section>
                <Content>
                    <Subtitle>Contact Information</Subtitle>
                    <Paragraph>
                        For any discount related queries, contact us at:
                    </Paragraph>
                    <List>
                        <ListItem>
                            Email: <span> support@imperatusgames.co.uk</span>
                        </ListItem>
                        <ListItem>
                            Telephone: <span>07542490573</span>
                        </ListItem>
                    </List>
                </Content>
            </Section>
        </MainContainer>
        <Footer />
    </>
);

const Content = styled.div`
    width: 100%;
    margin: 0 auto;
    font-family: Barlow;
    border-radius: 8px;
    color: white;
    text-align: center;
`;

const List = styled.ul`
    margin-left: 8px;
    padding-left: 8px;
`;

const ListItem = styled.li`
    margin-bottom: 5px;
    list-style-type: none;
    line-height: 1.5;
    font-family: Barlow;
    font-size: 1.2rem;
    span {
        font-family: Barlow;
        font-size: 1.2rem;
        color: #c79d0a;
    }
    strong {
        font-family: Barlow;
        font-size: 1.2rem;
        color: #c79d0a;
    }
`;

const MainContainer = styled.main`
    background-color: #130a30;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin: 0 auto;
    padding: 2rem;
`;

const Section = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    max-width: 1200px;
    padding: 2rem;
    gap: 2rem;

    @media (max-width: 1024px) {
        flex-direction: column;
        align-items: center;
    }
`;

const LeftContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`;

const RightContent = styled.div`
    max-width: 55%;
    text-align: left;
`;

const Title = styled.h1`
    font-family: Cinzel, serif;
    font-size: 28px;
    color: #c79d0a;
    margin-bottom: 1rem;
`;

const Image = styled.img`
    width: 100%;
    max-width: 450px;
    border-radius: 5px;
    margin: 0.5rem;
`;

const Subtitle = styled.h2`
    font-family: Cinzel, serif;
    font-size: 22px;
    color: #c79d0a;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
`;

const Paragraph = styled.p`
    line-height: 1.5;
    margin-bottom: 10px;
    font-family: Barlow;
    font-size: 18px;
    color: white;
    span {
        font-family: Barlow;
        font-size: 1.2rem;
        color: #c79d0a;
    }
    strong {
        font-family: Barlow;
        font-size: 1.2rem;
        color: #c79d0a;
    }
`;

export default DiscountCodes;
