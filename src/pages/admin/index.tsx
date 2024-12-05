import React, { useState } from 'react';
import styled from 'styled-components';
import { Header } from '../../components/header';
import { BreadCrumb } from '../../components/breadcrumbs';
import { Footer } from '../../components/footer';
import { Sidebar } from './sidebar';
import { AddCategory } from './categories/add-category';
import { AddProduct } from './products/add-product';
import { Overview } from './overview';
import { Analytics } from './analytics';
import { Orders } from './orders';
import { AdminProducts } from './products';
import { Shipping } from './shipping';
import { Customers } from './customers';
import { Settings } from './settings';
import { Discount } from './discount';
import { AdminCategories } from './categories';
import { AdminCarousel } from './carousel';
import { AddCarousel } from './carousel/add-carousel';
import { AddBrand } from './products/add-brand';
import { AdminBrands } from './products/brands';
import { AdminProductTypes } from './products/product-type'; // Import your new component
import { AddProductType } from './products/add-type';

export const Admin = () => {
    const [selectedComponent, setSelectedComponent] = useState( 'Overview' );

    const renderComponent = () => {
        switch ( selectedComponent ) {
            case 'Overview':
                return <Overview />;
            case 'Analytics':
                return <Analytics />;
            case 'Orders':
                return <Orders />;
            case 'Discount':
                return <Discount />;
            case 'AddProduct':
                return <AddProduct />;
            case 'AddCategory':
                return <AddCategory />;
            case 'AdminProducts':
                return <AdminProducts />;
            case 'AdminCategories':
                return <AdminCategories />;
            case 'AdminCarousel':
                return <AdminCarousel />;
            case 'AddCarousel':
                return <AddCarousel />;
            case 'Shipping':
                return <Shipping />;
            case 'Customers':
                return <Customers />;
            case 'Settings':
                return <Settings />;
            case 'AddBrand':
                return <AddBrand />;
            case 'AdminBrands':
                return <AdminBrands />;
            case 'AddProductType':
                return <AddProductType />;
            case 'AdminProductTypes':
                return <AdminProductTypes />;
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
