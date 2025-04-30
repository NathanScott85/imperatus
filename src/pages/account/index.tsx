import React, { useState } from 'react';
import styled from 'styled-components';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { BreadCrumb } from '../../components/breadcrumbs';
import { Footer } from '../../components/footer';
import { Link } from 'react-router-dom';
import { FancyContainer } from '../../components/fancy-container';
import {
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
import { AccountManagement } from './account-management';
import { Order } from '../../context/orders';

export const Account = () => {
    const { logout } = useAppContext();
    const [selectedComponent, setSelectedComponent] =
        useState('PersonalDetails');
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const handleMenuClick = (componentName: string) => {
        setSelectedOrder(null);
        setSelectedComponent(componentName);
    };

    const renderStandardComponent = () => {
        switch (selectedComponent) {
            case 'PersonalDetails':
                return <PersonalDetails />;
            case 'DeliveryAddresses':
                return <DeliveryInformation />;
            case 'PaymentInfo':
                return <PaymentDetails />;
            case 'AccountManagement':
                return <AccountManagement />;
            default:
                return <PersonalDetails />;
        }
    };

    const renderOrderComponent = () => {
        if (selectedOrder) {
            return (
                <OrderDetails
                    order={selectedOrder}
                    onBack={() => setSelectedOrder(null)}
                />
            );
        }

        return <OrderHistory onViewOrder={setSelectedOrder} />;
    };

    const SidebarLinks = () => (
        <>
            <StyledWrapper onClick={() => handleMenuClick('PersonalDetails')}>
                <UserIcon /> Personal Details
            </StyledWrapper>
            <StyledWrapper onClick={() => handleMenuClick('DeliveryAddresses')}>
                <Van stroke="#C79D0A" /> Delivery Address
            </StyledWrapper>
            <StyledWrapper onClick={() => handleMenuClick('PaymentInfo')}>
                <CreditCard /> Payment Details
            </StyledWrapper>
            <StyledWrapper onClick={() => handleMenuClick('OrderHistory')}>
                <ClockThree /> Order history
            </StyledWrapper>
            <StyledWrapper onClick={() => handleMenuClick('AccountManagement')}>
                <AdminIcon /> Account Management
            </StyledWrapper>
            <StyledLink onClick={logout} to="/account/sign-out">
                <SignOut /> Sign out
            </StyledLink>
        </>
    );

    return (
        <>
            <TopHeader />
            <Header background />
            <Navigation background />
            <BreadCrumb label="Account" />

            {selectedComponent === 'OrderHistory' ? (
                <OrderMain>
                    <OrderLayout>
                        <SidebarSection>
                            <h1>My Account</h1>
                            <FancyContainer variant="account" size="account">
                                <AccountLinksContainer>
                                    <SidebarLinks />
                                </AccountLinksContainer>
                            </FancyContainer>
                        </SidebarSection>
                        <OrderContent>{renderOrderComponent()}</OrderContent>
                    </OrderLayout>
                </OrderMain>
            ) : (
                <StandardMain>
                    <NonOrderLayout>
                        <AccountContainer>
                            <StandardMainWrapper>
                                <h1>My Account</h1>
                                <FancyContainer
                                    variant="account"
                                    size="account"
                                >
                                    <AccountLinksContainer>
                                        <SidebarLinks />
                                    </AccountLinksContainer>
                                </FancyContainer>
                            </StandardMainWrapper>
                            {renderStandardComponent()}
                        </AccountContainer>
                    </NonOrderLayout>
                </StandardMain>
            )}

            <Footer />
        </>
    );
};

const StandardMainWrapper = styled.div`
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

const AccountContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 0.75rem 0rem 0rem 2rem;
    width: 100%;
`;

const StandardMain = styled.main`
    display: flex;
    justify-content: center;
    align-content: center;
    background-color: #130a30;
    padding: 2rem;
    min-height: 800px;
`;

const OrderMain = styled.main`
    background-color: #130a30;
    padding: 2rem;
    min-height: 800px;
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

const OrderLayout = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 2rem;
`;

const SidebarSection = styled.div`
    flex-shrink: 0;
`;

const OrderContent = styled.div`
    flex-grow: 1;
    width: 100%;
`;

const NonOrderLayout = styled.section`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    margin: 0 auto;
`;
