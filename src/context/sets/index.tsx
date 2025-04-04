import React, {
    createContext,
    ReactNode,
    useContext,
    useMemo,
    useState,
} from 'react';
import {
    CREATE_SET,
    DELETE_SET,
    GET_SETS,
    UPDATE_SET,
} from '../../graphql/sets';
import { useLazyQuery, useMutation } from '@apollo/client';

interface Sets {
    id: any;
    setName: string;
    setCode: string;
    description: string;
    brandId: number;
    brand?: {
        id: number;
        name: string;
    };
}

interface SetsContext {
    fetchSets: () => void;
    sets: Sets[];
    loading: boolean;
    error: any;
    page: number;
    setPage: (page: number) => void;
    search: string;
    setSearch: (search: string) => void;
    limit: number;
    setLimit: (limit: number) => void;
    totalCount: number;
    totalPages: number;
    currentPage: number;
    setTotalPages: (totalPages: number) => void;
    setTotalCount: (totalCount: number) => void;
    setCurrentPage: (currentPage: number) => void;
    createSet: (
        setName: string,
        setCode: string,
        description: string,
        brandId: number,
    ) => Promise<{ success: boolean; message: string; set: Sets | null }>;
    updateSet: (set: Sets) => Promise<void>;
    deleteSet: (id: string) => Promise<void>;
}

const SetsContext = createContext<SetsContext | null>(null);

export const SetsProvider = ({ children }: { children: ReactNode }) => {
    const [sets, setSets] = useState<Sets[]>([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState('');
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const queryVariables = useMemo(
        () => ({ page: currentPage, limit: 10, search }),
        [currentPage, search],
    );

    const resetPagination = () => {
        setCurrentPage(1);
    };

    const [fetchSets, { loading, error }] = useLazyQuery(GET_SETS, {
        fetchPolicy: 'cache-and-network',
        variables: queryVariables,
        onCompleted: (data) => {
            if (data?.getAllSets) {
                setSets(data.getAllSets.sets || []);
                setTotalPages(data.getAllSets.totalPages || 1);
                setTotalCount(data.getAllSets.totalCount || 0);
                setCurrentPage(data.getAllSets.currentPage || 1);
            }
        },
    });

    const [createSetMutation] = useMutation(CREATE_SET);

    const createSet = async (
        setName: string,
        setCode: string,
        description: string,
        brandId: number,
    ) => {
        try {
            const { data } = await createSetMutation({
                variables: { setName, setCode, description, brandId },
            });

            if (data?.createProductSet) {
                return {
                    success: true,
                    message: 'Set created successfully!',
                    set: data.createProductSet,
                };
            } else {
                throw new Error('Failed to create set.');
            }
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : 'Unknown error occurred.';
            return {
                success: false,
                message: errorMessage,
                set: null,
            };
        }
    };

    const [updateSetMutation] = useMutation(UPDATE_SET);

    const updateSet = async ({
        id,
        setName,
        setCode,
        description,
        brandId,
    }: Sets) => {
        try {
            const { data } = await updateSetMutation({
                variables: {
                    id,
                    setName,
                    setCode,
                    description,
                    brandId,
                },
            });

            if (data && data.updateProductSet) {
                setSets((prevSets) =>
                    prevSets.map((set) =>
                        set.id === id ? data.updateProductSet : set,
                    ),
                );
            }
        } catch (error) {
            console.error('Error updating product set:', error);
        }
    };

    const [deleteSetMutation] = useMutation(DELETE_SET);

    const deleteSet = async (id: string) => {
        try {
            const { data } = await deleteSetMutation({
                variables: { id },
            });

            if (data && data.deleteSet) {
                setSets((prevSet) => prevSet.filter((set) => set.id !== id));
                resetPagination();
            }
        } catch (error) {
            console.error('Error deleting product set:', error);
        }
    };

    return (
        <SetsContext.Provider
            value={{
                fetchSets,
                sets,
                loading,
                error,
                page,
                setPage,
                search,
                setSearch,
                limit,
                setLimit,
                totalCount,
                totalPages,
                currentPage,
                setTotalPages,
                setTotalCount,
                setCurrentPage,
                createSet,
                updateSet,
                deleteSet,
            }}
        >
            {children}
        </SetsContext.Provider>
    );
};

export const useSetsContext = () => {
    const context = useContext(SetsContext);

    if (!context) {
        throw new Error('useSetsContext must be used within a SetsProvider');
    }
    return context;
};
