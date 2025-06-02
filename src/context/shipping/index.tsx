import React, {
    createContext,
    ReactNode,
    useContext,
    useState,
    useMemo,
} from 'react';
import {
    GET_ALL_SHIPPING_OPTIONS,
    GET_ALL_SHIPPING_PROVIDERS,
    CREATE_SHIPPING_PROVIDER,
    CREATE_SHIPPING_OPTION,
    UPDATE_SHIPPING_OPTION,
    UPDATE_SHIPPING_PROVIDER,
} from '../../graphql/shipping';
import { useLazyQuery, useMutation } from '@apollo/client';

interface ShippingProvider {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}

interface ShippingOption {
    id: number;
    name: string;
    cost: number;
    estimatedDays: number;
    description?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    provider: ShippingProvider;
}

interface ShippingContextProps {
    fetchShippingOptions: () => void;
    fetchShippingProviders: () => void;
    createShippingProvider: (input: { name: string }) => Promise<{
        success: boolean;
        provider?: ShippingProvider;
        message?: string;
    }>;
    createShippingOption: (input: {
        name: string;
        cost: number;
        estimatedDays: number;
        description?: string;
        isActive: boolean;
        providerId: number;
    }) => Promise<{
        success: boolean;
        option?: ShippingOption;
        message?: string;
    }>;
    updateShippingOption: (input: {
        id: number;
        name?: string;
        cost?: number;
        estimatedDays?: number;
        description?: string;
        isActive?: boolean;
        providerId?: number;
    }) => Promise<{
        success: boolean;
        option?: ShippingOption;
        message?: string;
    }>;
    updateShippingProvider: (input: { id: number; name: string }) => Promise<{
        success: boolean;
        provider?: ShippingProvider;
        message?: string;
    }>;
    shippingOptions: ShippingOption[];
    shippingProviders: ShippingProvider[];
    loadingOptions: boolean;
    loadingProviders: boolean;
    errorOptions: any;
    errorProviders: any;
    page: number;
    setPage: (page: number) => void;
    providerPage: number;
    setProviderPage: (page: number) => void;
    search: string;
    setSearch: (search: string) => void;
    providerSearch: string;
    setProviderSearch: (search: string) => void;
    limit: number;
    setLimit: (limit: number) => void;
    totalOptions: number;
    totalProviders: number;
    totalPagesOptions: number;
    totalPagesProviders: number;
}

const ShippingContext = createContext<ShippingContextProps | null>(null);

