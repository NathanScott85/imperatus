import React from 'react';
import styled from 'styled-components';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { BreadCrumb } from '../../components/breadcrumbs';
import { Footer } from '../../components/footer';
import { Container } from '../../components/styled';
// import Reviews from '../../components/reviews';

export const PrivacyPolicy = () => (
    <>
        <TopHeader />
        <Header background />
        <Navigation background />
        <BreadCrumb label="Privacy Policy" />
        <Container>
            <Background />
        </Container>
        <MainContainer>
            <Section>
                <Content>
                    <Subtitle>Personal Data We Collect</Subtitle>
                    <Paragraph>
                        We collect various types of personal data, including:
                    </Paragraph>
                    <List>
                        <ListItem>
                            Identity Data (e.g., name, username, date of birth)
                        </ListItem>
                        <ListItem>
                            Contact Data (e.g., email address, phone number,
                            billing and shipping addresses)
                        </ListItem>
                        <ListItem>
                            Transaction Data (e.g., details of payments and
                            purchases)
                        </ListItem>
                        <ListItem>
                            Technical Data (e.g., IP address, browser type,
                            device type, cookies)
                        </ListItem>
                    </List>
                </Content>
            </Section>

            <Section>
                <Content>
                    <Subtitle>How We Collect Data</Subtitle>
                    <Paragraph>
                        We use different methods to collect data from and about
                        you, including:
                    </Paragraph>
                    <List>
                        <ListItem>
                            Direct interactions (e.g., signing up, purchasing
                            products, subscribing to newsletters)
                        </ListItem>
                        <ListItem>
                            Automated technologies (e.g., cookies, analytics
                            tracking)
                        </ListItem>
                        <ListItem>
                            Third-party sources (e.g., payment processors,
                            social media integrations)
                        </ListItem>
                    </List>
                </Content>
            </Section>

            <Section>
                <Content>
                    <Subtitle>How We Use Your Data</Subtitle>
                    <Paragraph>
                        We process personal data for various purposes,
                        including:
                    </Paragraph>
                    <List>
                        <ListItem>Fulfilling and managing orders</ListItem>
                        <ListItem>
                            Customer support and service improvements
                        </ListItem>
                        <ListItem>
                            Marketing and promotional communications (with
                            consent)
                        </ListItem>
                        <ListItem>Compliance with legal obligations</ListItem>
                    </List>
                </Content>
            </Section>

            <Section>
                <Content>
                    <Subtitle>Data Retention Policy</Subtitle>
                    <Paragraph>
                        We retain personal data only as long as necessary for
                        legal, accounting, or business purposes.
                    </Paragraph>
                </Content>
            </Section>

            <Section>
                <Content>
                    <Subtitle>Data Sharing & Third-Party Services</Subtitle>
                    <Paragraph>We may share your data with:</Paragraph>
                    <List>
                        <ListItem>Payment processors</ListItem>
                        <ListItem>Shipping providers</ListItem>
                        <ListItem>Analytics and marketing partners</ListItem>
                    </List>
                </Content>
            </Section>

            <Section>
                <Content>
                    <Subtitle>Cookies & Tracking Technologies</Subtitle>
                    <Paragraph>
                        We use cookies and similar tracking technologies to
                        improve user experience. Read our Cookie Policy for more
                        details.
                    </Paragraph>
                </Content>
            </Section>

            <Section>
                <Content>
                    <Subtitle>User Rights</Subtitle>
                    <Paragraph>Under GDPR, you have the right to:</Paragraph>
                    <List>
                        <ListItem>Request access to your data</ListItem>
                        <ListItem>Correct inaccurate data</ListItem>
                        <ListItem>Request data deletion</ListItem>
                        <ListItem>Restrict data processing</ListItem>
                        <ListItem>Object to data use for marketing</ListItem>
                    </List>
                </Content>
            </Section>

            <Section>
                <Content>
                    <Subtitle>Security Measures</Subtitle>
                    <Paragraph>
                        We implement technical and organizational measures to
                        protect personal data from unauthorized access or
                        breaches.
                    </Paragraph>
                </Content>
            </Section>

            <Section>
                <Content>
                    <Subtitle>Changes to the Policy</Subtitle>
                    <Paragraph>
                        We may update this policy periodically. Users will be
                        notified of significant changes.
                    </Paragraph>
                </Content>
            </Section>

            <Section>
                <Content>
                    <Subtitle>Contact Information</Subtitle>
                    <Paragraph>
                        For any privacy-related queries, contact us at:
                    </Paragraph>
                    <List>
                        <ListItem>
                            Email: <span> manager@imperatusgames.co.uk</span>
                        </ListItem>
                        <ListItem>
                            Telephone: <span>07542490573</span>
                        </ListItem>
                    </List>
                </Content>
            </Section>

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
    justify-content: center;
    align-items: center;
    width: 100%;
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
    max-width: 800px;
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
