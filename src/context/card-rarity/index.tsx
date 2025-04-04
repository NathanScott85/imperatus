import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useMemo,
} from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import {
    GET_RARITIES,
    CREATE_RARITY,
    UPDATE_RARITY,
} from '../../graphql/rarities';

interface Rarity {
    id: number;
    name: string;
}

interface RaritiesContextProps {
    rarities: Rarity[] | null;
    loading: boolean;
    error: any;
    totalCount: number;
    totalPages: number;
    page: number;
    setPage: (page: number) => void;
    search: string;
    setSearch: (search: string) => void;
    fetchRarities: () => void;
    createRarity: (variables: { name: string }) => Promise<{ success: boolean; message: string; rarity: Rarity | null }>;
    updateRarity: (id: number, name: string) => Promise<{ success: boolean; message: string; rarity: Rarity | null }>;
}

const RaritiesContext = createContext<RaritiesContextProps | undefined>(undefined);

export const RaritiesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [rarities, setRarities] = useState<Rarity[]>([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const queryVariables = useMemo(() => ({ page, limit: 10, search }), [page, search]);

    const [fetchRaritiesQuery, { loading, error }] = useLazyQuery(GET_RARITIES, {
        variables: queryVariables,
        fetchPolicy: 'cache-and-network',
        onCompleted: (data) => {
            setRarities(data.getAllRarity.rarities || []);
            setTotalCount(data.getAllRarity.totalCount);
            setTotalPages(data.getAllRarity.totalPages);
        },
    });

    const [createRarityMutation] = useMutation(CREATE_RARITY);
    const [updateRarityMutation] = useMutation(UPDATE_RARITY);

    const createRarity = async (variables: { name: string }): Promise<{ success: boolean; message: string; rarity: Rarity | null }> => {
        try {
            const { data } = await createRarityMutation({ variables });

            if (data?.createRarity) {
                return {
                    success: true,
                    message: "Rarity created successfully!",
                    rarity: data.createRarity,
                };
            } else {
                throw new Error("Failed to create rarity.");
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            return {
                success: false,
                message: errorMessage,
                rarity: null,
            };
        }
    };

    const updateRarity = async (id: number, name: string): Promise<{ success: boolean; message: string; rarity: Rarity | null }> => {
        try {
            const { data } = await updateRarityMutation({ variables: { id, name } });

            if (data?.updateRarity) {
                return {
                    success: true,
                    message: "Rarity updated successfully!",
                    rarity: data.updateRarity,
                };
            } else {
                throw new Error("Failed to update rarity.");
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            return {
                success: false,
                message: errorMessage,
                rarity: null,
            };
        }
    };

    return (
        <RaritiesContext.Provider
            value={{
                rarities,
                loading,
                error,
                totalCount,
                totalPages,
                page,
                setPage,
                search,
                setSearch,
                fetchRarities: fetchRaritiesQuery,
                createRarity,
                updateRarity,
            }}
        >
            {children}
        </RaritiesContext.Provider>
    );
};

export const useRaritiesContext = () => {
    const context = useContext(RaritiesContext);
    if (!context) {
        throw new Error('useRaritiesContext must be used within a RaritiesProvider');
    }
    return context;
};
