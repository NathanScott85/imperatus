import React, {
    createContext,
    useContext,
    useState,
    useMemo,
    ReactNode,
} from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import {
    GET_VARIANTS,
    CREATE_VARIANT,
    UPDATE_VARIANT,
} from '../../graphql/variants';

interface Variant {
    id: number;
    name: string;
}

interface VariantsContextProps {
    variants: Variant[] | null;
    loading: boolean;
    error: any;
    totalCount: number;
    totalPages: number;
    page: number;
    setPage: (page: number) => void;
    search: string;
    setSearch: (search: string) => void;
    fetchVariants: () => void;
    createVariant: (name: string) => Promise<{ success: boolean; message: string; variant: Variant | null }>;
    updateVariant: (id: number, name: string) => Promise<{ success: boolean; message: string; variant: Variant | null }>;
}

const VariantsContext = createContext<VariantsContextProps | undefined>(undefined);

export const VariantsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [variants, setVariants] = useState<Variant[]>([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const queryVariables = useMemo(() => ({ page, limit: 10, search }), [page, search]);

    const [fetchVariantsQuery, { loading, error }] = useLazyQuery(GET_VARIANTS, {
        variables: queryVariables,
        fetchPolicy: 'cache-and-network',
        onCompleted: (data) => {
            setVariants(data.getAllVariants.variants || []);
            setTotalCount(data.getAllVariants.totalCount);
            setTotalPages(data.getAllVariants.totalPages);
        },
    });

    const [createVariantMutation] = useMutation(CREATE_VARIANT);
    const [updateVariantMutation] = useMutation(UPDATE_VARIANT);

    const createVariant = async (name: string): Promise<{ success: boolean; message: string; variant: Variant | null }> => {
        try {
            const { data } = await createVariantMutation({ variables: { name } });

            if (data?.createVariant) {
                return {
                    success: true,
                    message: 'Variant created successfully!',
                    variant: data.createVariant,
                };
            } else {
                throw new Error('Failed to create variant.');
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            return {
                success: false,
                message: errorMessage,
                variant: null,
            };
        }
    };

    const updateVariant = async (id: number, name: string): Promise<{ success: boolean; message: string; variant: Variant | null }> => {
        try {
            const { data } = await updateVariantMutation({ variables: { id, name } });

            if (data?.updateVariant) {
                return {
                    success: true,
                    message: "Variant updated successfully!",
                    variant: data.updateVariant,
                };
            } else {
                throw new Error("Failed to update variant.");
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            return {
                success: false,
                message: errorMessage,
                variant: null,
            };
        }
    };

    return (
        <VariantsContext.Provider
            value={{
                variants,
                loading,
                error,
                totalCount,
                totalPages,
                page,
                setPage,
                search,
                setSearch,
                fetchVariants: fetchVariantsQuery,
                createVariant,
                updateVariant,
            }}
        >
            {children}
        </VariantsContext.Provider>
    );
};

export const useVariantsContext = () => {
    const context = useContext(VariantsContext);
    if (!context) {
        throw new Error('useVariantsContext must be used within a VariantsProvider');
    }
    return context;
};
