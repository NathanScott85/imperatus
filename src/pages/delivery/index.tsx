import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { BreadCrumb } from '../../components/breadcrumbs';
import { Footer } from '../../components/footer';
import Reviews from '../../components/reviews';


export const Delivery = () => (
    <>
        <TopHeader />
        <Header background />
        <Navigation background />
        <BreadCrumb label="Delivery Policy" />
        <MainContainer>
            <Section>
                <Content>
                    <Subtitle>Order Processing Time</Subtitle>
                    <Paragraph>
                        Orders are typically processed within 1-3 business days
                        of receiving your order.
                    </Paragraph>
                </Content>
            </Section>

            <Section>
                <Content>
                    <Subtitle>Shipping Methods and Costs</Subtitle>
                    <Paragraph>
                        We offer the following shipping methods:
                    </Paragraph>
                    <List>
                        <ListItem>1st Class Letter: £1.25 (up to 100g)</ListItem>
                        <ListItem>2nd Class Letter: £0.75 (up to 100g)</ListItem>
                        <ListItem>1st Class Large Letter: £1.95 (up to 250g)</ListItem>
                        <ListItem>2nd Class Large Letter: £1.55 (up to 250g)</ListItem>
                        <br />
                        <ListItem>
                            Royal Mail 1st Class: From £3.69 (Small Parcel, up
                            to 2kg)
                        </ListItem>
                        <ListItem>
                            Royal Mail 2nd Class: From £3.29 (Small Parcel, up
                            to 2kg)
                        </ListItem>
                        <ListItem>
                            Tracked 24 (Next Day Delivery): From £4.19
                        </ListItem>
                        <ListItem>
                            Tracked 48 (2-Day Delivery): From £3.49
                        </ListItem>
                        <ListItem>
                            Express Shipping (via DPD/FedEx/UPS): From £7.99
                        </ListItem>
                    </List>
                    <Paragraph>
                        We offer free standard shipping on orders over £50.
                    </Paragraph>
                    <Paragraph>
                        Shipping costs may be waived for orders exceeding a
                        certain value threshold.
                    </Paragraph>
                    <Paragraph>
                        Shipping costs are subject to change based on carrier rate adjustments,
                        <br />
                        seasonal demand, and promotional offers.
                        <br />
                        We recommend checking our checkout page for the most up-to-date shipping fees.
                    </Paragraph>
                </Content>
            </Section>

            <Section>
                <Content>
                    <Subtitle>Delivery Time Estimates</Subtitle>
                    <Paragraph>Estimated delivery times:</Paragraph>
                    <List>
                        <ListItem>
                            Standard Shipping: 5-7 business days
                        </ListItem>
                        <ListItem>Express Shipping: 2-3 business days</ListItem>
                    </List>
                </Content>
            </Section>

            <Section>
                <Content>
                    <Subtitle>Shipping Locations</Subtitle>
                    <Paragraph>
                        We currently deliver within the UK. In the future, <br />
                        we plan to expand our shipping options to include other destinations such as the EU.
                    </Paragraph>
                </Content>
            </Section>

            <Section>
                <Content>
                    <Subtitle>International Shipping</Subtitle>
                    <Paragraph>
                        At this time, we only deliver within the UK. International shipping, <br />
                        including to the EU, will be introduced in the future.
                    </Paragraph>
                </Content>
            </Section>

            <Section>
                <Content>
                    <Subtitle>Tracking Information</Subtitle>
                    <Paragraph>
                        Once your order has shipped, you will receive a tracking
                        number via email.
                    </Paragraph>
                </Content>
            </Section>

            <Section>
                <Content>
                    <Subtitle>Handling Lost or Damaged Packages</Subtitle>
                    <Paragraph>
                        If your package is lost or damaged during transit,
                        please contact us within 7 days of the expected delivery
                        date.
                    </Paragraph>
                </Content>
            </Section>

            <Section>
                <Content>
                    <Subtitle>Returns and Exchanges</Subtitle>
                    <Paragraph>
                        For information on returns and exchanges, please see our
                        <StyledLink to="/returns-policy">
                            Returns Policy
                        </StyledLink>
                        .
                    </Paragraph>
                </Content>
            </Section>
            <Section>
                <Content>
                    <Subtitle>Returns and Exchanges</Subtitle>
                    <Paragraph>
                        For information on returns and exchanges, please see our
                        <StyledLink to="/returns-policy">
                            Returns Policy
                        </StyledLink>
                        .
                    </Paragraph>
                </Content>
            </Section>
            <Section>
                <Content>
                    <Subtitle>Contact Information</Subtitle>
                    <Paragraph>For any delivery related queries, contact us at:</Paragraph>
                    <List>
                        <ListItem>Email: <span> manager@imperatusgames.co.uk</span></ListItem>
                        <ListItem>Telephone: <span>07542490573</span></ListItem>
                    </List>
                </Content>
            </Section>
            <br />
            {/* <Reviews /> */}
            <p>Replace with Latest Products</p>
        </MainContainer>
        <Footer />
    </>
);

const StyledLink = styled(Link)`
    font-family: Barlow;
    font-size: 1rem;
    font-weight: 500;
    line-height: 25px;
    color: #c79d0a;
    padding-left: 0.2rem;
    letter-spacing: 0.02em;
    color: white;
    &:hover {
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
`;

const Background = styled.div`
    background: #130a30;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -2;
`;

const Subtitle = styled.h2`
    font-size: 1.5rem;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 10px;
    font-family: Cinzel;
    text-align: center;
    color: #c79d0a;
`;

const Section = styled.section`
    margin-bottom: 0.5rem;
    display: flex;
    justify-content: center;
`;

const Content = styled.div`
    width: 100%;
    margin: 0 auto;
    font-family: Barlow;
    border-radius: 8px;
    color: white;
    text-align: center;
`;

const Paragraph = styled.p`
    line-height: 1.5;
    margin-bottom: 10px;
    font-family: Barlow;
    font-size: 1.2rem;
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
