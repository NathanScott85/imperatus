import React from 'react';
import styled from 'styled-components';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { BreadCrumb } from '../../components/breadcrumbs';
import { Footer } from '../../components/footer';
import Reviews from '../../components/reviews';
import { AmericanExpress, Discover, Mastercard, Stripe, Visa } from '../../components/svg';
import { Link } from 'react-router-dom';

export const PaymentMethods = () => (
    <>
        <TopHeader />
        <Header background />
        <Navigation background />
        <BreadCrumb label="Payment Methods" />
        <MainContainer>
            <Section>
                <Content>
                    <Subtitle>Accepted Payment Methods</Subtitle>
                    <Paragraph>
                        At Imperatus Games, we aim to provide a secure and seamless checkout experience. We currently accept the following payment methods:
                    </Paragraph>
                </Content>
            </Section>

            <Section>
                <Content>
                    <Subtitle>Stripe (Credit & Debit Cards)</Subtitle>
                    <Paragraph>
                        We process all major credit and debit cards securely through <StyledLink target="_blank" to="https://stripe.com/gb"><Stripe /></StyledLink> a trusted global payment provider.
                    </Paragraph>
                    <List>
              
                        <ListItem>
                        <StyledLink target="_blank" to="https://www.visa.co.uk/"><Visa /> </StyledLink>
                        <StyledLink to="https://www.mastercard.co.uk/" target="_blank" rel="noopener noreferrer">
                                <Mastercard />
                            </StyledLink>
                            <StyledLink target="_blank" to="https://www.americanexpress.com/">
                                <AmericanExpress />
                            </StyledLink>
                            <StyledLink target="_blank" to="https://www.discover.com/">
                                <Discover />
                            </StyledLink>
                        </ListItem>

                     
                    </List>
                    <Paragraph>
                        Payments are encrypted and protected to ensure your security.
                    </Paragraph>
                </Content>
            </Section>

            <Section>
                <Content>
                    <Subtitle>Future Payment Methods</Subtitle>
                    <Paragraph>
                        We are continuously working to expand our payment options. In the future, we plan to introduce:
                    </Paragraph>
                    <List>
                        <ListItem>PayPal – for fast and secure transactions.</ListItem>
                        <ListItem>Apple Pay & Google Pay – for convenient one-tap payments.</ListItem>
                        <ListItem>Klarna or Clearpay – for flexible buy now, pay later options.</ListItem>
                    </List>
                </Content>
            </Section>

            <Section>
                <Content>
                    <Subtitle>Security & Fraud Protection</Subtitle>
                    <Paragraph>
                        All transactions are <strong>SSL encrypted</strong> and processed through secure gateways. We do not store your payment details on our servers.
                    </Paragraph>
                    <Paragraph>
                        Orders flagged for fraud prevention may require additional verification before processing.
                    </Paragraph>
                </Content>
            </Section>

            <Section>
                <Content>
                    <Subtitle>Frequently Asked Questions</Subtitle>
                    <Paragraph><strong>Is my payment secure?</strong></Paragraph>
                    <Paragraph>
                        Yes, all transactions are securely processed using industry-leading encryption and fraud protection measures.
                    </Paragraph>
                    <Paragraph><strong>Can I save my payment details for future purchases?</strong></Paragraph>
                    <Paragraph>
                        At this time, we do not store payment details for security reasons. However, Stripe may offer secure card storage options through their system.
                    </Paragraph>
                    <Paragraph><strong>Will more payment methods be available soon?</strong></Paragraph>
                    <Paragraph>
                        Yes! We are actively working to introduce more payment options in the near future.
                    </Paragraph>
                </Content>
            </Section>

            <Section>
                <Content>
                    <Subtitle>Contact Information</Subtitle>
                    <Paragraph>
                        For any payment-related queries, contact us at:
                    </Paragraph>
                    <List>
                        <ListItem>Email: <span>Manager@imperatusgames.co.uk</span></ListItem>
                        <ListItem>Telephone: <span>07542490573</span></ListItem>
                    </List>
                </Content>
            </Section>
            <br />
            <Reviews />
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
    svg {
        padding-left: 0.2rem;
    }
`;