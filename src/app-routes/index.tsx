import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Home } from '../pages/home';
import { Login } from '../pages/login';
import { Basket } from '../pages/basket';
import { Categories } from '../pages/catergories';
import { Category } from '../pages/catergories/category';
// import { CardGames } from '../pages/cardgames';
// import { CardGame } from '../pages/cardgames/cardgame';
// import { Accessories } from '../pages/accessories';
// import { Accessory } from '../pages/accessories/accessory';
import { Preorders } from '../pages/pre-orders';
import { BoardGames } from '../pages/boardgames';
import { Offers } from '../pages/offers';
import { Admin } from '../pages/admin';
import { AboutUs } from '../pages/about-us';
import { FrequentlyAskedQuestions } from '../pages/faqs';
import { NewsAndEvents } from '../pages/news-&-events';
import { Register } from '../pages/register';
// import { BoardGame } from '../pages/boardgames/boardgame';
import { Orders } from '../pages/pre-orders/orders';
import { ProductPage } from '../pages/product-page';
import { PrivacyPolicy } from '../pages/privacy-policy';
import { CookiePolicy } from '../pages/cookie-policy';
import { TermsAndConditions } from '../pages/terms-and-conditions';
import { FourOFour } from '../pages/404';
import { PaymentMethods } from '../pages/payment-methods';
import { Delivery } from '../pages/delivery';
import { ReturnsPolicy } from '../pages/returns-policy';
import { DiscountCodes } from '../pages/discount-codes';
import { Account } from '../pages/account';
import { ForgotPassword } from '../pages/forgot-password';
import { SignOut } from '../pages/sign-out';
import { VerifyEmail } from '../pages/verify-email';
import { RegisterProvider } from '../context/register';
import { VerificationProvider } from '../context/verification';
import { useAppContext } from '../context';
import { VerificationStatus } from '../pages/verify-status';
import { ProtectedRoute } from './protected-routes';
import { ResetPassword } from '../pages/reset-password';
import { CategoriesProvider } from '../context/categories';
import { CarouselProvider } from '../context/carousel';
import { ProductsProvider } from '../context/products';
import { SearchResults } from '../pages/search';
import { PreordersProvider } from '../context/pre-order';
import { CheckYourEmail } from '../pages/check-email';
import AdminProviders from '../context/admin/admin-providers';
import { Checkout } from '../pages/checkout';
import { OrdersProvider } from '../context/orders';
import { BasketProvider } from '../context/basket';
import { DiscountCodesProvider } from '../context/discount';
import { CheckoutProvider } from '../context/checkout';
import { OrderConfirmation } from '../pages/order';
import { PaymentProvider } from '../context/payments';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useApplicationSettings } from '../context/settings';
import { ComingSoon } from '../pages/coming-soon';
import Maintenance from '../pages/maintenance';
import { AdminLogin } from '../pages/login/admin-login';
import { NotAuthorized } from '../pages/not-authorized';

const stripePromise = loadStripe(
    process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || '',
);

