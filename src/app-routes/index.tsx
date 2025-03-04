import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Home } from '../pages/home';
import { Login } from '../pages/login';
import { Basket } from '../pages/basket';
import { Categories } from '../pages/catergories';
import { Category } from '../pages/catergories/category';
import { CardGames } from '../pages/cardgames';
import { CardGame } from '../pages/cardgames/cardgame';
import { Accessories } from '../pages/accessories';
import { Accessory } from '../pages/accessories/accessory';
import { Preorders } from '../pages/pre-orders';
import { BoardGames } from '../pages/boardgames';
import { Offers } from '../pages/offers';
import { Admin } from '../pages/admin';
import { AboutUs } from '../pages/about-us';
import { FrequentlyAskedQuestions } from '../pages/faqs';
import { NewsAndEvents } from '../pages/news-&-events';
import { Register } from '../pages/register';
import { BoardGame } from '../pages/boardgames/boardgame';
import { Orders } from '../pages/pre-orders/orders';
import { ProductPage } from '../pages/product-page';
import { Careers } from '../pages/careers';
import { FeaturedBrands } from '../pages/shop-by-brand';
import { PrivacyPolicy } from '../pages/privacy-policy';
import { CookiePolicy } from '../pages/cookie-policy';
import { TermsAndConditions } from '../pages/terms-and-conditions';
import { SiteMap } from '../pages/site-map';
import { FourOFour } from '../pages/404';
import { InternationalDelivery } from '../pages/international-delivery';
import { PaymentMethods } from '../pages/payment-methods';
import { Delivery } from '../pages/delivery';
import { ReturnsPolicy } from '../pages/returns-policy';
import { DiscountCodes } from '../pages/discount-codes';
import { Account } from '../pages/account';
import { ForgotPassword } from '../pages/forgot-password';
import { SignOut } from '../pages/sign-out';
import { VerifyEmail } from '../pages/verify-email';
import { VerificationSuccess } from '../pages/verify-success';
import { RegisterProvider } from '../context/register';
import { VerificationProvider } from '../context/verification';
import { useAppContext } from '../context';
import { VerificationStatus } from '../pages/verify-status';
import { ProtectedRoute } from './protected-routes';
import { ResetPassword } from '../pages/reset-password';
import { AdminProvider } from '../context/admin';
import { CategoriesProvider } from '../context/categories';
import { BrandsProvider } from '../context/brands';
import { SetsProvider } from '../context/sets';
import { CarouselProvider } from '../context/carousel';
import { PromotionsProvider } from '../context/promotions';
import { ProductsProvider } from '../context/products';
import { SearchResults } from '../pages/search';

export const AppRoutes = () => {
    const location = useLocation();
    const { isAuthenticated, isAdminOrOwner } = useAppContext();

    return (
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

                {/* Admin Route with CarouselProvider nested */}
                {isAdminOrOwner && (
                    <Route
                        path={`/account/admin`}
                        element={
                            <ProtectedRoute
                                element={
                                    <AdminProvider>
                                        <CategoriesProvider>
                                            <BrandsProvider>
                                                <SetsProvider>
                                                    <CarouselProvider>
                                                        <PromotionsProvider>
                                                            <Admin />
                                                        </PromotionsProvider>
                                                    </CarouselProvider>
                                                </SetsProvider>
                                            </BrandsProvider>
                                        </CategoriesProvider>
                                    </AdminProvider>
                                }
                            />
                        }
                    />
                )}

                {/* Search route */}
                <Route path="/shop/search" element={<SearchResults />} />
                <Route path="/shop/search/:query" element={<SearchResults />} />
                <Route path="/shop/search/:query/:id/:productname" element={<ProductPage />} />

                {/* Categories route */}
                <Route
                    path="/shop/categories/*"
                    element={
                        <CategoriesProvider>
                            <Routes>
                                <Route path="" element={<Categories />} />
                                <Route path="category/:id/:name" element={<Category />} />
                                <Route path="category/:id/:name/:productid/:productname" element={<ProductPage />} />
                            </Routes>
                        </CategoriesProvider>
                    }
                />

                {/* Other routes */}
                <Route path="/shop/card-games" element={<CardGames />} />
                <Route path="/shop/card-games/cardgame/:id/:name" element={<CardGame />} />
                <Route path="/shop/card-games/cardgame/:id/:name/:productid/:productname" element={<ProductPage />} />
                <Route path="/shop/accessories" element={<Accessories />} />
                <Route path="/shop/accessories/accessory/:id/:name" element={<Accessory />} />
                <Route path="/shop/accessories/accessory/:id/:name/:productid/:productname" element={<ProductPage />} />
                <Route path="/shop/coming-soon" element={<Preorders />} />
                <Route path="/shop/coming-soon/new/:id/:name" element={<Orders />} />
                <Route path="/shop/coming-soon/new/:id/:name/:productid/:productname" element={<ProductPage />} />
                <Route path="/shop/board-games" element={<BoardGames />} />
                <Route path="/shop/board-games/boardgame/:id/:name" element={<BoardGame />} />
                <Route path="/shop/board-games/boardgame/:id/:name/:productid/:productname" element={<ProductPage />} />
                <Route path="/shop/offers" element={<Offers />} />

                {/* Informational pages */}
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/faqs" element={<FrequentlyAskedQuestions />} />
                <Route path="/news-&-events" element={<NewsAndEvents />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/featured-brands" element={<FeaturedBrands />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/cookie-policy" element={<CookiePolicy />} />
                <Route path="/site-map" element={<SiteMap />} />
                <Route path="/terms-&-conditions" element={<TermsAndConditions />} />
                <Route path="/payment-methods" element={<PaymentMethods />} />
                <Route path="/delivery" element={<Delivery />} />
                <Route path="/international-delivery" element={<InternationalDelivery />} />
                <Route path="/returns-policy" element={<ReturnsPolicy />} />
                <Route path="/discount-codes" element={<DiscountCodes />} />

                {/* Account and authentication routes */}
                <Route path="/account/my-account" element={<ProtectedRoute redirectPath={isAuthenticated ? '/account/my-account' : '/'} element={<Account />} />} />
                <Route path="/account/reset-password" element={<ResetPassword />} />
                <Route path="/account/login" element={<Login isAuthenticated={isAuthenticated} />} />
                <Route path="/account/verification-success" element={<VerificationSuccess />} />
                <Route path="/account/verification-status" element={<VerificationStatus />} />
                <Route path="/account/verify-email" element={<VerificationProvider><VerifyEmail /></VerificationProvider>} />
                <Route path="/account/register" element={<RegisterProvider><Register /></RegisterProvider>} />
                <Route path="/account/forgot-password" element={<ForgotPassword />} />
                <Route path="/account/sign-out" element={<SignOut />} />

                {/* Basket */}
                <Route path="/shop/basket" element={<Basket />} />

                {/* Fallback route */}
                <Route path="/404" element={<FourOFour />} />
                <Route path="*" element={<FourOFour />} />
            </Routes>
        </ProductsProvider>
    );
};
