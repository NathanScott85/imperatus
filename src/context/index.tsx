import React, { createContext, useState, useContext } from 'react';
import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';
import { client } from '../apollo-client';

const AppContext = createContext(client);

export const AppProvider = ({ children }: any) => {
    const [categories, setCategories] = useState([]);
    const [cardGames, setCardGames] = useState([]);
    const [brands, setBrands] = useState([]);
    const [accessories, setAccessories] = useState([]);

    const fetchCategories = async () => {
        const { data } = await client.query({
            query: gql`
                query GetCategories {
                    categories {
                        id
                        name
                    }
                }
            `,
        });
        setCategories(data.categories);
    };

    const fetchCardGames = async () => {
        const { data } = await client.query({
            query: gql`
                query GetCardGames {
                    cardGames {
                        id
                        name
                    }
                }
            `,
        });
        setCardGames(data.cardGames);
    };

    const fetchBrands = async () => {
        const { data } = await client.query({
            query: gql`
                query GetBrands {
                    brands {
                        id
                        name
                    }
                }
            `,
        });
        setBrands(data.brands);
    };

    const fetchAccessories = async () => {
        const { data } = await client.query({
            query: gql`
                query GetAccessories {
                    accessories {
                        id
                        name
                    }
                }
            `,
        });
        setAccessories(data.accessories);
    };

    return (
        <div />
        // <AppContext.Provider
        //     // value={{
        //     //     categories,
        //     //     cardGames,
        //     //     brands,
        //     //     accessories,
        //     //     fetchCategories,
        //     //     fetchCardGames,
        //     //     fetchBrands,
        //     //     fetchAccessories,
        //     // }}
        // >
        //     {children}
        // </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
