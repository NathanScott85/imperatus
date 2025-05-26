import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Header, TopHeader } from '../../components/header';
import { Navigation } from '../../components/navigation';
import { BreadCrumb } from '../../components/breadcrumbs';
import { Footer } from '../../components/footer';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowDown } from '../../components/svg/arrow';
import { useAppContext } from '../../context';
import { useBasketContext } from '../../context/basket';
import { useCheckoutContext } from '../../context/checkout';
import { LoginSection } from './login-section';
import { Stripe } from '../../components/payments/stripe';
import {
    Elements,
    CardElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Icon as StripeLogo } from '../../components/svg/stripe';
import { usePaymentContext } from '../../context/payments';
import { CheckoutSummary } from './checkout-summary';
import { CheckoutAddressDetails } from './checkout-address-details';
import { FancyContainer } from '../../components/fancy-container';

const stripePromise = loadStripe(
    process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || '',
);

export const Checkout = () => {
    const { user, isAuthenticated } = useAppContext();
    const { basket, clearBasket, discountCode, discountValue } =
        useBasketContext();
    const [showStripeForm, setShowStripeForm] = useState(false);
    const [paymentError, setPaymentError] = useState<string | null>(null);
    const stripeFormRef = useRef<HTMLFormElement>(null);
    const navigate = useNavigate();
    const { createOrder, isFirstOrder, fetchIsFirstOrder } =
        useCheckoutContext();
    const { clientSecret, fetchClientSecret, clearClientSecret } =
        usePaymentContext();

    const StripeInlineForm = () => {
        const stripe = useStripe();
        const elements = useElements();

        const handleSubmit = async (billingDetails: {
            name: string;
            email: string;
            address: string;
            city: string;
            postcode: string;
            phone: string;
        }) => {
            if (!stripe || !elements) {
                setPaymentError('Stripe is not ready');
                return;
            }

            const card = elements.getElement(CardElement);
            if (!card) {
                setPaymentError('Card information is missing');
                return;
            }

            const result = await stripe.confirmCardPayment(clientSecret || '', {
                payment_method: {
                    card,
                    billing_details: {
                        name: billingDetails.name,
                        email: billingDetails.email,
                        address: {
                            line1: billingDetails.address,
                            city: billingDetails.city,
                            postal_code: billingDetails.postcode,
                        },
                        phone: billingDetails.phone,
                    },
                },
            });

            if (result.error) {
                setPaymentError(result.error.message || 'Payment failed');
                return;
            }

            if (result.paymentIntent?.status === 'succeeded') {
                await handleCheckout(billingDetails);
                setShowStripeForm(false);
                clearClientSecret();
            }
        };

        return (
            <Stripe
                ref={stripeFormRef}
                onSubmit={handleSubmit}
                error={paymentError}
                loading={false}
                initialData={{
                    name: user!?.fullname,
                    email: user!?.email,
                    address: user!?.address,
                    city: user!?.city,
                    postcode: user!?.postcode,
                    phone: user!?.phone,
                }}
            />
        );
    };

    const calculateSubtotal = (): string => {
        return basket
            .reduce((acc, item) => acc + item.price * item.quantity, 0)
            .toFixed(2);
    };

    const calculateDiscount = (): number => {
        return isFirstOrder
            ? 0.05 * parseFloat(calculateSubtotal())
            : discountValue;
    };

    const calculatePriceWithoutVAT = (): string => {
        const subtotal = Math.max(
            parseFloat(calculateSubtotal()) - calculateDiscount(),
            0,
        );
        return (subtotal / 1.2).toFixed(2);
    };

    const calculateVAT = (): string => {
        const discounted = Math.max(
            parseFloat(calculateSubtotal()) - calculateDiscount(),
            0,
        );
        return (discounted - discounted / 1.2).toFixed(2);
    };

    const calculateTotal = (): string => {
        const discounted = Math.max(
            parseFloat(calculateSubtotal()) - calculateDiscount(),
            0,
        );
        return discounted.toFixed(2);
    };

    const handleCheckout = async (billingDetails: {
        name: string;
        email: string;
        address: string;
        city: string;
        postcode: string;
        phone: string;
    }) => {
        const response = await createOrder({
            ...billingDetails,
            shippingCost: 0,
            items: basket.map((item) => ({
                productId: Number(item.productId),
                quantity: item.quantity,
                price: item.price,
            })),
            discountCode: isFirstOrder ? undefined : discountCode,
        });

        if (response.success && response.order) {
            clearBasket();
            await fetchIsFirstOrder(billingDetails.email);
            navigate(`/order/confirmation/${response.order.id}`);
        } else {
            setPaymentError('Order creation failed after payment');
        }
    };

    const handleStripeSelect = async () => {
        if (!user) return;

        await fetchClientSecret({
            email: user.email,
            name: user.fullname || '',
            address: user.address || '',
            city: user.city || '',
            postcode: user.postcode || '',
            phone: user.phone || '',
            shippingCost: 0,
            items: basket.map((item) => ({
                productId: Number(item.productId),
                quantity: item.quantity,
                price: item.price,
            })),
            discountCode: isFirstOrder ? undefined : discountCode,
            orderId: 0,
        });

        setShowStripeForm(true);
        setPaymentError(null);
    };

    return (
        <>
            <TopHeader />
            <Header background />
            <Navigation background />
            <BreadCrumb label="Checkout" />

            {isFirstOrder && (
                <Banner>
                    🎉 5% off applied automatically for your first order!
                </Banner>
            )}

            <StyledMainContainer>
                <CenteredContainer>
                    <CheckoutCard>
                        <StyledLink to="/shop/basket">
                            <ArrowDown type="small" fill="#c79d0a" /> Back to
                            Basket
                        </StyledLink>
                        <h1>Checkout</h1>
                        <CheckoutGrid $isEmpty={basket.length === 0}>
                            {basket.length === 0 ? (
                                <EmptyWrapper>
                                    <FancyContainer
                                        size="login"
                                        variant="login"
                                    >
                                        <FancyContainerSubWrapper>
                                            <p>
                                                Your checkout is empty. Please
                                                add some products to your
                                                basket.
                                            </p>
                                        </FancyContainerSubWrapper>
                                    </FancyContainer>
                                </EmptyWrapper>
                            ) : (
                                <>
                                    <LeftSection>
                                        {user ? (
                                            <>
                                                <CheckoutAddressDetails
                                                    email={user.email}
                                                    fullname={user.fullname}
                                                    address={user.address}
                                                    city={user.city}
                                                    postcode={user.postcode}
                                                    phone={user.phone}
                                                />
                                                <Section>
                                                    <SectionTitle>
                                                        Payment options
                                                    </SectionTitle>
                                                    <StaticInfo>
                                                        <p>Payment Method:</p>
                                                        <StripeLogo
                                                            onClick={
                                                                handleStripeSelect
                                                            }
                                                            style={{
                                                                cursor: 'pointer',
                                                            }}
                                                        />
                                                        {showStripeForm &&
                                                            clientSecret && (
                                                                <Elements
                                                                    stripe={
                                                                        stripePromise
                                                                    }
                                                                >
                                                                    <StripeInlineForm />
                                                                </Elements>
                                                            )}
                                                        {paymentError && (
                                                            <ErrorMessage>
                                                                {paymentError}
                                                            </ErrorMessage>
                                                        )}
                                                    </StaticInfo>
                                                </Section>
                                            </>
                                        ) : (
                                            <LoginSection />
                                        )}
                                    </LeftSection>
                                    <RightSection>
                                        <CheckoutSummary
                                            basket={basket}
                                            calculateSubtotal={
                                                calculateSubtotal
                                            }
                                            calculateDiscount={
                                                calculateDiscount
                                            }
                                            calculateVAT={calculateVAT}
                                            calculatePriceWithoutVAT={
                                                calculatePriceWithoutVAT
                                            }
                                            calculateTotal={calculateTotal}
                                            onSubmit={() =>
                                                user &&
                                                stripeFormRef.current?.requestSubmit()
                                            }
                                            isAuthenticated={isAuthenticated}
                                        />
                                    </RightSection>
                                </>
                            )}
                        </CheckoutGrid>
                    </CheckoutCard>
                </CenteredContainer>
            </StyledMainContainer>
            <Footer />
        </>
    );
};

