import React from 'react';
import styled from 'styled-components';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { BreadCrumb } from '../../components/breadcrumbs';
import { Footer } from '../../components/footer';
import Reviews from '../../components/reviews';

export const ReturnsPolicy = () => (
    <>
        <TopHeader />
        <Header background />
        <Navigation background />
        <BreadCrumb label="Returns Policy" />
        <MainContainer>
            <Section>
                <Content>
                    <Subtitle>Returns Eligibility</Subtitle>
                    <Paragraph>
                        Customers can return items within{' '}
                        <strong>30 days</strong> of receiving them, provided
                        they are unused, unopened, and in their original
                        packaging.
                    </Paragraph>
                </Content>
            </Section>

            <Section>
                <Content>
                    <Subtitle>How to Return an Item</Subtitle>
                    <Paragraph>
                        To initiate a return, please contact our support team at{' '}
                        <span>support@imperatusgames.co.uk</span> or on the
                        contact details below with your order number and return
                        request details.
                    </Paragraph>
                    <Paragraph>
                        Items must be securely packaged and shipped to our
                        designated returns address at the customer&#39;s cost
                        unless the item is faulty or incorrect.
                    </Paragraph>
                </Content>
            </Section>

            <Section>
                <Content>
                    <Subtitle>Non-Returnable Items</Subtitle>
                    <Paragraph>
                        The following items cannot be returned unless faulty:
                    </Paragraph>
                    <List>
                        <ListItem>
                            Opened trading card products{' '}
                            <span>(e.g., booster packs, single cards) </span>
                        </ListItem>
                        <ListItem>Personalized or custom-made items</ListItem>
                        <ListItem>
                            Perishable goods <span> (e.g., food, drinks) </span>
                        </ListItem>
                        <ListItem>
                            Items with broken hygiene seals{' '}
                            <span> (e.g., cosmetics, toiletries)</span>
                        </ListItem>
                    </List>
                </Content>
            </Section>

            <Section>
                <Content>
                    <Subtitle>Damaged or Faulty Items</Subtitle>
                    <Paragraph>
                        If you receive a faulty or damaged item, please notify
                        us within <strong>30 days</strong> of receiving your
                        order.
                    </Paragraph>
                    <Paragraph>
                        We will offer a replacement, refund, or repair at no
                        additional cost.
                    </Paragraph>
                </Content>
            </Section>

            <Section>
                <Content>
                    <Subtitle>Refund Processing</Subtitle>
                    <Paragraph>
                        Refunds will be processed within{' '}
                        <strong>14 days</strong> after we receive the returned
                        goods.
                    </Paragraph>
                    <Paragraph>
                        Refunds will be issued to the original payment method.
                        Store credit purchases will be refunded as store credit.
                    </Paragraph>
                </Content>
            </Section>

            <Section>
                <Content>
                    <Subtitle>Pre-Order Cancellations</Subtitle>
                    <Paragraph>
                        Customers may cancel a pre-order at any time before
                        dispatch for a full refund.
                    </Paragraph>
                    <Paragraph>
                        If a pre-ordered item decreases in price before
                        shipment, we will refund the difference upon request.
                    </Paragraph>
                </Content>
            </Section>

            <Section>
                <Content>
                    <Subtitle>Contact Information</Subtitle>
                    <Paragraph>
                        For any return-related queries, contact us at:
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
            <br />
            {/* <Reviews /> */}
            {/* <p>Replace with Latest Products</p> */}
        </MainContainer>
        <Footer />
    </>
);

const MainContainer = styled.main`
    background-color: #130a30;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin: 0 auto;
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
