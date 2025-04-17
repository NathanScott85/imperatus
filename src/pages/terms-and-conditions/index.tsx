import React from 'react';
import styled from 'styled-components';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { BreadCrumb } from '../../components/breadcrumbs';
import { Footer } from '../../components/footer';
// import Reviews from '../../components/reviews';
import { Link } from 'react-router-dom';
import {
    AmericanExpress,
    Discover,
    Mastercard,
    Stripe,
    Visa,
} from '../../components/svg';

export const TermsAndConditions = () => (
    <>
        <TopHeader />
        <Header background />
        <Navigation background />
        <BreadCrumb label="Terms & Conditions" />
        <MainContainer>
            <Section>
                <Content>
                    <Subtitle>Introduction</Subtitle>
                    <Paragraph>
                        Welcome to <strong>Imperatus Games</strong>. <br />
                        These terms and conditions outline the rules and
                        regulations for using our website and services. <br />
                        By accessing this website, you agree to these terms in
                        full.
                    </Paragraph>
                </Content>
            </Section>

            <Section>
                <Content>
                    <Subtitle>Company Information</Subtitle>
                    <Paragraph>
                        <strong>Imperatus Games Ltd.</strong>
                    </Paragraph>
                    <Paragraph>
                        <strong>Email:</strong> manager@imperatusgames.co.uk
                    </Paragraph>
                    <Paragraph>
                        <strong>Telephone:</strong> 07542490573
                    </Paragraph>
                    <Paragraph>
                        <strong>Address:</strong> [Insert Business Address]
                    </Paragraph>
                </Content>
            </Section>

            <Section>
                <Content>
                    <Subtitle>Orders and Contract Formation</Subtitle>
                    <Paragraph>
                        When you place an order, you make an offer to purchase
                        goods. <br />
                        Your order is confirmed only when it has been
                        dispatched. <br />
                        We reserve the right to cancel any order due to stock
                        issues, pricing errors, or suspected fraudulent
                        activity.
                    </Paragraph>
                </Content>
            </Section>

            <Section>
                <Content>
                    <Subtitle>Payment Methods</Subtitle>
                    <Paragraph>
                        We currently accept the following payment methods:
                    </Paragraph>
                    <List>
                        <ListItem>
                            <Paragraph>
                                We process all major credit and debit cards
                                securely through
                                <StyledLink
                                    target="_blank"
                                    to="https://stripe.com/gb"
                                >
                                    <Stripe />
                                </StyledLink>
                                a trusted global payment provider.
                            </Paragraph>
                            <StyledLink
                                target="_blank"
                                to="https://www.visa.co.uk/"
                            >
                                <Visa />{' '}
                            </StyledLink>
                            <StyledLink
                                to="https://www.mastercard.co.uk/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Mastercard />
                            </StyledLink>
                            <StyledLink
                                target="_blank"
                                to="https://www.americanexpress.com/"
                            >
                                <AmericanExpress />
                            </StyledLink>
                            <StyledLink
                                target="_blank"
                                to="https://www.discover.com/"
                            >
                                <Discover />
                            </StyledLink>
                        </ListItem>
                        <Paragraph>
                            We aim to enhance our payment options in future and
                            will look to implement the following:
                        </Paragraph>
                        <ListItem>PayPal</ListItem>
                        <ListItem>Apple Pay & Google Pay</ListItem>
                    </List>
                    <Paragraph>
                        <strong>
                            We do not accept cryptocurrency payments.
                        </strong>
                    </Paragraph>
                </Content>
            </Section>

            <Section>
                <Content>
                    <Subtitle>Delivery and Shipping</Subtitle>
                    <Paragraph>
                        Orders are processed within{' '}
                        <strong>1-3 business days</strong>. <br />
                        We currently ship within the{' '}
                        <strong>United Kingdom</strong>. <br />
                        International shipping may be introduced in the future.
                    </Paragraph>
                    <Paragraph>
                        For full details, see our{' '}
                        <StyledLink to="/delivery-policy">
                            Delivery Policy
                        </StyledLink>
                        .
                    </Paragraph>
                </Content>
            </Section>
            <Section>
                <Content>
                    <Subtitle>
                        Pre-Order Cancellations & Release Timeline
                    </Subtitle>
                    <Paragraph>
                        Customers may cancel a pre-order at any time before the
                        order has been dispatched for a full refund.
                        <br />
                        Once a pre-order is within one day of its official
                        release date, it is prepared for shipment and can no
                        longer be canceled.
                        <br />
                        At this stage, the order is locked in our system, and
                        any changes or cancellations will need to follow our
                        standard returns policy after delivery.
                        <br />
                        If a pre-ordered item decreases in price before it is
                        shipped, we will refund the difference upon request.
                        <br />
                        Please note that pre-orders are subject to availability,
                        and while we aim to fulfill all orders, unforeseen
                        circumstances may lead to delays or cancellations.
                        <br />
                        In such cases, we will notify customers as soon as
                        possible and issue a full refund if necessary.
                    </Paragraph>
                </Content>
            </Section>

            <Section>
                <Content>
                    <Subtitle>Returns and Refunds</Subtitle>
                    <Paragraph>
                        Returns are accepted within <strong>30 days</strong> if
                        the product is unused and in original packaging.
                        <br />
                        Opened trading card products and custom items are{' '}
                        <strong>non-returnable</strong> unless faulty.
                    </Paragraph>
                    <Paragraph>
                        For more details, see our{' '}
                        <StyledLink to="/returns-policy">
                            <strong>Returns Policy</strong>
                        </StyledLink>
                        .
                    </Paragraph>
                </Content>
            </Section>

            <Section>
                <Content>
                    <Subtitle>Product Availability</Subtitle>
                    <Paragraph>
                        All orders are subject to stock availability.
                        <br />
                        Pre-order payments are taken at the time of order, and
                        items ship upon release.
                    </Paragraph>
                </Content>
            </Section>

            <Section>
                <Content>
                    <Subtitle>Limitation of Liability</Subtitle>
                    <Paragraph>
                        We are not responsible for indirect, incidental, or
                        consequential damages resulting from the use of our
                        products or website.
                    </Paragraph>
                </Content>
            </Section>

            <Section>
                <Content>
                    <Subtitle>Privacy Policy</Subtitle>
                    <Paragraph>
                        We respect your privacy and do not track personal data
                        at this time.
                        <br />
                        In the future, we may implement tracking for{' '}
                        <strong>
                            last-viewed products and recommendations
                        </strong>{' '}
                        <br />
                        to enhance your experience.
                    </Paragraph>
                    <Paragraph>
                        For details, see our{' '}
                        <StyledLink to="/privacy-policy">
                            <strong> Privacy Policy</strong>
                        </StyledLink>
                        .
                    </Paragraph>
                </Content>
            </Section>

            <Section>
                <Content>
                    <Subtitle>Intellectual Property</Subtitle>
                    <Paragraph>
                        All content on the Imperatus Games website, including
                        text, graphics, logos, and images,
                        <br />
                        is owned by or licensed to Imperatus Games. Unauthorized
                        reproduction or distribution is prohibited.
                    </Paragraph>
                </Content>
            </Section>

            <Section>
                <Content>
                    <Subtitle>Governing Law</Subtitle>
                    <Paragraph>
                        These terms and conditions are governed by the laws of{' '}
                        <strong>England and Wales</strong>.
                        <br />
                        Any disputes will be resolved in the courts of England
                        and Wales.
                    </Paragraph>
                </Content>
            </Section>

            <Section>
                <Content>
                    <Subtitle>Changes to Terms</Subtitle>
                    <Paragraph>
                        We reserve the right to update these terms and
                        conditions at any time.
                        <br />
                        Any changes will be posted here, and continued use of
                        our services constitutes acceptance of the updated
                        terms.
                    </Paragraph>
                </Content>
            </Section>

            <Section>
                <Content>
                    <Subtitle>Contact Information</Subtitle>
                    <Paragraph>For any questions, contact us at:</Paragraph>
                    <List>
                        <ListItem>
                            Email: <span>Manager@imperatusgames.co.uk</span>
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
    svg {
        width: 50px;
        height: 50px;
        margin-left: -5px;
        margin-right: -5px;
        margin-bottom: -17px;
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