export const ShippingProvider = ({ children }: { children: ReactNode }) => {
    const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>(
        [],
    );
    const [shippingProviders, setShippingProviders] = useState<
        ShippingProvider[]
    >([]);

    const [page, setPage] = useState(1);
    const [providerPage, setProviderPage] = useState(1);
    const [limit, setLimit] = useState(20);

    const [search, setSearch] = useState('');
    const [providerSearch, setProviderSearch] = useState('');

    const [totalOptions, setTotalOptions] = useState(0);
    const [totalProviders, setTotalProviders] = useState(0);
    const [totalPagesOptions, setTotalPagesOptions] = useState(1);
    const [totalPagesProviders, setTotalPagesProviders] = useState(1);

    const variablesOptions = useMemo(
        () => ({ page, limit, search }),
        [page, limit, search],
    );

    const variablesProviders = useMemo(
        () => ({ page: providerPage, limit, search: providerSearch }),
        [providerPage, limit, providerSearch],
    );

    const [
        fetchShippingOptions,
        { loading: loadingOptions, error: errorOptions },
    ] = useLazyQuery(GET_ALL_SHIPPING_OPTIONS, {
        fetchPolicy: 'cache-and-network',
        variables: variablesOptions,
        onCompleted: (data) => {
            if (data?.getAllShippingOptions) {
                setShippingOptions(data.getAllShippingOptions.options || []);
                setTotalOptions(data.getAllShippingOptions.total || 0);
                setTotalPagesOptions(data.getAllShippingOptions.pages || 1);
            }
        },
    });

    const [
        fetchShippingProviders,
        { loading: loadingProviders, error: errorProviders },
    ] = useLazyQuery(GET_ALL_SHIPPING_PROVIDERS, {
        fetchPolicy: 'cache-and-network',
        variables: variablesProviders,
        onCompleted: (data) => {
            if (data?.getAllShippingProviders) {
                setShippingProviders(
                    data.getAllShippingProviders.providers || [],
                );
                setTotalProviders(data.getAllShippingProviders.total || 0);
                setTotalPagesProviders(data.getAllShippingProviders.pages || 1);
            }
        },
    });
    const [createShippingProviderMutation] = useMutation(
        CREATE_SHIPPING_PROVIDER,
    );
    const [createShippingOptionMutation] = useMutation(CREATE_SHIPPING_OPTION);

    const createShippingProvider = async ({ name }: { name: string }) => {
        try {
            const { data } = await createShippingProviderMutation({
                variables: { name },
            });

            if (data?.createShippingProvider) {
                return { success: true, provider: data.createShippingProvider };
            }

            return { success: false, message: 'Creation failed.' };
        } catch (error: any) {
            return { success: false, message: error.message };
        }
    };

    const createShippingOption = async ({
        name,
        cost,
        estimatedDays,
        description,
        isActive,
        providerId,
    }: {
        name: string;
        cost: number;
        estimatedDays: number;
        description?: string;
        isActive: boolean;
        providerId: number;
    }) => {
        try {
            const { data } = await createShippingOptionMutation({
                variables: {
                    name,
                    cost,
                    estimatedDays,
                    description,
                    isActive,
                    providerId,
                },
            });

            if (data?.createShippingOption) {
                return { success: true, option: data.createShippingOption };
            }

            return { success: false, message: 'Creation failed.' };
        } catch (error: any) {
            return { success: false, message: error.message };
        }
    };

    const [updateShippingOptionMutation] = useMutation(UPDATE_SHIPPING_OPTION);

    const updateShippingOption = async ({
        id,
        name,
        cost,
        estimatedDays,
        description,
        isActive,
        providerId,
    }: {
        id: number;
        name?: string;
        cost?: number;
        estimatedDays?: number;
        description?: string;
        isActive?: boolean;
        providerId?: number;
    }) => {
        try {
            const { data } = await updateShippingOptionMutation({
                variables: {
                    id,
                    name,
                    cost,
                    estimatedDays,
                    description,
                    isActive,
                    providerId,
                },
            });

            if (data?.updateShippingOption) {
                return { success: true, option: data.updateShippingOption };
            }

            return { success: false, message: 'Update failed.' };
        } catch (error: any) {
            return { success: false, message: error.message };
        }
    };

    const [updateShippingProviderMutation] = useMutation(
        UPDATE_SHIPPING_PROVIDER,
    );

    const updateShippingProvider = async ({
        id,
        name,
    }: {
        id: number;
        name: string;
    }) => {
        try {
            const { data } = await updateShippingProviderMutation({
                variables: { id, name },
            });

            if (data?.updateShippingProvider) {
                return { success: true, provider: data.updateShippingProvider };
            }

            return { success: false, message: 'Update failed.' };
        } catch (error: any) {
            return { success: false, message: error.message };
        }
    };

    return (
        <ShippingContext.Provider
            value={{
                fetchShippingOptions,
                fetchShippingProviders,
                createShippingProvider,
                createShippingOption,
                updateShippingOption,
                updateShippingProvider,
                shippingOptions,
                shippingProviders,
                loadingOptions,
                loadingProviders,
                errorOptions,
                errorProviders,
                page,
                setPage,
                providerPage,
                setProviderPage,
                search,
                setSearch,
                providerSearch,
                setProviderSearch,
                limit,
                setLimit,
                totalOptions,
                totalProviders,
                totalPagesOptions,
                totalPagesProviders,
            }}
        >
            {children}
        </ShippingContext.Provider>
    );
};

export const useShippingContext = () => {
    const context = useContext(ShippingContext);
    if (!context) {
        throw new Error(
            'useShippingContext must be used within ShippingProvider',
        );
    }
    return context;
};
