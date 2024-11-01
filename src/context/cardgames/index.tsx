import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import {
    GET_CARDGAMES, // Renamed to better reflect usage
    GET_CARDGAME_BY_ID,
    CREATE_CARDGAME,
    UPDATE_CARDGAME,
    DELETE_CARDGAME,
} from '../../graphql/cardgames';

interface CardGame {
    id: string;
    name: string;
    description: string;
    categoryId: number;
    img: File | null;
}

interface CardGamesContextType {
    cardGames: CardGame[];
    currentCardGame: CardGame | null;
    loading: boolean;
    error: any;
    createCardGame: ( input: CardGameInput ) => Promise<void>;
    updateCardGame: ( input: CardGameInput ) => Promise<void>;
    deleteCardGame: ( id: string ) => Promise<void>;
    fetchCardGames: () => void;
    fetchCardGameById: ( id: string ) => void;
    cardGameLoading: boolean;
    cardGameError: any;
    updating: boolean;
    updateError: any;
    deleting: boolean;
    deleteError: any;
    currentPage: number;
    totalPages: number;
    setPage: ( page: number ) => void;
}

interface CardGameInput {
    id?: string;
    name: string;
    description: string;
    img: File | null;
    categoryId: number;
}

const CardGamesContext = createContext<CardGamesContextType | null>( null );

export const CardGamesProvider = ( { children }: { children: ReactNode } ) => {
    const [cardGames, setCardGames] = useState<CardGame[]>( [] );
    const [currentCardGame, setCurrentCardGame] = useState<CardGame | null>( null );
    const [currentPage, setCurrentPage] = useState( 1 );
    const [totalPages, setTotalPages] = useState( 1 );

    const [fetchCardGames, { loading, error }] = useLazyQuery( GET_CARDGAMES, {
        variables: { page: currentPage },
        fetchPolicy: 'cache-and-network',
        onCompleted: ( data ) => {
            setCardGames( data.getAllCardGames );
            setTotalPages( data.totalPages || 1 ); // Assuming your backend provides totalPages
        },
    } );

    const [fetchCardGameByIdLazyQuery, { loading: cardGameLoading, error: cardGameError }] = useLazyQuery( GET_CARDGAME_BY_ID, {
        onCompleted: ( data ) => setCurrentCardGame( data.getCardGameById ),
        fetchPolicy: 'cache-and-network',
    } );

    const [createCardGameMutation, { loading: creating, error: createError }] = useMutation( CREATE_CARDGAME );
    const [updateCardGameMutation, { loading: updating, error: updateError }] = useMutation( UPDATE_CARDGAME );
    const [deleteCardGameMutation, { loading: deleting, error: deleteError }] = useMutation( DELETE_CARDGAME );

    useEffect( () => {
        fetchCardGames();
    }, [fetchCardGames, currentPage] );

    const createCardGame = async ( input: CardGameInput ) => {
        try {
            const { data } = await createCardGameMutation( {
                variables: { ...input },
            } );

            if ( data && data.createCardGame ) {
                setCardGames( ( prev ) => [...prev, data.createCardGame] );
            }
        } catch ( error ) {
            console.error( 'Error creating card game:', error );
        }
    };

    const updateCardGame = async ( input: CardGameInput ) => {
        try {
            const { data } = await updateCardGameMutation( {
                variables: { ...input },
            } );

            if ( data && data.updateCardGame ) {
                setCardGames( ( prev ) =>
                    prev.map( ( game ) => ( game.id === input.id ? data.updateCardGame : game ) ),
                );
            }
        } catch ( error ) {
            console.error( 'Error updating card game:', error );
        }
    };

    const deleteCardGame = async ( id: string ) => {
        try {
            const { data } = await deleteCardGameMutation( {
                variables: { id },
            } );

            if ( data && data.deleteCardGame ) {
                setCardGames( ( prev ) => prev.filter( ( game ) => game.id !== id ) );
            }
        } catch ( error ) {
            console.error( 'Error deleting card game:', error );
        }
    };

    // Wrapping fetchCardGameByIdLazyQuery to accept just the id and pass it into variables
    const fetchCardGameById = ( id: string ) => {
        fetchCardGameByIdLazyQuery( {
            variables: { id },
        } );
    };

    const setPage = ( page: number ) => {
        setCurrentPage( page );
    };

    return (
        <CardGamesContext.Provider
            value={{
                cardGames,
                currentCardGame,
                loading,
                error,
                createCardGame,
                updateCardGame,
                deleteCardGame,
                fetchCardGames,
                fetchCardGameById,
                cardGameLoading,
                cardGameError,
                updating,
                updateError,
                deleting,
                deleteError,
                currentPage,
                totalPages,
                setPage,
            }}
        >
            {children}
        </CardGamesContext.Provider>
    );
};

export const useCardGamesContext = () => {
    const context = useContext( CardGamesContext );
    if ( !context ) {
        throw new Error( "useCardGamesContext must be used within a CardGamesProvider" );
    }
    return context;
};
