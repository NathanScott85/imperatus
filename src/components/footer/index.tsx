import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import FooterIMG from '../../components/svg/website-images/footer-bg.png';
import { ImperatusLink } from '../imperatus-link';

export const Footer = () => {
    return (
        <FooterContainer>
            <ImageContainer img={FooterIMG}>
                <FooterWrapper>
                    <FooterSections>
                        <FooterSection>
                            <span>
                                <ImperatusLink />
                            </span>
                        </FooterSection>
                        <FooterSection>
                            <SectionTitle>Follow us</SectionTitle>
                            <ContentItem>
                                <p></p>
                            </ContentItem>
                            <ContentItem>
                                <FooterLink to="/facebook">Facebook</FooterLink>
                            </ContentItem>
                            <ContentItem>
                                <FooterLink to="/twitter">Twitter</FooterLink>
                            </ContentItem>
                            <ContentItem>
                                <FooterLink to="/instagram">
                                    Instagram
                                </FooterLink>
                            </ContentItem>
                        </FooterSection>

                        <FooterSection>
                            <SectionTitle>Contact us</SectionTitle>
                            <ContentItem>
                                <p>Imperatus Games</p>
                                <p>1234 Street Name</p>
                                <p>City, State, Zip</p>
                                <p>Country</p>
                                <p>Phone: 01234 567 890</p>
                                <p>Email: support@imperatusgames.co.uk</p>
                            </ContentItem>
                            <ContentItem>
                                <p>Mon - Fri 9:00am - 5:00pm</p>
                            </ContentItem>
                        </FooterSection>
                        <FooterSection>
                            <SectionTitle>Resources</SectionTitle>
                            <ContentItem>
                                <FooterLink to="/about-us">About us</FooterLink>
                            </ContentItem>
                            <ContentItem>
                                <FooterLink to="/faqs">FAQS</FooterLink>
                            </ContentItem>
                            <ContentItem>
                                <FooterLink to="/news-&-events">
                                    News & Events
                                </FooterLink>
                            </ContentItem>
                        </FooterSection>
                        <FooterSection>
                            <SectionTitle>Legal</SectionTitle>
                            <ContentItem>
                                <FooterLink to="/privacy-policy">
                                    Privacy Policy
                                </FooterLink>
                            </ContentItem>
                            <ContentItem>
                                <FooterLink to="cookie-policy">
                                    Cookie Policy
                                </FooterLink>
                            </ContentItem>
                            <ContentItem>
                                <FooterLink to="/terms-&-conditions">
                                    Terms & Conditions
                                </FooterLink>
                            </ContentItem>
                        </FooterSection>
                        <FooterSection>
                            <SectionTitle>Ordering</SectionTitle>
                            <ContentItem>
                                <FooterLink to="/payment-methods">
                                    Payment Methods
                                </FooterLink>
                            </ContentItem>
                            <ContentItem>
                                <FooterLink to="/delivery">Delivery</FooterLink>
                            </ContentItem>
                            <ContentItem>
                                <FooterLink to="/returns-policy">
                                    Returns Policy
                                </FooterLink>
                            </ContentItem>
                            <ContentItem>
                                <FooterLink to="/discount-codes">
                                    Discount Codes
                                </FooterLink>
                            </ContentItem>
                        </FooterSection>
                    </FooterSections>
                    <CompanyInfo>
                        <p>
                            Imperatus Games Ltd is a registered company in
                            England & Wales. Company Registration Number:{' '}
                            <strong>16445105</strong>
                        </p>
                        <p>&copy; Copyright 2025 Imperatus Games Ltd</p>
                    </CompanyInfo>
                </FooterWrapper>
            </ImageContainer>
            <div></div>
        </FooterContainer>
    );
};

const FooterContainer = styled.footer`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: Cinzel, serif;
`;

const ImageContainer = styled.div<{ img: any }>`
    position: relative;
    width: 100%;
    height: 509px;
    background-image: ${({ img }) => `url(${img})`};
    background-repeat: no-repeat;
    background-size: cover;
    filter: brightness(90%);
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const FooterWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1200px;
    padding: 3rem 1rem;
    flex-grow: 1;
`;

const FooterSections = styled.div`
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    width: 100%;
    flex-wrap: wrap;
    margin-bottom: 2rem;
    span {
        margin-top: -4.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 1rem;
    }
`;

const FooterSection = styled.div`
    margin-bottom: 2rem;
    text-align: center;
    color: white;
`;

const SectionTitle = styled.h2`
    color: #c79d0a;
    font-family: Cinzel;
    font-size: 20px;
    font-weight: 400;
    line-height: 28px;
    font-weight: bold;
    text-align: center;
    p {
        font-family: Barlow;
        font-size: 14px;
        color: white;
        text-align: center;
        font-weight: normal;
    }
    &:hover {
        color: white;
        font-weight: bold:
    }
`;

const ContentItem = styled.div`
    color: white;
    margin-bottom: 0.5rem;
    p {
        font-size: 1.2rem;
        padding: 0.25rem;
    }
`;

const FooterLink = styled(Link)`
    color: white;
    text-decoration: none;
    font-family: Barlow;
    &:hover {
        text-decoration: underline;
        color: #c79d0a;
        font-weight: bold:
    }
    font-size: 16px;
    margin-bottom: 0.5rem;
`;

const CompanyInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-top: 1px solid #c79d0a;
    margin-top: auto;
    padding-top: 1rem;
    text-align: center;
    color: white;
    font-size: 1rem;
    p {
        font-family: Barlow;
        font-size: 1.2rem;
        font-weight: 600;
        margin-left: 1.2rem;
        margin-bottom: 0.25rem;
    }

    strong {
        color: white;
        font-size: 1.2rem;

        font-weight: 600;
    }
`;
