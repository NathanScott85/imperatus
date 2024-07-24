import { useState } from 'react';
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
import { usersArray } from '../lib/users-mocks';
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

export const AppRoutes = () => {
    const location = useLocation();
    const [users] = useState(usersArray);
    return (
        <Routes location={location}>
            <Route path="/" element={<Home />} />
            {users.map((user) =>
                user.role.includes('admin') ? (
                    <Route
                        key={user.id}
                        path={`/account/admin`}
                        element={<Admin user={user} />}
                    />
                ) : null,
            )}

            <Route path="/account/user-account" element={<Account />} />
            <Route path="/account/login" element={<Login />} />
            <Route path="/account/register" element={<Register />} />
            <Route
                path="/account/forgot-password"
                element={<ForgotPassword />}
            />
            <Route path="/account/sign-out" element={<SignOut />} />
            <Route path="/basket" element={<Basket />} />
            <Route path="/shop/categories" element={<Categories />} />
            <Route
                path="/shop/categories/category/:id/:name"
                element={<Category />}
            />
            <Route
                path="/shop/categories/category/:id/:name/:productid/:productname"
                element={<ProductPage />}
            />
            <Route path="/shop/card-games" element={<CardGames />} />
            <Route
                path="/shop/card-games/cardgame/:id/:name"
                element={<CardGame />}
            />
            <Route path="/shop/accessories" element={<Accessories />} />
            <Route
                path="/shop/accessories/accessory/:id/:name"
                element={<Accessory />}
            />
            <Route path="/shop/coming-soon" element={<Preorders />} />
            <Route
                path="/shop/coming-soon/new/:id/:name"
                element={<Orders />}
            />
            <Route path="/shop/board-games" element={<BoardGames />} />
            <Route
                path="/shop/board-games/boardgame/:id/:name"
                element={<BoardGame />}
            />
            <Route path="/shop/offers" element={<Offers />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/faqs" element={<FrequentlyAskedQuestions />} />
            <Route path="/news-&-events" element={<NewsAndEvents />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/featured-brands" element={<FeaturedBrands />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/site-map" element={<SiteMap />} />
            <Route
                path="/terms-&-conditions"
                element={<TermsAndConditions />}
            />
            <Route path="/payment-methods" element={<PaymentMethods />} />
            <Route path="/delivery" element={<Delivery />} />
            <Route
                path="/international-delivery"
                element={<InternationalDelivery />}
            />
            <Route path="/returns-policy" element={<ReturnsPolicy />} />
            <Route path="/discount-codes" element={<DiscountCodes />} />
            <Route path="*" element={<FourOFour />} />
        </Routes>
    );
};
