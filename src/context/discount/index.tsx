import { ApolloError, useLazyQuery, useMutation } from '@apollo/client';
import React, {
    createContext,
    ReactNode,
    useContext,
    useMemo,
    useState,
} from 'react';
import {
    GET_DISCOUNT_CODES,
    CREATE_DISCOUNT_CODE,
} from '../../graphql/discount';

interface DiscountCode {
    id: number;
    code: string;
    description?: string;
    type: string;
    value: number;
    active: boolean;
    expiresAt?: string;
    createdAt: string;
    updatedAt: string;
}

interface DiscountCodesContext {
    discountCodes: DiscountCode[];
    fetchDiscountCodes: () => void;
    createDiscountCode: (input: {
        code: string;
        description?: string;
        type: 'percentage' | 'fixed';
        value: number;
        expiresAt?: Date;
        active?: boolean;
    }) => Promise<{
        success: boolean;
        message: string;
        discountCode: DiscountCode | null;
    }>;
    loading: boolean;
    error: ApolloError | undefined;
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
    resetPagination: () => void;
}

const DiscountCodesContext = createContext<DiscountCodesContext | null>(null);

export const DiscountCodesProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [discountCodes, setDiscountCodes] = useState<DiscountCode[]>([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState('');
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const queryVariables = useMemo(
        () => ({ page: currentPage, limit, search }),
        [currentPage, limit, search],
    );

    const resetPagination = () => setCurrentPage(1);

    const [fetchDiscountCodes, { loading, error }] = useLazyQuery(
        GET_DISCOUNT_CODES,
        {
            fetchPolicy: 'cache-and-network',
            variables: queryVariables,
            onCompleted: (data) => {
                if (data?.getAllDiscountCodes) {
                    setDiscountCodes(
                        data.getAllDiscountCodes.discountCodes || [],
                    );
                    setTotalPages(data.getAllDiscountCodes.totalPages || 1);
                    setTotalCount(data.getAllDiscountCodes.totalCount || 0);
                    setCurrentPage(data.getAllDiscountCodes.currentPage || 1);
                }
            },
        },
    );

    const [createDiscountCodeMutation] = useMutation(CREATE_DISCOUNT_CODE);

    const createDiscountCode = async ({
        code,
        description,
        type,
        value,
        expiresAt,
        active = true,
    }: {
        code: string;
        description?: string;
        type: 'percentage' | 'fixed';
        value: number;
        expiresAt?: Date;
        active?: boolean;
    }) => {
        try {
            const { data } = await createDiscountCodeMutation({
                variables: {
                    code,
                    description,
                    type,
                    value,
                    expiresAt: expiresAt?.toISOString(),
                    active,
                },
            });

            if (data?.createDiscountCode) {
                return {
                    success: true,
                    message: 'Discount code created successfully.',
                    discountCode: data.createDiscountCode,
                };
            } else {
                throw new Error('Failed to create discount code.');
            }
        } catch (error) {
            return {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : 'Unexpected error occurred.',
                discountCode: null,
            };
        }
    };

    return (
        <DiscountCodesContext.Provider
            value={{
                discountCodes,
                fetchDiscountCodes,
                createDiscountCode,
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
                resetPagination,
            }}
        >
            {children}
        </DiscountCodesContext.Provider>
    );
};

export const useDiscountCodesContext = () => {
    const context = useContext(DiscountCodesContext);
    if (!context) {
        throw new Error(
            'useDiscountCodesContext must be used within a DiscountCodesProvider',
        );
    }
    return context;
};
