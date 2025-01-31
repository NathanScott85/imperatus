import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
    useMemo,
} from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { CREATE_PROMOTION, DELETE_PROMOTION, GET_ALL_PROMOTIONS, UPDATE_PROMOTION } from '../../graphql/promotions';

interface File {
    id: string;
    url: string;
    key: string;
    fileName: string;
    contentType: string;
    createdAt: string;
}

interface Promotion {
    id: string;
    title: string;
    description: string;
    img?: File | null;
    slug: string;
    startDate: string;
    endDate: string;
    createdAt: string;
    updatedAt: string;
}

interface PromotionsContextProps {
    promotions: Promotion[] | null;
    loading: boolean;
    error: any;
    fetchPromotions: () => void;
    totalCount: number;
    totalPages: number;
    page: number;
    setPage: (page: number) => void;
    limit: number;
    setLimit: (limit: number) => void;
    resetPagination: () => void;
    createPromotion: (
        title: string,
        description: string,
        img: any,
        startDate: string,
        endDate: string
    ) => Promise<void>;
    creating: boolean;
    createError: any;
    createSuccess: boolean;
    updatePromotion: (
        id: number,
        title: string,
        description: string,
        img: any,
        startDate: string,
        endDate: string
    ) => Promise<void>;
    deletePromotion: (id: number) => Promise<void>;
    setSearch: (search: string) => void;
    updating: boolean;
    updateError: any;
    deleting: boolean;
    deleteError: any;
}

const PromotionsContext = createContext<PromotionsContextProps | null>(null);

export const PromotionsProvider = ({ children }: { children: ReactNode }) => {
    const [promotions, setPromotions] = useState<Promotion[]>([]);
    const [limit, setLimit] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');

    const queryVariables = useMemo(
        () => ({ page: page, limit, search }),
        [page, limit, search]
    );

    const resetPagination = () => {
        setPage(1);
    };

    const [fetchPromotions, { loading, error }] = useLazyQuery(GET_ALL_PROMOTIONS, {
        fetchPolicy: 'cache-and-network',
        variables: queryVariables,
        onCompleted: (data) => {
            setPromotions(data?.getAllPromotions?.promotions || []);
            setTotalCount(data?.getAllPromotions?.totalCount || 0);
            setTotalPages(data?.getAllPromotions?.totalPages || 1);
            setPage(data.getAllPromotions.currentPage || 1);
        },
    });

    const [createPromotionMutation, { loading: creating, error: createError, data: createData }] = useMutation(CREATE_PROMOTION, {
        onCompleted: (data) => {
            if (data?.createPromotion) {
                setPromotions((prevPromotions) => [data.createPromotion, ...prevPromotions]);
            }
        },
    });

    const [updatePromotionMutation, { loading: updating, error: updateError }] =
        useMutation(UPDATE_PROMOTION);

    const [deletePromotionMutation, { loading: deleting, error: deleteError }] =
        useMutation(DELETE_PROMOTION);

    const createPromotion = async (
        title: string,
        description: string,
        img: any,
        startDate: string,
        endDate: string
    ) => {
        try {
            await createPromotionMutation({
                variables: { title, description, img, startDate, endDate },
            });
        } catch (error) {
            console.error('Error creating promotion:', error);
        }
    };

    const updatePromotion = async (
        id: number,
        title: string,
        description: string,
        img: any,
        startDate: string,
        endDate: string
    ) => {
        try {
            await updatePromotionMutation({
                variables: { id, title, description, img, startDate, endDate },
            });
        } catch (error) {
            console.error('Error updating promotion:', error);
        }
    };

    const deletePromotion = async (id: number) => {
        try {
            await deletePromotionMutation({
                variables: { id },
            });
            setPromotions((prevPromotions) =>
                prevPromotions.filter((promotion) => promotion.id !== id.toString())
            );
        } catch (error) {
            console.error('Error deleting promotion:', error);
        }
    };

    useEffect(() => {
        fetchPromotions();
    }, [fetchPromotions, limit]);

    return (
        <PromotionsContext.Provider
            value={{
                promotions,
                loading,
                error,
                fetchPromotions,
                totalCount,
                totalPages,
                page,
                setPage, // ✅ Ensure only one function updates the current page
                limit,
                setLimit,
                resetPagination,
                createPromotion,
                updatePromotion,
                deletePromotion,
                creating,
                createError,
                createSuccess: !!createData,
                updating,
                updateError,
                deleting,
                deleteError,
                setSearch,
            }}
        >
            {children}
        </PromotionsContext.Provider>
    );
};

export const usePromotionsContext = () => {
    const context = useContext(PromotionsContext);
    if (!context) {
        throw new Error('usePromotionsContext must be used within a PromotionsProvider');
    }
    return context;
};
