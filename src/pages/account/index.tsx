import React from 'react';
import styled from 'styled-components';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { BreadCrumb } from '../../components/breadcrumbs';
import { Footer } from '../../components/footer';
import { Link } from 'react-router-dom';
import { FancyContainer } from '../../components/fancy-container';
import {
    Heart,
    AdminIcon,
    ClockThree,
    CreditCard,
    Van,
    UserIcon,
    SignOut,
} from '../../components/svg';
import { Input } from '../../components/input';

export const Account = () => {
    return (
        <>
            <TopHeader />
            <Header background />
            <Navigation background />
            <BreadCrumb label="Account" />
            <AccountMain>
                <section>
                    <FancyContainer variant="account" size="account">
                        <AccountLinksContainer>
                            <StyledLink to="/account/personal-details">
                                <UserIcon />
                                Personal details
                            </StyledLink>
                            <StyledLink to="/account/delivery-addresses">
                                <Van />
                                Delivery addresses
                            </StyledLink>
                            <StyledLink to="/account/payment-info">
                                <CreditCard /> Payment info
                            </StyledLink>
                            <StyledLink to="/account/order-history">
                                <ClockThree /> Order history
                            </StyledLink>
                            <StyledLink to="/wishlist">
                                <Heart /> Wishlist
                            </StyledLink>
                            <StyledLink to="/account/account-management">
                                <AdminIcon /> Account management
                            </StyledLink>
                            <StyledLink to="/account/sign-out">
                                <SignOut /> Sign out
                            </StyledLink>
                        </AccountLinksContainer>
                    </FancyContainer>
                </section>
                <AccountContainer>
                    <AccountDetailsSection>
                        <h1>My Account</h1>
                        <h3>Personal Details</h3>
                        <Form>
                            <Label>Full Name</Label>
                            <Input name="fullname" variant="secondary" />
                            <Label>Email Address</Label>
                            <Input name="email" variant="secondary" />
                            <Label>Password</Label>
                            <Input name="email" variant="secondary" />
                            <Label>Confirm Password</Label>
                            <Input name="email" variant="secondary" />
                            <BirthdayContainer>
                                <Label>Birthday</Label>
                                <BirthdayWrapper>
                                    <Input
                                        variant="birthday"
                                        name="day"
                                        placeholder="DD"
                                    />
                                    <Input
                                        variant="birthday"
                                        name="month"
                                        placeholder="MM"
                                    />
                                    <Input
                                        variant="birthday"
                                        name="year"
                                        placeholder="YYYY"
                                    />
                                </BirthdayWrapper>
                            </BirthdayContainer>
                        </Form>
                    </AccountDetailsSection>
                </AccountContainer>
            </AccountMain>
            <Footer />
        </>
    );
};

const AccountLinksContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    text-align: center;
    padding: 1rem;
    z-index: 50;
`;

const Form = styled.form`
    color: white;
    display: flex;
    flex-direction: column;
    text-align: left;
    h1 {
        font-family: Cinzel;
        font-size: 26px;
        font-weight: 400;
        line-height: 35.05px;
        align-items: center;
        padding: 2rem 0;
    }

    label {
        font-family: Barlow;
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        text-align: left;
        margin-bottom: 1rem;
    }
`;

const BirthdayContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const BirthdayWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1.6rem;
    justify-content: space-evenly;
`;

const StyledLink = styled(Link)`
    display: flex;
    align-items: center;
    letter-spacing: 0.02em;
    color: white;
    font-family: Barlow;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    text-align: left;
    margin: 1rem 0;
    text-decoration: none;

    &:hover {
        color: #c79d0a;
    }

    svg {
        margin-right: 1rem;
    }

    z-index: 50;
`;

const AccountContainer = styled.section`
    display: flex;
    flex-direction: row;
    margin: 0.75rem 0rem 0rem 2rem;
`;

const AccountMain = styled.main`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    background-color: #130a30;
    padding: 2rem;
    min-height: 800px;
`;

const AccountDetailsSection = styled.div`
    padding: 0rem 2rem 2rem 2rem;
    h1 {
        color: white;
        letter-spacing: 0.02em;
        font-family: Cinzel;
        font-size: 34px;
        font-weight: 400;
        line-height: 50px;
        text-align: left;
    }

    h3 {
        text-align: left;
        padding: 2rem 0;
        font-family: Cinzel;
        font-size: 20px;
        font-weight: 400;
        line-height: 35.05px;
        text-align: left;
        color: white;
    }
`;

const Label = styled.label`
    display: flex;
    flex-direction: column;
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
    color: white;
    font-family: Barlow;
    font-size: 18px;
    font-weight: 400;
`;
