import React, { useState } from 'react';
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

import { useAppContext } from '../../context';
import { PersonalDetails } from './personal-details';
import { PaymentDetails } from './payment-details';
import { DeliveryInformation } from './delivery-addresses';
import { OrderHistory } from './order-history';
import { OrderDetails } from './order-details';
import { Wishlist } from './wishlist';
import { AccountManagement } from './account-management';

export const Account = () => {
    const { logout } = useAppContext();
    const [selectedComponent, setSelectedComponent] =
        useState('PersonalDetails');
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleMenuClick = (componentName: string) => {
        setSelectedOrder(null);
        setSelectedComponent(componentName);
    };

    const renderComponent = () => {
        if (selectedOrder) {
            return (
                <OrderDetails
                    order={selectedOrder}
                    onBack={() => setSelectedOrder(null)}
                />
            );
        }

        switch (selectedComponent) {
            case 'PersonalDetails':
                return <PersonalDetails />;
            case 'DeliveryAddresses':
                return <DeliveryInformation />;
            case 'PaymentInfo':
                return <PaymentDetails />;
            case 'OrderHistory':
                return <OrderHistory onViewOrder={setSelectedOrder} />;
            // case 'Wishlist':
            //     return <Wishlist />;
            case 'AccountManagement':
                return <AccountManagement />;
            default:
                return <PersonalDetails />;
        }
    };

    return (
        <>
            <TopHeader />
            <Header background />
            <Navigation background />
            <BreadCrumb label="Account" />
            <AccountMain>
                <Section>
                    <h1>My Account</h1>
                    <FancyContainer variant="account" size="account">
                        <AccountLinksContainer>
                            <StyledWrapper
                                onClick={() =>
                                    handleMenuClick('PersonalDetails')
                                }
                            >
                                <UserIcon />
                                Personal Details
                            </StyledWrapper>
                            <StyledWrapper
                                onClick={() =>
                                    handleMenuClick('DeliveryAddresses')
                                }
                            >
                                <Van stroke='#C79D0A' />
                                Delivery Address
                            </StyledWrapper>
                            <StyledWrapper
                                onClick={() => handleMenuClick('PaymentInfo')}
                            >
                                <CreditCard /> Payment Details
                            </StyledWrapper>
                            <StyledWrapper
                                onClick={() => handleMenuClick('OrderHistory')}
                            >
                                <ClockThree /> Order history
                            </StyledWrapper>
                            {/* <StyledWrapper
                                onClick={() => handleMenuClick('Wishlist')}
                            >
                                <Heart /> Wishlist
                            </StyledWrapper> */}
                            <StyledWrapper
                                onClick={() =>
                                    handleMenuClick('AccountManagement')
                                }
                            >
                                <AdminIcon /> Account Management
                            </StyledWrapper>
                            <StyledLink onClick={logout} to="/account/sign-out">
                                <SignOut /> Sign out
                            </StyledLink>
                        </AccountLinksContainer>
                    </FancyContainer>
                </Section>
                <AccountContainer>{renderComponent()}</AccountContainer>
            </AccountMain>
            <Footer />
        </>
    );
};

const Section = styled.section`
    h1 {
        color: white;
        letter-spacing: 0.02em;
        font-family: Cinzel;
        font-size: 34px;
        font-weight: 400;
        line-height: 50px;
        text-align: left;
        margin-left: 20px;
    }
`;

const AccountLinksContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    text-align: center;
    padding: 1rem;
    z-index: 50;
`;

const StyledWrapper = styled.span`
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
    cursor: pointer;

    &:hover {
        color: #c79d0a;
    }

    svg {
        margin-right: 1rem;
    }

    z-index: 50;
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
    cursor: pointer;

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
