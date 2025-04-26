import React from 'react';
import styled from 'styled-components';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { BreadCrumb } from '../../components/breadcrumbs';
import { Footer } from '../../components/footer';
// import Reviews from '../../components/reviews';

export const CookiePolicy = () => (
    <>
        <TopHeader />
        <Header background />
        <Navigation background />
        <BreadCrumb label="Cookie Policy" />
        <MainContainer>
            <Section>
                <Content>
                    <Subtitle>Introduction</Subtitle>
                    <Paragraph>
                        Imperatus Games values your privacy and is committed to
                        transparency regarding how we use cookies on our
                        website.
                        <br />
                        Currently, we do <strong>not</strong> use cookies or
                        track user data for analytical, advertising, or
                        behavioral tracking purposes.
                        <br />
                        However, this may change in the future as we enhance our
                        services to improve user experience.
                    </Paragraph>
                </Content>
            </Section>

            <Section>
                <Content>
                    <Subtitle>How We May Use Cookies in the Future</Subtitle>
                    <Paragraph>
                        While we do not actively track users at this time, we
                        may introduce cookies in the future for the following
                        purposes:
                    </Paragraph>
                    <List>
                        <ListItem>
                            <strong>Personalized Shopping Experience</strong> –
                            To improve product discovery and provide relevant
                            recommendations.
                        </ListItem>
                        <ListItem>
                            <strong>Essential Cookies</strong> – To ensure
                            website functionality, such as maintaining session
                            information.
                        </ListItem>
                        <ListItem>
                            <strong>Analytics & Performance Tracking</strong> –
                            To understand how users interact with our site and
                            improve navigation.
                        </ListItem>
                        <ListItem>
                            <strong>Marketing & Advertising</strong> – To tailor
                            promotions and offers based on browsing behavior.
                        </ListItem>
                    </List>
                </Content>
            </Section>

            <Section>
                <Content>
                    <Subtitle>Last Products Viewed & Recommendations</Subtitle>
                    <Paragraph>
                        We have developed a{' '}
                        <strong>custom tracking system</strong> to store
                        last-viewed products and provide{' '}
                        <strong>personalized recommendations</strong>.
                        <br />
                        This system will be implemented directly within our
                        platform, ensuring a tailored shopping experience{' '}
                        <strong>
                            without relying on third-party tracking services
                        </strong>
                        .
                    </Paragraph>
                    <Paragraph>
                        <strong>How This Works:</strong>
                    </Paragraph>
                    <List>
                        <ListItem>
                            Your <strong>recently viewed products</strong> will
                            be stored locally to help you easily revisit them.
                        </ListItem>
                        <ListItem>
                            We will generate{' '}
                            <strong>product recommendations</strong> based on
                            your browsing history.
                        </ListItem>
                        <ListItem>
                            This system will function{' '}
                            <strong>entirely within our website</strong>,
                            ensuring privacy and security.
                        </ListItem>
                    </List>
                    <Paragraph>
                        This feature is designed to{' '}
                        <strong>
                            enhance your shopping experience while keeping your
                            data private
                        </strong>
                        .
                        <br />
                        We will update this policy once the system is fully
                        implemented.
                    </Paragraph>
                </Content>
            </Section>

            <Section>
                <Content>
                    <Subtitle>Managing Cookies</Subtitle>
                    <Paragraph>
                        Once cookies are introduced, users will have control
                        over their preferences.
                        <br />
                        We will provide options to{' '}
                        <strong>accept, decline, or manage cookies</strong>{' '}
                        through browser settings or a cookie consent banner.
                    </Paragraph>
                </Content>
            </Section>

            <Section>
                <Content>
                    <Subtitle>Policy Updates</Subtitle>
                    <Paragraph>
                        As our website evolves, we may update this Cookie Policy
                        to reflect{' '}
                        <strong>
                            new technologies, website features, and legal
                            requirements
                        </strong>
                        .
                        <br />
                        Any changes will be communicated on this page.
                    </Paragraph>
                </Content>
            </Section>

            <Section>
                <Content>
                    <Subtitle>Contact Us</Subtitle>
                    <Paragraph>
                        If you have any questions about this Cookie Policy,
                        please contact us:
                    </Paragraph>
                    <List>
                        <ListItem>
                            Email: <span>support@imperatusgames.co.uk</span>
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
