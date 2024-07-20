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
import { ComingSoon } from '../pages/coming-soon';
import { BoardGames } from '../pages/boardgames';
import { Offers } from '../pages/offers';
import { Admin } from '../pages/admin';
import { AboutUs } from '../pages/about-us';
import { FrequentlyAskedQuestions } from '../pages/faqs';
import { NewsAndEvents } from '../pages/news-&-events';
import { Register } from '../pages/register';
import { usersArray } from '../lib/users-mocks';

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
            <Route path="/account/login" element={<Login />} />
            <Route path="/account/register" element={<Register />} />
            <Route
                path="/account/forgot-password"
                element={<div>Forgot Password</div>}
            />
            <Route path="/basket" element={<Basket />} />
            <Route path="/shop/categories" element={<Categories />} />
            <Route
                path="/shop/categories/category/:id/:name"
                element={<Category />}
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
            <Route path="/shop/coming-soon" element={<ComingSoon />} />
            <Route path="/shop/coming-soon/new/:id/:name" element={<>Soon</>} />
            <Route path="/shop/board-games" element={<BoardGames />} />
            <Route path="/shop/offers" element={<Offers />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/faqs" element={<FrequentlyAskedQuestions />} />
            <Route path="/news-&-events" element={<NewsAndEvents />} />
            <Route path="/careers" element={<div>careers</div>} />
            <Route path="/shop-by-brand" element={<div>shop-by-brand</div>} />
            <Route path="/privacy-policy" element={<div>privacy-policy</div>} />
            <Route path="/cookie-policy" element={<div>cookie-policy</div>} />
            <Route path="/site-map" element={<div>site-map</div>} />
            <Route
                path="/terms-&-conditions"
                element={<div>terms-&-conditions</div>}
            />
            <Route
                path="/payment-methods"
                element={<div>payment-methods</div>}
            />
            <Route
                path="/international-delivery"
                element={<div>international-delivery</div>}
            />
            <Route path="/returns-policy" element={<div>returns-policy</div>} />
            <Route path="/discount-codes" element={<div>discount-codes</div>} />
            <Route path="*" element={<div>404 Page Not Found</div>} />
        </Routes>
    );
};
