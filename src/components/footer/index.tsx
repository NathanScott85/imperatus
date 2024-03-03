import styled from '@emotion/styled';
import React from 'react';

export const Footer = () => (
    <FooterContainer>
        <FooterWrapper>
            <FooterContent>
                <h1>Contact Us</h1>
                <span>
                    <p>First Line of address, Second Line of address</p>
                    <p>City, County, Postcode</p>
                </span>
                <span>
                    <p>support@imperatus.co.uk</p>
                    <p>01303 287091</p>
                </span>
                <span>
                    VAT Number: 123456789
                </span>
                <span>
                    Company Number: 123456789
                </span>
            </FooterContent>
            <FooterContent>
                <h1>
                    Social Media
                </h1>
                <span> Facebook</span>
                <span> Twitter</span>
                <span> Instagram</span>
                <span> Youtube</span>
            </FooterContent>
            <FooterContent>
                <h1>
                    Payment Methods
                </h1>
                <span>Visa</span>
                <span>Mastercard</span>
                <span>Paypal</span>
            </FooterContent>
            <FooterContent>
                <h1>
                    My Account
                </h1>
                <span>My Account</span>
                <span>Adresses</span>
                <span>Europe</span>
                <span>Rest of the World</span>
            </FooterContent>
        </FooterWrapper>
    </FooterContainer>
);

const FooterContainer = styled('footer')`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 1.5rem 1.5rem;
    background-color: #1E2D3F;
    color: white;
    
    h1{
        color: #D4B05F;
        font-size: 1.2rem;
    }
`;

const FooterWrapper = styled('div')`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
`;

const FooterContent = styled.span`
    display: flex;
    flex-direction: column;
    margin: 1.5rem 1.5rem 0 0;
    padding: 1rem;
    text-align: left;
`;
