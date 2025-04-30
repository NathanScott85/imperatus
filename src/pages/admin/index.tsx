import React, { useState } from 'react';
import styled from 'styled-components';
import { Header, TopHeader } from '../../components/header';
import { BreadCrumb } from '../../components/breadcrumbs';
import { Footer } from '../../components/footer';
import { Sidebar } from './sidebar';
import { AddCategory } from './categories/add-category';
import { AddProduct } from './products/add-product';
import { Overview } from './overview';
import { Analytics } from './analytics';
import { Orders } from './orders';
import { AdminProducts } from './products';
// import { Shipping } from './shipping';
import { Customers } from './customers';
import { Settings } from './settings';
import { Discount } from './discounts';
import { AdminCategories } from './categories';
import { AdminCarousel } from './carousel';
import { AddCarousel } from './carousel/add-carousel';
import { ManageCarousel } from './carousel/manage-carousel';
import { AddBrand } from './products/add-brand';
import { AdminBrands } from './products/brands';
import { AdminProductTypes } from './products/product-type';
import { AddProductType } from './products/add-type';
import { AdminSets } from './products/sets';
import { AddSet } from './products/add-set';
import { AdminPromotions } from './promotions';
import { AddPromotion } from './promotions/add-promotion';
import { AdminRarities } from './products/rarities';
import { AdminVariants } from './products/variants';
import { AddRarity } from './products/add-rarity';
import { AddVariant } from './products/add-variant';
import { AdminCardTypes } from './products/card-types';
import { AddCardType } from './products/add-cardtype';
import { AddDiscountCode } from './discounts/add-discount-code';
import { OrderStatus } from './orders/order-status';
import { AddOrderStatus } from './orders/add-status';
import { AddOrder } from './orders/add-order';
import { AdminVAT } from './vat';

export const Admin = () => {
    const [selectedComponent, setSelectedComponent] = useState('Overview');

    const renderComponent = () => {
        switch (selectedComponent) {
            case 'Overview':
                return <Overview />;
            case 'Analytics':
                return <Analytics />;
            case 'Orders':
                return <Orders />;
            case 'CreateOrder':
                return <AddOrder />;
            case 'OrderStatus':
                return <OrderStatus />;
            case 'AddOrderStatus':
                return <AddOrderStatus />;
            case 'AdminDiscount':
                return <Discount />;
            case 'AddDiscount':
                return <AddDiscountCode />;
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
            case 'ManageCarousel':
                return <ManageCarousel />;
            // case 'Shipping':
            //     return <Shipping />;
            case 'Customers':
                return <Customers />;
            case 'Settings':
                return <Settings />;
            case 'AddBrand':
                return <AddBrand />;
            case 'AdminBrands':
                return <AdminBrands />;
            case 'AddSet':
                return <AddSet />;
            case 'AdminSet':
                return <AdminSets />;
            case 'AddProductType':
                return <AddProductType />;
            case 'AdminProductTypes':
                return <AdminProductTypes />;
            case 'AddPromotion':
                return <AddPromotion />;
            case 'AdminPromotions':
                return <AdminPromotions />;
            case 'AddRarity':
                return <AddRarity />;
            case 'AdminRarity':
                return <AdminRarities />;
            case 'AddVariant':
                return <AddVariant />;
            case 'AdminVariant':
                return <AdminVariants />;
            case 'AddCardType':
                return <AddCardType />;
            case 'AdminCardTypes':
                return <AdminCardTypes />;
            case 'AdminVAT':
                return <AdminVAT />;
            default:
                return <Overview />;
        }
    };

    return (
        <>
            <TopHeader />

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
