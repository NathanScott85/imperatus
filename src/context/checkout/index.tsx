// context/checkout.tsx
import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
    useCallback,
} from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';
import { CREATE_ORDER, IS_FIRST_ORDER } from '../../graphql/orders';
import { Order } from '../orders';
import { useAppContext } from '../index';

interface CheckoutContextProps {
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
    loading: boolean;
    error: string | null;
    isFirstOrder: boolean;
    fetchIsFirstOrder: (email: string) => Promise<boolean>;
}

const CheckoutContext = createContext<CheckoutContextProps | null>(null);

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useAppContext();
    const [createOrderMutation, { loading }] = useMutation(CREATE_ORDER);
    const [error, setError] = useState<string | null>(null);
    const [isFirstOrder, setIsFirstOrder] = useState(false);

    // useLazyQuery against the boolean endpoint
    const [fetchFirstOrderFlag] = useLazyQuery(IS_FIRST_ORDER);

    const fetchIsFirstOrder = useCallback(
        async (email: string) => {
            try {
                const { data } = await fetchFirstOrderFlag({
                    variables: { email },
                    fetchPolicy: 'network-only',
                });
                const flag = data?.isFirstOrder ?? false;
                setIsFirstOrder(flag);
                return flag;
            } catch {
                setIsFirstOrder(false);
                return false;
            }
        },
        [fetchFirstOrderFlag],
    );

    useEffect(() => {
        if (user?.email) {
            fetchIsFirstOrder(user.email);
        }
    }, [user?.email, fetchIsFirstOrder]);

    const createOrder = async (
        input: Parameters<CheckoutContextProps['createOrder']>[0],
    ) => {
        try {
            const { data } = await createOrderMutation({
                variables: { input },
            });
            if (data?.createOrder) {
                return {
                    success: true,
                    message: 'Order created successfully!',
                    order: data.createOrder,
                };
            }
            throw new Error('Order creation failed.');
        } catch (err: any) {
            setError(err.message);
            return {
                success: false,
                message: err.message || 'Unknown error',
                order: null,
            };
        }
    };

    return (
        <CheckoutContext.Provider
            value={{
                createOrder,
                loading,
                error,
                isFirstOrder,
                fetchIsFirstOrder,
            }}
        >
            {children}
        </CheckoutContext.Provider>
    );
};

export const useCheckoutContext = () => {
    const context = useContext(CheckoutContext);
    if (!context)
        throw new Error(
            'useCheckoutContext must be used within CheckoutProvider',
        );
    return context;
};
