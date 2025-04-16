import React from 'react';
import styled from 'styled-components';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { BreadCrumb } from '../../components/breadcrumbs';
import { MainContainer } from '../../components/styled';
import { Footer } from '../../components/footer';
import { products as initialProducts } from '../../lib/product-mocks';
import { useState } from 'react';
// import { BasketHeader } from './basket-header';
import { ProductItem } from './product-item';
import { OrderSummary } from './summary';
import { RadioButtonGroup } from './radio-button-group';

export const Basket = () => {
    const [basketProducts, setBasketProducts] = useState(initialProducts);
    // const [wishlistProducts, setWishlistProducts] = useState(initialProducts);
    const [activeTab, setActiveTab] = useState('Delivery');
    const [selectedRadio, setSelectedRadio] = useState<string | null>(null);

    const handleRemoveFromBasket = (id: number) => {
        setBasketProducts(
            basketProducts.filter((product) => product.id !== id),
        );
    };

    // const handleRemoveFromWishlist = (id: number) => {
    //     setWishlistProducts(
    //         wishlistProducts.filter((product) => product.id !== id),
    //     );
    // };

    // const handleMoveToWishlist = (product: any) => {
    //     if (!wishlistProducts.some((p) => p.id === product.id)) {
    //         setWishlistProducts([...wishlistProducts, product]);
    //     }
    //     setBasketProducts(basketProducts.filter((p) => p.id !== product.id));
    // };

    // const handleMoveToBasket = (product: any) => {
    //     if (!basketProducts.some((p) => p.id === product.id)) {
    //         setBasketProducts([...basketProducts, product]);
    //     }
    //     setWishlistProducts(
    //         wishlistProducts.filter((p) => p.id !== product.id),
    //     );
    // };

    // const handleMoveAllToWishlist = () => {
    //     const newWishlistProducts = [...wishlistProducts];
    //     basketProducts.forEach((product) => {
    //         if (!newWishlistProducts.some((p) => p.id === product.id)) {
    //             newWishlistProducts.push(product);
    //         }
    //     });
    //     setWishlistProducts(newWishlistProducts);
    //     setBasketProducts([]);
    // };

    // const handleMoveAllToBasket = () => {
    //     const newBasketProducts = [...basketProducts];
    //     wishlistProducts.forEach((product) => {
    //         if (!newBasketProducts.some((p) => p.id === product.id)) {
    //             newBasketProducts.push(product);
    //         }
    //     });
    //     setBasketProducts(newBasketProducts);
    //     setWishlistProducts([]);
    // };

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedRadio(event.target.value);
    };

    const renderTabContent = () => {
        if (activeTab === 'Delivery') {
            return (
                <RadioButtonGroup
                    selectedRadio={selectedRadio}
                    handleRadioChange={handleRadioChange}
                />
            );
        } else if (activeTab === 'Click & Collect') {
            return <p>Click & Collect content goes here.</p>;
        }
        return null;
    };
    const calculateSubtotal = (): string => {
        const subtotal = basketProducts.reduce(
            (acc, product) => acc + product.price,
            0,
        );

        return subtotal.toFixed(2);
    };

    const calculateTotal = () => {
        const subtotal = parseFloat(calculateSubtotal());
        const delivery = 5.0;
        const vat = (subtotal + delivery) * 0.2;
        return (subtotal + delivery + vat).toFixed(2);
    };

    const calculatePriceWithoutVAT = () => {
        const subtotal = parseFloat(calculateSubtotal());
        const delivery = 5.0;
        return (subtotal + delivery).toFixed(2);
    };

    return (
        <>
            <TopHeader />
            <Header background />
            <Navigation background />
            <BreadCrumb label="Basket" />
            <StyledMainContainer>
                <CenteredContainer>
                    <BasketSection>
                        {/* <BasketHeader
                            title="Basket"
                            hasProducts={basketProducts.length !== 0}
                            onMoveAllClick={handleMoveAllToWishlist}
                            moveAllLabel="Move to Wishlist"
                        /> */}
                        <BasketContent>
                            {basketProducts.length === 0 ? (
                                <EmptyMessage>
                                    Your basket is empty.
                                </EmptyMessage>
                            ) : (
                                <ProductList>
                                    {basketProducts.map((product) => (
                                        <ProductItem
                                            key={product.id}
                                            product={product}
                                            onRemove={handleRemoveFromBasket}
                                            // onMove={() =>
                                            //     handleMoveToWishlist(product)
                                            // }
                                            moveLabel="Move to Wishlist"
                                        />
                                    ))}
                                </ProductList>
                            )}
                            <OrderSummaryContent>
                                <OrderSummary
                                    basketProductsLength={basketProducts.length}
                                    calculateSubtotal={calculateSubtotal}
                                    calculatePriceWithoutVAT={
                                        calculatePriceWithoutVAT
                                    }
                                    calculateTotal={calculateTotal}
                                    renderTabContent={renderTabContent}
                                    activeTab={activeTab}
                                    setActiveTab={setActiveTab}
                                />
                            </OrderSummaryContent>
                        </BasketContent>
                    </BasketSection>
                    <WishlistSection>
                        {/* <BasketHeader
                            title="Wishlist"
                            hasProducts={wishlistProducts.length !== 0}
                            onMoveAllClick={handleMoveAllToBasket}
                            moveAllLabel="Move All to Basket"
                        /> */}
                        {/* {wishlistProducts.length === 0 ? (
                            <EmptyMessage>Your wishlist is empty.</EmptyMessage>
                        ) : (
                            <ProductList>
                                {wishlistProducts.map((product) => (
                                    <ProductItem
                                        key={product.id}
                                        product={product}
                                        onRemove={handleRemoveFromWishlist}
                                        onMove={() =>
                                            handleMoveToBasket(product)
                                        }
                                        moveLabel="Move to Basket"
                                    />
                                ))}
                            </ProductList>
                        )} */}
                    </WishlistSection>
                </CenteredContainer>
            </StyledMainContainer>
            <Footer />
        </>
    );
};

export const StyledMainContainer = styled(MainContainer)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    color: black;
    background-color: #130a30;
`;

export const CenteredContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 1200px;
`;

export const BasketSection = styled.section`
    width: 100%;
    margin: 2rem;
    border-radius: 8px;
`;

const EmptyMessage = styled.p`
    color: white;
    text-align: center;
    font-size: 18px;
`;

export const WishlistSection = styled.section`
    width: 100%;
    margin: 20px 0;
    padding: 10px;
    border-radius: 8px;
`;

export const BasketContent = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    justify-content: space-between;
    align-items: flex-start;
`;

const OrderSummaryContent = styled.div`
    margin-left: 3rem;
`;

export const ProductList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 3;
`;
