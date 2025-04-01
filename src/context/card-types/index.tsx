import React, {
    createContext,
    useContext,
    useState,
    useMemo,
    ReactNode,
} from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import {
    GET_ALL_CARD_TYPES,
    CREATE_CARD_TYPE,
    UPDATE_CARD_TYPE,
} from '../../graphql/card-type';

interface CardType {
    id: number;
    name: string;
    brand: any;
}

interface CardTypesContextProps {
    cardTypes: CardType[] | null;
    loading: boolean;
    error: any;
    totalCount: number;
    totalPages: number;
    page: number;
    setPage: (page: number) => void;
    search: string;
    setSearch: (search: string) => void;
    fetchCardTypes: () => void;
    createCardType: (variables: { name: string; brandId: number }) => Promise<{ success: boolean; message: string; cardType: CardType | null }>;
    updateCardType: (variables: { id: number; name: string; brandId: number }) => Promise<{ success: boolean; message: string; cardType: CardType | null }>;
}

const CardTypesContext = createContext<CardTypesContextProps | undefined>(undefined);

export const CardTypesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cardTypes, setCardTypes] = useState<CardType[]>([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const queryVariables = useMemo(() => ({ page, limit: 10, search }), [page, search]);

    const [fetchCardTypesQuery, { loading, error }] = useLazyQuery(GET_ALL_CARD_TYPES, {
        variables: queryVariables,
        fetchPolicy: 'cache-and-network',
        onCompleted: (data) => {
            setCardTypes(data.getAllCardTypes.cardTypes || []);
            setTotalCount(data.getAllCardTypes.totalCount);
            setTotalPages(data.getAllCardTypes.totalPages);
        },
    });

    const [createCardTypeMutation] = useMutation(CREATE_CARD_TYPE);
    const [updateCardTypeMutation] = useMutation(UPDATE_CARD_TYPE);

    const createCardType = async (variables: { name: string; brandId: number }): Promise<{
        success: boolean;
        message: string;
        cardType: CardType | null;
    }> => {
        try {
            const { data } = await createCardTypeMutation({ variables });

            if (data?.createCardType) {
                return {
                    success: true,
                    message: "Card type created successfully!",
                    cardType: data.createCardType,
                };
            } else {
                throw new Error("Failed to create card type.");
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            return {
                success: false,
                message: errorMessage,
                cardType: null,
            };
        }
    };

    const updateCardType = async (variables: { id: number; name: string; brandId: number }): Promise<{
        success: boolean;
        message: string;
        cardType: CardType | null;
    }> => {
        try {
            const { data } = await updateCardTypeMutation({ variables });

            if (data?.updateCardType) {
                return {
                    success: true,
                    message: "Card Type updated successfully!",
                    cardType: data.updateCardType,
                };
            } else {
                throw new Error("Failed to update card type.");
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            return {
                success: false,
                message: errorMessage,
                cardType: null,
            };
        }
    };

    return (
        <CardTypesContext.Provider
            value={{
                cardTypes,
                loading,
                error,
                totalCount,
                totalPages,
                page,
                setPage,
                search,
                setSearch,
                fetchCardTypes: fetchCardTypesQuery,
                createCardType,
                updateCardType,
            }}
        >
            {children}
        </CardTypesContext.Provider>
    );
};

export const useCardTypesContext = () => {
    const context = useContext(CardTypesContext);
    if (!context) {
        throw new Error('useCardTypesContext must be used within a CardTypesProvider');
    }
    return context;
};