const EmptyWrapper = styled.div`
    grid-column: 1 / -1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const FancyContainerSubWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: white;

    p {
        margin: 0.5rem;
        font-family: 'Cinzel', sans-serif;
        font-size: 16px;
    }

    h1 {
        margin: 1rem;
        font-family: Cinzel;
        font-size: 24px;
    }
    z-index: 50;
`;

const Banner = styled.div`
    background: #4d3c7b;
    color: #c79d0a;
    padding: 1rem;
    font-size: 1.2rem;
    text-align: center;
    font-family: Cinzel, sans-serif;
    font-weight: bold;
`;

const StyledMainContainer = styled.main`
    background-color: #130a30;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CenteredContainer = styled.div`
    width: 100%;
    max-width: 1200px;
    padding: 2rem 1rem;

    h1 {
        font-family: Cinzel;
        font-size: 40px;
        font-weight: 400;
        text-align: center;
        color: #c79d0a;
        margin-bottom: 0.2rem;
    }
`;

const CheckoutCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: #1b133d;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    width: 100%;
    border: 2px solid #4d3c7b;
`;

const StyledLink = styled(Link)`
    display: inline-flex;
    align-items: center;
    margin-bottom: 2rem;
    color: white;
    font-size: 18px;
    font-family: Cinzel;
    letter-spacing: 0.1em;
    text-decoration: none;

    svg {
        margin-right: 8px;
        color: #c79d0a;
        transform: rotate(90deg);
    }

    &:hover {
        color: #c79d0a;
    }
`;

