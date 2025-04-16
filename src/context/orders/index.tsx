import { ApolloError, useLazyQuery } from '@apollo/client';
import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useMemo,
} from 'react';
import { GET_ALL_ORDERS } from '../../graphql/orders';

interface Order {
    id: number;
    orderNumber: string;
    email: string;
    total: number;
    subtotal: number;
    status: string;
    createdAt: string;
    updatedAt: string;
    discountCode?: {
        id: number;
        code: string;
    };
}

interface OrdersContextProps {
    orders: Order[];
    fetchOrders: () => void;
    loading: boolean;
    error: ApolloError | undefined;
    page: number;
    setPage: (page: number) => void;
    limit: number;
    setLimit: (limit: number) => void;
    search: string;
    setSearch: (search: string) => void;
    totalCount: number;
    totalPages: number;
    currentPage: number;
    setTotalPages: (totalPages: number) => void;
    setTotalCount: (totalCount: number) => void;
    setCurrentPage: (currentPage: number) => void;
    resetPagination: () => void;
}

const OrdersContext = createContext<OrdersContextProps | null>(null);

export const OrdersProvider = ({ children }: { children: ReactNode }) => {
    const [orders, setOrders] = useState<Order[]>([]);
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

    const [fetchOrders, { loading, error }] = useLazyQuery(GET_ALL_ORDERS, {
        fetchPolicy: 'cache-and-network',
        variables: queryVariables,
        onCompleted: (data) => {
            if (data?.getAllOrders) {
                setOrders(data.getAllOrders.orders || []);
                setTotalPages(data.getAllOrders.totalPages || 1);
                setTotalCount(data.getAllOrders.totalCount || 0);
                setCurrentPage(data.getAllOrders.currentPage || 1);
            }
        },
    });

    return (
        <OrdersContext.Provider
            value={{
                orders,
                fetchOrders,
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
        </OrdersContext.Provider>
    );
};

export const useOrdersContext = () => {
    const context = useContext(OrdersContext);
    if (!context) {
        throw new Error(
            'useOrdersContext must be used within an OrdersProvider',
        );
    }
    return context;
};
