import React, { useState } from 'react';
import styled from 'styled-components';
import { Header } from '../../components/header';
import { BreadCrumb } from '../../components/breadcrumbs';
import { Footer } from '../../components/footer';
import { Sidebar } from './sidebar';
import { Overview } from './overview';
import { Analytics } from './analytics';
import { Orders } from './orders';
import { Products } from './products';
import { Shipping } from './shipping';
import { Customers } from './customers';
import { Settings } from './settings';

interface AdminProps {
    user: any;
}

export const Admin = ({ user }: AdminProps) => {
    const { role } = user;
    const [selectedComponent, setSelectedComponent] = useState('Overview');

    const renderComponent = () => {
        switch (selectedComponent) {
            case 'Overview':
                return <Overview />;
            case 'Analytics':
                return <Analytics />;
            case 'Orders':
                return <Orders />;
            case 'Products':
                return <Products />;
            case 'Shipping':
                return <Shipping />;
            case 'Customers':
                return <Customers />;
            case 'Settings':
                return <Settings />;
            default:
                return <Overview />;
        }
    };

    return (
        <>
            <Header background />
            <BreadCrumb label="Admin" />
            <AdminMain>
                <Sidebar setSelectedComponent={setSelectedComponent} />
                <Section>{renderComponent()}</Section>
            </AdminMain>
            <Footer />
        </>
    );
};

const AdminMain = styled.main`
    display: flex;
    flex-direction: row;
    color: white;
    background-color: #130a30;
    padding: 2rem;
`;

const Section = styled.section`
    flex: 1;
    display: flex;
    flex-direction: column;
    color: black;
    font-size: 1.5rem;
    margin-left: 2rem;
    padding: 1rem;
`;
