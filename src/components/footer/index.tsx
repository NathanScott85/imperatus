import styled from '@emotion/styled';
import React from 'react';
import { ImageContainer } from '../styled';
import { ImperatusLink } from '../imperatus-link';
import FooterIMG from '../../components/svg/website-images/footer-bg.png'
export const Footer = () => (
    <FooterContainer>
        <Section>
       
        <FooterWrapper>
            <FooterContent>
                <Span>
                <ImperatusLink />
                    <p>First Line of address,</p>
                    <p> Second Line of address</p>
                    <p>City, County, Postcode</p>
                </Span>
                <Span>
                    <p>support@imperatus.co.uk</p>
                    <p>01303 287091</p>
                </Span>
                <Span>
                    VAT Number: 123456789
                </Span>
                <Span>
                    Company Number: 123456789
                </Span>
            </FooterContent>
            <FooterContent>
                <h1>
                    Social Media
                </h1>
                <Span> Facebook</Span>
                <Span> Twitter</Span>
                <Span> Instagram</Span>
                <Span> Youtube</Span>
            </FooterContent>
            <FooterContent>
                <h1>
                    Payment Methods
                </h1>
                <Span>Visa</Span>
                <Span>Mastercard</Span>
                <Span>Paypal</Span>
            </FooterContent>
            <FooterContent>
                <h1>
                    My Account
                </h1>
                <Span>My Account</Span>
                <Span>Adresses</Span>
                <Span>Europe</Span>
                <Span>Rest of the World</Span>
            </FooterContent>
        </FooterWrapper>
        </Section>
        <ImageContainer img={FooterIMG}/> 

       
       
       
    </FooterContainer>
);

const FooterContainer = styled('footer')`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2.5rem 2.5rem;
    margin: 2.5rem 2.5rem;
    height: 100%;
    
    h1{
        color: #D4B05F;
        font-size: 1.2rem;
    }
`;
const Span = styled.span`
   font-family: Barlow, sans-serif;
font-size: 16px;
font-weight: 400;
line-height: 28px;
text-align: left;


`;
const Section = styled.section`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    width: 100%;
    height: 100%;
    color: white;
    font-weight: bold;
    font-size: 1.5rem;
`;

const FooterWrapper = styled('div')`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    font-size: 16px;
`;

const FooterContent = styled.span`
    display: flex;
    flex-direction: column;
    margin: 1.5rem 1.5rem 0 0;
    padding: 1rem;
    text-align: left;
`;
