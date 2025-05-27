import React, { createContext, useContext, useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
    GET_APPLICATION_SETTINGS,
    UPDATE_APPLICATION_SETTINGS,
} from '../../graphql/settings';

interface ApplicationSettings {
    comingSoon: boolean;
    maintenance: boolean;
}

interface ApplicationSettingsContextType {
    settings: ApplicationSettings | null;
    loading: boolean;
    updateSettings: (data: Partial<ApplicationSettings>) => void;
}

const ApplicationSettingsContext =
    createContext<ApplicationSettingsContextType>({
        settings: null,
        loading: true,
        updateSettings: () => {},
    });

export const ApplicationSettingsProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const { data, loading, refetch } = useQuery(GET_APPLICATION_SETTINGS);
    const [update] = useMutation(UPDATE_APPLICATION_SETTINGS);

    const updateSettings = async (data: Partial<ApplicationSettings>) => {
        await update({ variables: data });
        await refetch();
    };

    return (
        <ApplicationSettingsContext.Provider
            value={{
                settings: data?.getApplicationSettings || null,
                loading,
                updateSettings,
            }}
        >
            {children}
        </ApplicationSettingsContext.Provider>
    );
};

export const useApplicationSettings = () =>
    useContext(ApplicationSettingsContext);
