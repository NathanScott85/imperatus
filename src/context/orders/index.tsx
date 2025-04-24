import { ApolloError, useLazyQuery, useMutation } from '@apollo/client';
import React, {
    createContext,
    useContext,
    useMemo,
    useState,
    ReactNode,
} from 'react';
import {
    GET_ALL_ORDERS,
    CREATE_ORDER,
    UPDATE_ORDER,
    GET_ALL_STATUS,
    CREATE_ORDER_STATUS,
    UPDATE_ORDER_STATUS,
    DELETE_ORDER_STATUS,
} from '../../graphql/orders';

type DiscountCode = {
    id: number;
    code: string;
};

interface OrderItem {
    id: string;
    productId: number;
    quantity: number;
    price: number;
    product?: {
        id: string;
        name: string;
        price: number;
        rrp: number;
        description: string;
        slug: string;
        preorder: boolean;
        rarity: any;
        variant: any;
        cardType: any;
        set: any;
    };
}

export interface Order {
    id: number;
    orderNumber: string;
    name: string;
    address: string;
    city: string;
    phone: string;
    postcode: string;
    email: string;
    shippingCost: number;
    subtotal: number;
    total: number;
    status: string;
    vat: number;
    createdAt: string;
    updatedAt: string;
    discountCode?: DiscountCode;
    trackingNumber?: string;
    trackingProvider?: string;
    items: OrderItem[];
}

interface OrderStatus {
    id: number;
    value: string;
    label: string;
}

interface OrdersContextProps {
    orders: Order[];
    loading: boolean;
    error: ApolloError | undefined;
    fetchOrders: () => void;
    createOrder: (input: {
        email: string;
        name: string;
        address: string;
        city: string;
        postcode: string;
        phone: string;
        shippingCost: number;
        items: { productId: number; quantity: number; price: number }[];
        discountCode?: string;
    }) => Promise<{ success: boolean; message: string; order: Order | null }>;
    updateOrder: (
        id: number,
        input: {
            name?: string;
            address?: string;
            city?: string;
            postcode?: string;
            phone?: string;
            email?: string;
            shippingCost?: number;
            discountCode?: string;
            status?: string;
            trackingNumber?: string;
            trackingProvider?: string;
            items?: { productId: number; quantity: number; price: number }[];
        },
    ) => Promise<{ success: boolean; message: string; order: Order | null }>;
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
    orderStatus: OrderStatus[];
    fetchOrderStatus: () => void;
    createStatus: (
        value: string,
        label: string,
    ) => Promise<{
        success: boolean;
        message: string;
        status: OrderStatus | null;
    }>;
    updateOrderStatus: (
        id: number,
        value: string,
        label: string,
    ) => Promise<{ success: boolean; message: string }>;
    deleteOrderStatus: (
        id: number,
    ) => Promise<{ success: boolean; message: string }>;
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
    const [orderStatus, setOrderStatus] = useState<OrderStatus[]>([]);

    const [createOrderStatusMutation] = useMutation(CREATE_ORDER_STATUS);
    const [updateOrderStatusMutation] = useMutation(UPDATE_ORDER_STATUS);
    const [deleteOrderStatusMutation] = useMutation(DELETE_ORDER_STATUS);
    const [createOrderMutation] = useMutation(CREATE_ORDER);
    const [updateOrderMutation] = useMutation(UPDATE_ORDER);

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

    const createOrder = async (input: {
        email: string;
        name: string;
        address: string;
        city: string;
        postcode: string;
        phone: string;
        shippingCost: number;
        items: { productId: number; quantity: number; price: number }[];
        discountCode?: string;
    }) => {
        try {
            const { data } = await createOrderMutation({
                variables: { input },
            });

            if (data?.createOrder) {
                fetchOrders();
                return {
                    success: true,
                    message: 'Order created successfully!',
                    order: data.createOrder,
                };
            }

            throw new Error('Order creation failed.');
        } catch (error) {
            return {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : 'Unknown error occurred.',
                order: null,
            };
        }
    };

    const updateOrder = async (
        id: number,
        input: {
            name?: string;
            address?: string;
            city?: string;
            postcode?: string;
            phone?: string;
            email?: string;
            shippingCost?: number;
            discountCode?: string;
            status?: string;
            trackingNumber?: string;
            trackingProvider?: string;
            items?: { productId: number; quantity: number; price: number }[];
        },
    ): Promise<{ success: boolean; message: string; order: Order | null }> => {
        try {
            const { data } = await updateOrderMutation({
                variables: { id, input },
            });

            if (data?.updateOrder) {
                fetchOrders();
                return {
                    success: true,
                    message: 'Order updated successfully!',
                    order: data.updateOrder,
                };
            }

            throw new Error('Order update failed.');
        } catch (error) {
            return {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : 'Unknown error occurred.',
                order: null,
            };
        }
    };

    const [fetchOrderStatus] = useLazyQuery(GET_ALL_STATUS, {
        fetchPolicy: 'cache-and-network',
        onCompleted: (data) => {
            if (data?.getAllStatus) {
                setOrderStatus(data.getAllStatus);
            }
        },
    });

    const createStatus = async (value: string, label: string) => {
        try {
            const { data } = await createOrderStatusMutation({
                variables: { value, label },
            });

            if (data?.createStatus) {
                fetchOrderStatus();
                return {
                    success: true,
                    message: 'Order status created successfully!',
                    status: data.createStatus,
                };
            } else {
                throw new Error('Failed to create order status.');
            }
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : 'Unknown error occurred.';
            return {
                success: false,
                message: errorMessage,
                status: null,
            };
        }
    };

    const updateOrderStatus = async (
        id: number,
        value: string,
        label: string,
    ): Promise<{ success: boolean; message: string }> => {
        try {
            const { data } = await updateOrderStatusMutation({
                variables: { id, value, label },
            });

            if (data?.updateOrderStatus) {
                return {
                    success: true,
                    message: 'Order status updated successfully!',
                };
            } else {
                throw new Error('Update failed');
            }
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : 'Unknown error occurred.';
            return {
                success: false,
                message,
            };
        }
    };

    const deleteOrderStatus = async (id: number) => {
        try {
            const { data } = await deleteOrderStatusMutation({
                variables: { id },
            });

            if (data?.deleteOrderStatus?.success) {
                fetchOrderStatus();
                return {
                    success: true,
                    message:
                        data.deleteOrderStatus.message ||
                        'Order status deleted successfully',
                };
            }

            return {
                success: false,
                message:
                    data?.deleteOrderStatus?.message ||
                    'Failed to delete order status',
            };
        } catch (error) {
            return {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : 'Unknown error occurred',
            };
        }
    };

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
                orderStatus,
                fetchOrderStatus,
                createStatus,
                createOrder,
                updateOrder,
                updateOrderStatus,
                deleteOrderStatus,
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
