import { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import { Home } from '../pages/home';
import { Login } from "../pages/login";
import { CreateAccount } from "../pages/create-account";
import { Basket } from "../pages/basket";
import { Categories } from "../pages/catergories";
import {  Category } from "../pages/catergories/category";
import { CardGames } from "../pages/cardgames";
import { Accessories } from "../pages/accessories";
import { ComingSoon } from "../pages/coming-soon";
import { BoardGames } from "../pages/boardgames";
import { Offers } from "../pages/offers";
import { Admin } from "../pages/admin";
import { useLocation } from "react-router-dom";

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
        name: "Cardfight!! Vanguard"
    },
    {
        id: 4,
        name: 'Disney Lorcana'
    }
]
// todo: get users from api
export const usersArray = [
    {
        id: 1,
        username: 'Admin User',
        password: 'admin',
        email: 'admin@imperatus.co.uk',
        role: 'admin'
    },
    {
        id: 2,
        username: 'Normal User',
        password: 'user',
        email: 'user@user.co.uk',
        role: 'user'
    }
]
export const AppRoutes = () => {
    let location = useLocation();
    const [users] = useState(usersArray);
    return (
        <Routes location={location}>
            <Route path="/" element={<Home />} />
            {
                users.map((user: any) => (
                        user.role.includes('admin') && <Route key={user.id} path={`/account/admin`} element={<Admin user={user} />} />
                ))
            }
            <Route path="/account/create-account" element={<CreateAccount />} />
            <Route path="/account/login" element={<Login />} />
            <Route path="/basket" element={<Basket />} />
            <Route  index path="/shop/categories" element={<Categories />} />
            {categories.map((category: any) => (
                <Route key={category.id} path={`/shop/categories/category/${category.id}/${category.name}`} 
                    element={<Category name={category.name} id={category.id} />} 
                />
            ))
            }
            <Route path="/shop/card-games" element={<CardGames />} />
            <Route path="/shop/accessories" element={<Accessories />} />
            <Route path="/shop/coming-soon" element={<ComingSoon />} />
            <Route path="/shop/board-games" element={<BoardGames />} />
            <Route path="/shop/offers" element={<Offers />} />
            <Route path="*" element={<>404 Page Not Found</>} />
        </Routes>
    );
};