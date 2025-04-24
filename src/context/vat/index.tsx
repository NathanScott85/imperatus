import React, {
    createContext,
    ReactNode,
    useContext,
    useMemo,
    useState,
} from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_ALL_VAT_RECORDS } from '../../graphql/vat';

interface VatRecord {
    id: number;
    orderId: number;
    orderNumber: string;
    vatAmount: number;
    subtotal: number;
    total: number;
    status: string;
    createdAt: string;
}

interface VatContextType {
    fetchVatRecords: () => void;
    vatRecords: VatRecord[];
    loading: boolean;
    error: Error | undefined;
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
}

const VatContext = createContext<VatContextType | null>(null);

export const VatProvider = ({ children }: { children: ReactNode }) => {
    const [vatRecords, setVatRecords] = useState<VatRecord[]>([]);
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

    const [fetchVatRecords, { loading, error }] = useLazyQuery(
        GET_ALL_VAT_RECORDS,
        {
            fetchPolicy: 'cache-and-network',
            variables: queryVariables,
            onCompleted: (data) => {
                if (data?.getAllVATRecords) {
                    setVatRecords(data.getAllVATRecords.vatRecords || []);
                    setTotalPages(data.getAllVATRecords.totalPages || 1);
                    setTotalCount(data.getAllVATRecords.totalCount || 0);
                    setCurrentPage(data.getAllVATRecords.currentPage || 1);
                }
            },
        },
    );

    return (
        <VatContext.Provider
            value={{
                fetchVatRecords,
                vatRecords,
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
            }}
        >
            {children}
        </VatContext.Provider>
    );
};

export const useVatContext = () => {
    const context = useContext(VatContext);
    if (!context) {
        throw new Error('useVatContext must be used within a VatProvider');
    }
    return context;
};
