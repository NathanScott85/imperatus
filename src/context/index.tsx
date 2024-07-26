import React, { createContext, useContext } from 'react';

const AppContext = createContext<AppContextProps | null>(null);

interface AppContextProps {
    Dummy?: any;
    children: any;
}

export const AppProvider = ({ children, Dummy }: AppContextProps) => {
    return <AppContext.Provider value={Dummy}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
