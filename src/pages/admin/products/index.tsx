import React from 'react';
import styled from 'styled-components';
import { Products } from '../../../components/products';
import { products } from '../../../lib/product-mocks';

// todo refactor products so that it has a list option for admin products.
export const AdminProducts = () => (
    <>
        <Products products={products as any}></Products>
    </>
);
