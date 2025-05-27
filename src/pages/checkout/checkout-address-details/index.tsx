import React from 'react';
import styled from 'styled-components';

interface Props {
    email: string;
    fullname: string;
    address: string;
    city: string;
    postcode: string;
    phone: string;
}

export const CheckoutAddressDetails = ({
    email,
    fullname,
    address,
    city,
    postcode,
    phone,
}: Props) => (
    <>
        <Section>
            <SectionTitle>Email Address</SectionTitle>
            <StaticInfo>{email}</StaticInfo>
        </Section>
        <Section>
            <SectionTitle>Delivery Address</SectionTitle>
            <StaticInfo>{fullname}</StaticInfo>
            <StaticInfo>{address}</StaticInfo>
            <StaticInfo>{city}</StaticInfo>
            <StaticInfo>{postcode}</StaticInfo>
            <StaticInfo>United Kingdom</StaticInfo>
            <StaticInfo>{phone}</StaticInfo>
        </Section>
    </>
);

const Section = styled.div`
    background: #221745;
    padding: 1rem;
    border-radius: 8px;
    color: white;
    border: 2px solid #4d3c7b;
`;

const SectionTitle = styled.h2`
    font-family: Cinzel;
    font-size: 20px;
    margin-bottom: 10px;
    color: #c79d0a;
`;

const StaticInfo = styled.div`
    font-size: 16px;
    margin-bottom: 6px;
    p {
        font-size: 16px;
    }
    svg {
        width: 48px;
        height: 48px;
    }
`;