export const AppRoutes = () => {
    const location = useLocation();
    const { isAuthenticated, isAdminOrOwner } = useAppContext();
    const { pathname } = useLocation();
    const isAdminRoute =
        pathname.startsWith('/account/admin') || pathname === '/admin/login';
    const { settings, loading } = useApplicationSettings();

    if (loading) return null;

    if (!isAdminRoute) {
        if (settings?.maintenance) return <Maintenance />;
        if (settings?.comingSoon) return <ComingSoon />;
    }
    return (
        <DiscountCodesProvider>
            <CheckoutProvider>
                <BasketProvider>
                    {' '}
                    <ProductsProvider>
                        <Routes location={location}>
                            <Route
                                path="/"
                                element={
                                    <CarouselProvider>
                                        <Home />
                                    </CarouselProvider>
                                }
                            />

                            <Route
                                path="/admin/login"
                                element={
                                    <AdminLogin
                                        isAuthenticated={isAuthenticated}
                                    />
                                }
                            />
                            <Route
                                path="/not-authorized"
                                element={<NotAuthorized />}
                            />

                            {/* Admin Route with CarouselProvider nested */}
                            {isAdminOrOwner && (
                                <Route
                                    path={`/account/admin`}
                                    element={
                                        <ProtectedRoute
                                            element={
                                                <AdminProviders>
                                                    <Admin />
                                                </AdminProviders>
                                            }
                                        />
                                    }
                                />
                            )}

                            {/* Search route */}
                            <Route
                                path="/shop/search"
                                element={<SearchResults />}
                            />
                            <Route
                                path="/shop/search/:query"
                                element={<SearchResults />}
                            />
                            <Route
                                path="/shop/search/:query/:id/:productname"
                                element={<ProductPage />}
                            />

                            {/* Categories route */}
                            <Route
                                path="/shop/categories/*"
                                element={
                                    <CategoriesProvider>
                                        <Routes>
                                            <Route
                                                path=""
                                                element={<Categories />}
                                            />
                                            <Route
                                                path="category/:id/:name"
                                                element={<Category />}
                                            />
                                            <Route
                                                path="category/:id/:name/:productid/:productname"
                                                element={<ProductPage />}
                                            />
                                        </Routes>
                                    </CategoriesProvider>
                                }
                            />

                            <Route
                                path="/shop/coming-soon/*"
                                element={
                                    <PreordersProvider>
                                        <Routes>
                                            <Route
                                                path=""
                                                element={<Preorders />}
                                            />
                                            <Route
                                                path="/:id/:name"
                                                element={<Orders />}
                                            />
                                            <Route
                                                path="/:id/:name/:productid/:productname"
                                                element={<ProductPage />}
                                            />
                                        </Routes>
                                    </PreordersProvider>
                                }
                            />

                            {/* Other routes */}
                            {/* <Route path="/shop/card-games" element={<CardGames />} />
                <Route
                    path="/shop/card-games/cardgame/:id/:name"
                    element={<CardGame />}
                />
                <Route
                    path="/shop/card-games/cardgame/:id/:name/:productid/:productname"
                    element={<ProductPage />}
                />
                <Route path="/shop/accessories" element={<Accessories />} />
                <Route
                    path="/shop/accessories/accessory/:id/:name"
                    element={<Accessory />}
                />
                <Route
                    path="/shop/accessories/accessory/:id/:name/:productid/:productname"
                    element={<ProductPage />}
                /> */}
                            <Route
                                path="/shop/coming-soon/new/:id/:name"
                                element={<Orders />}
                            />
                            <Route
                                path="/shop/coming-soon/new/:id/:name/:productid/:productname"
                                element={<ProductPage />}
                            />
                            <Route
                                path="/shop/board-games"
                                element={<BoardGames />}
                            />
                            {/* <Route
                    path="/shop/board-games/boardgame/:id/:name"
                    element={<BoardGame />}
                />
                <Route
                    path="/shop/board-games/boardgame/:id/:name/:productid/:productname"
                    element={<ProductPage />}
                /> */}
                            <Route path="/shop/offers" element={<Offers />} />

                            {/* Informational pages */}
                            <Route path="/about-us" element={<AboutUs />} />
                            <Route
                                path="/faqs"
                                element={<FrequentlyAskedQuestions />}
                            />
                            <Route
                                path="/news-&-events"
                                element={<NewsAndEvents />}
                            />
                            <Route
                                path="/privacy-policy"
                                element={<PrivacyPolicy />}
                            />
                            <Route
                                path="/cookie-policy"
                                element={<CookiePolicy />}
                            />
                            <Route
                                path="/terms-&-conditions"
                                element={<TermsAndConditions />}
                            />
                            <Route
                                path="/payment-methods"
                                element={<PaymentMethods />}
                            />
                            <Route path="/delivery" element={<Delivery />} />
                            <Route
                                path="/returns-policy"
                                element={<ReturnsPolicy />}
                            />
                            <Route
                                path="/discount-codes"
                                element={<DiscountCodes />}
                            />

                            {/* Account and authentication routes */}
                            <Route
                                path="/account/my-account"
                                element={
                                    <ProtectedRoute
                                        redirectPath={
                                            isAuthenticated
                                                ? '/account/my-account'
                                                : '/'
                                        }
                                        element={
                                            <OrdersProvider>
                                                <Account />
                                            </OrdersProvider>
                                        }
                                    />
                                }
                            />
                            <Route
                                path="/account/reset-password"
                                element={<ResetPassword />}
                            />
                            <Route
                                path="/account/login"
                                element={
                                    <Login isAuthenticated={isAuthenticated} />
                                }
                            />
                            <Route
                                path="/account/verification-status"
                                element={
                                    <VerificationProvider>
                                        <VerificationStatus />
                                    </VerificationProvider>
                                }
                            />
                            <Route
                                path="/account/verify-email"
                                element={
                                    <VerificationProvider>
                                        <VerifyEmail />
                                    </VerificationProvider>
                                }
                            />
                            <Route
                                path="/account/check-your-email"
                                element={
                                    <VerificationProvider>
                                        {' '}
                                        <CheckYourEmail />{' '}
                                    </VerificationProvider>
                                }
                            />
                            <Route
                                path="/account/register"
                                element={
                                    <RegisterProvider>
                                        <Register />
                                    </RegisterProvider>
                                }
                            />
                            <Route
                                path="/account/forgot-password"
                                element={<ForgotPassword />}
                            />
                            <Route
                                path="/account/sign-out"
                                element={<SignOut />}
                            />

                            {/* Basket */}
                            <Route path="/shop/basket" element={<Basket />} />
                            <Route
                                path="/shop/checkout"
                                element={
                                    <Elements stripe={stripePromise}>
                                        <PaymentProvider>
                                            <Checkout />
                                        </PaymentProvider>
                                    </Elements>
                                }
                            />
                            <Route
                                path="/order/confirmation/:orderId"
                                element={<OrderConfirmation />}
                            />
                            {/* Fallback route */}
                            <Route path="/404" element={<FourOFour />} />
                            <Route path="*" element={<FourOFour />} />
                        </Routes>
                    </ProductsProvider>
                </BasketProvider>
            </CheckoutProvider>
        </DiscountCodesProvider>
    );
};
