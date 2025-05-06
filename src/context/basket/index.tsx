import React, { createContext, useContext, useEffect, useState } from 'react';

const StorageKeys = {
    SESSION: 'basket_session',
    LOCAL: 'basket_local',
};

type BasketItem = {
    productId: number;
    name: string;
    price: number;
    quantity: number;
    img: { url: string };
};

type BasketContextType = {
    basket: BasketItem[];
    addToBasket: (item: BasketItem) => void;
    removeFromBasket: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearBasket: () => void;
};

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export const BasketProvider = ({ children }: { children: React.ReactNode }) => {
    const [basket, setBasket] = useState<BasketItem[]>(() => {
        if (typeof window !== 'undefined') {
            const session = sessionStorage.getItem(StorageKeys.SESSION);
            if (session) return JSON.parse(StorageKeys.SESSION);

            const local = localStorage.getItem(StorageKeys.LOCAL);
            if (local) return JSON.parse(local);
        }
        return [];
    });

    useEffect(() => {
        sessionStorage.setItem(StorageKeys.SESSION, JSON.stringify(basket));
        localStorage.setItem(StorageKeys.LOCAL, JSON.stringify(basket));
    }, [basket]);

    useEffect(() => {
        const handleUnload = () =>
            sessionStorage.removeItem(StorageKeys.SESSION);
        window.addEventListener('beforeunload', handleUnload);
        return () => window.removeEventListener('beforeunload', handleUnload);
    }, []);

    const addToBasket = (item: BasketItem) => {
        setBasket((prev) => {
            const existing = prev.find((i) => i.productId === item.productId);
            if (existing) {
                return prev.map((i) =>
                    i.productId === item.productId
                        ? { ...i, quantity: i.quantity + item.quantity }
                        : i,
                );
            }
            return [...prev, item];
        });
    };

    const removeFromBasket = (productId: number) => {
        setBasket((prev) => prev.filter((i) => i.productId !== productId));
    };

    const updateQuantity = (productId: number, quantity: number) => {
        setBasket((prev) =>
            prev.map((i) =>
                i.productId === productId ? { ...i, quantity } : i,
            ),
        );
    };

    const clearBasket = () => {
        setBasket([]);
    };

    return (
        <BasketContext.Provider
            value={{
                basket,
                addToBasket,
                removeFromBasket,
                updateQuantity,
                clearBasket,
            }}
        >
            {children}
        </BasketContext.Provider>
    );
};

export const useBasketContext = () => {
    const context = useContext(BasketContext);
    if (!context)
        throw new Error('useBasket must be used within BasketProvider');
    return context;
};
