import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from '../pages/home';
import { Login } from '../pages/login';
import { Basket } from '../pages/basket';
import { Categories } from '../pages/catergories';
import { Category } from '../pages/catergories/category';
import { CardGames } from '../pages/cardgames';
import { Accessories } from '../pages/accessories';
import { ComingSoon } from '../pages/coming-soon';
import { BoardGames } from '../pages/boardgames';
import { Offers } from '../pages/offers';
import { Admin } from '../pages/admin';
import { AboutUs } from '../pages/about-us';
import { FrequentlyAskedQuestions } from '../pages/faqs';
import { NewsAndEvents } from '../pages/news-&-events';
import { Register } from '../pages/register';
import { useLocation } from 'react-router-dom';

const categories = [
    {
        id: 1,
        name: 'Pokemon',
    },
    {
        id: 2,
        name: 'Yu-Gi-Oh',
    },
    {
        id: 3,
        name: 'Cardfight!! Vanguard',
    },
    {
        id: 4,
        name: 'Disney Lorcana',
    },
];
// todo: get users from api
export const usersArray = [
    {
        id: 1,
        username: 'Admin User',
        password: 'admin',
        email: 'admin@imperatus.co.uk',
        role: 'admin',
    },
    {
        id: 2,
        username: 'Normal User',
        password: 'user',
        email: 'user@user.co.uk',
        role: 'user',
    },
];
export const AppRoutes = () => {
    const location = useLocation();
    const [users] = useState(usersArray);
    return (
        <Routes location={location}>
            <Route path="/" element={<Home />} />
            {users.map(
                (user: any) =>
                    user.role.includes('admin') && (
                        <Route
                            key={user.id}
                            path={`/account/admin`}
                            element={<Admin user={user} />}
                        />
                    ),
            )}
            <Route path="/account/login" element={<Login />} />
            <Route path="/account/register" element={<Register />} />
            <Route path="/account/forgot-password" element={<div>Forgot Password</div>} />
            <Route path="/basket" element={<Basket />} />
            <Route index path="/shop/categories" element={<Categories />} />
            {categories.map((category: any) => (
                <Route
                    key={category.id}
                    path={`/shop/categories/category/${category.id}/${category.name}`}
                    element={<Category name={category.name} id={category.id} />}
                />
            ))}
            <Route path="/shop/card-games" element={<CardGames />} />
            <Route path="/shop/accessories" element={<Accessories />} />
            <Route path="/shop/coming-soon" element={<ComingSoon />} />
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
            <Route path="/terms-&-conditions" element={<div>terms-&-conditions</div>} />
            <Route path="/payment-methods" element={<div>payment-methods</div>} />
            <Route path="/international-delivery" element={<div>international-delivery</div>} />
            <Route path="/returns-policy" element={<div>returns-policy</div>} />
            <Route path="/discount-codes" element={<div>discount-codes</div>} />
            <Route path="*" element={<>404 Page Not Found</>} />
        </Routes>
    );
};
