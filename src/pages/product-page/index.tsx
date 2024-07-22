import React, { useEffect, useState } from 'react';
import { Header, TopHeader } from '../../components/header';
import { Loading } from '../../pages/loading'
import { Navigation } from '../../components/navigation';
import { useLocation, useParams } from 'react-router-dom';

export const ProductPage = () => {
    const { productid, productname } = useParams();
    const location = useLocation();
    const [product, setProduct] = useState(location.state?.product || null);
    useEffect(() => {
        if (!product) {
            setProduct(null);
        }
    }, [productid, product]);

    if (!product) {
        return <Loading />;
    }

    return (
        <>
         <TopHeader />
            <Header background />
            <Navigation background />
            <h1>Here</h1>
            <div>
            <h1>{product.name}</h1>
            <img src={product.img} alt={product.name} />
            <p>Price: £{product.price}</p>
            <p>RRP: {product.rrp}</p>
            <p>Category: {product.category}</p>
            <p>Card Game: {product.cardgame}</p>
        </div>
        </>
    );
}