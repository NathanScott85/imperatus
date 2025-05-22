// context/payment.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CREATE_STRIPE_PAYMENT_INTENT } from '../../graphql/payments';
import { useMutation } from '@apollo/client';

interface PaymentContextType {
    clientSecret: string | null;
    setClientSecret: (secret: string) => void;
    clearClientSecret: () => void;
    fetchClientSecret: (input: CreateStripePaymentIntentInput) => Promise<void>;
}

interface PaymentItemInput {
    productId: number;
    quantity: number;
    price: number;
}

export interface CreateStripePaymentIntentInput {
    orderId: number;
    email: string;
    name: string;
    address: string;
    city: string;
    postcode: string;
    phone: string;
    shippingCost: number;
    items: PaymentItemInput[];
    discountCode?: string;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const PaymentProvider = ({ children }: { children: ReactNode }) => {
    const [clientSecret, setSecret] = useState<string | null>(null);

    const setClientSecret = (secret: string) => setSecret(secret);
    const clearClientSecret = () => setSecret(null);

    const [createStripePaymentIntentMutation] = useMutation(
        CREATE_STRIPE_PAYMENT_INTENT,
    );

    const fetchClientSecret = async (input: CreateStripePaymentIntentInput) => {
        try {
            const { data } = await createStripePaymentIntentMutation({
                variables: { input },
            });
            const secret = data?.createStripePaymentIntent?.clientSecret;
            if (secret) setClientSecret(secret);
        } catch (error) {
            console.error('Failed to create payment intent:', error);
        }
    };

    return (
        <PaymentContext.Provider
            value={{
                clientSecret,
                setClientSecret,
                clearClientSecret,
                fetchClientSecret,
            }}
        >
            {children}
        </PaymentContext.Provider>
    );
};

export const usePaymentContext = (): PaymentContextType => {
    const context = useContext(PaymentContext);
    if (!context) {
        throw new Error(
            'usePaymentContext must be used within a PaymentProvider',
        );
    }
    return context;
};
