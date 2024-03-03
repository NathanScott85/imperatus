import React from 'react';
import { styled } from '@mui/material';
import { Search } from '../search';
import { Login } from '../login';
import { ImperatusLink } from '../imperatus-link';
import { Basket } from '../basket';
import { AdminIcon } from '../svg';
import { Link } from 'react-router-dom';

// const usersArray = [
//     {
//         id: 1,
//         username: 'Admin User',
//         password: 'admin',
//         email: 'admin@imperatus.co.uk',
//         role: 'admin'
//     },
//     {
//         id: 2,
//         username: 'Normal User',
//         password: 'user',
//         email: 'user@user.co.uk',
//         role: 'user'
//     }
// ]
export const Header = () => (
    <HeaderContainer>
      <ImperatusLink />
      <Search />
        <HeaderWrapper>  
        <Login />
        <Basket />
        </HeaderWrapper>
        {
            // usersArray.map((user: any) => (
            //     user.role.includes('admin') && <Link key={user.id} to={`/account/admin`}>
            //         <AdminIcon /> 
            //     </Link>
            // ))
            
                <Link  to={`/account/admin`}>
                    <AdminIcon /> 
                </Link>

        }
    </HeaderContainer>
);

export const TopHeader = () => (
    <ContactHeader>
        01234 567 890   Mon - Fri 9:00am - 5:00pm 
    </ContactHeader>
);

const HeaderContainer = styled('header')`
    background-color: transparent;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: #D4B05F;
    height: 62px;
    width: 100%;
    padding: 0 1.75rem;
    border-bottom: 1px solid #4D3C7B;
`;

const HeaderWrapper = styled('span')`
    display: flex;
`;

const ContactHeader = styled('header')`
    background-color: #05030F;    
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #D4B05F;
    height: 38px;
    width: 100%;
    padding: 0 1.75rem;
`;