export const CheckoutGrid = styled.div<{ $isEmpty?: boolean }>`
    display: grid;
    grid-template-columns: 2fr 1fr;
    flex-direction: ${({ $isEmpty }) => ($isEmpty ? 'column' : 'row')};
    justify-content: ${({ $isEmpty }) =>
        $isEmpty ? 'center' : 'space-between'};
    align-items: ${({ $isEmpty }) => ($isEmpty ? 'center' : 'flex-start')};
    gap: 40px;
    width: 100%;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const LeftSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const RightSection = styled.div`
    display: flex;
    flex-direction: column;
`;

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

// const SummaryBox = styled.div`
//     background-color: #130a30;
//     padding: 20px;
//     border-radius: 8px;
//     color: white;
//     border: 2px solid #4d3c7b;
// `;

// const SummaryTitle = styled.h2`
//     font-family: Cinzel;
//     font-size: 20px;
//     margin-bottom: 10px;
//     color: #c79d0a;
// `;

// const Divider = styled.div`
//     width: 100%;
//     height: 1px;
//     background-color: #4d3c7b;
//     margin: 1rem 0;
// `;

// const SummaryRow = styled.div`
//     display: flex;
//     justify-content: space-between;
//     margin-bottom: 10px;
//     font-weight: bold;
//     font-size: 5rem;
//     margin-top: 20px;

//     span:first-child {
//         color: #c79d0a;
//         font-size: 1.2rem;
//         font-weight: bold;
//         font-family: Cinzel, sans-serif;
//     }
//     span:last-child {
//         color: #ffffff;
//         font-size: 1.2rem;
//         font-family: Cinzel, sans-serif;
//     }

//     span:last-child {
//         color: #ffffff;
//         font-family: Cinzel, sans-serif;
//     }
//     span:last-child:hover {
//         color: #c79d0a;
//     }
// `;

const SummaryTotal = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    margin-top: 20px;
    span:first-child {
        font-family: Cinzel;
        color: #c79d0a;
        font-size: 1.5rem;
        font-weight: bold;
    }
    span:last-child {
        color: #ffffff;
        font-family: Cinzel;
        font-size: 1.2rem;
    }
`;

// const ButtonWrapper = styled.div`
//     margin-top: 20px;
//     width: 100%;
//     display: flex;
//     justify-content: flex-end;
// `;

// const PromptText = styled.div`
//     color: #c79d0a;
//     font-family: Cinzel, sans-serif;
//     font-size: 14px;
//     font-weight: bold;
//     margin-top: 0.5rem;
// `;

const ErrorMessage = styled.div`
    color: #ff4d4f;
    margin-top: 10px;
    font-weight: bold;
`;
