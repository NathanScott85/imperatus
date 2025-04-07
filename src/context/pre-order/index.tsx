import React, {
    createContext,
    useContext,
    useState,
    useMemo,
    useEffect,
    useCallback,
    ReactNode,
} from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_ALL_PREORDERS, GET_PREORDERS_BY_ID } from '../../graphql/products';

export interface ProductFilters {
    brandId?: number[];
    setId?: number[];
    rarityId?: number[];
    priceMin?: number;
    priceMax?: number;
    inStockOnly?: boolean;
    outOfStockOnly?: boolean;
    preorderOnly?: boolean;
}

interface Preorder {
    id: string;
    name: string;
    slug: string;
    description: string;
    img?: File | null;
    products: any;
    brands: Brand[];
    rarities?: Rarity[];
    sets?: Set[];
}

interface Brand {
    id: number;
    name: string;
    description: string;
}

interface Set {
    id: number;
    setName: string;
    setCode: string;
    description: string;
}

interface Rarity {
    id: number;
    name: string;
}

interface Preorders {
    products: Preorder[];
    brands: Brand[];
    rarities?: Rarity[];
    sets?: Set[];
}


interface PreordersContextProps {
    preorders: Preorders | null;
    currentPreorders: Preorder | null;
    setCurrentPreorders: React.Dispatch<React.SetStateAction<Preorder | null>>;
    loading: boolean;
    error: any;
    totalCount: number;
    totalPages: number;
    page: number;
    setPage: (page: number) => void;
    limit: number;
    setLimit: (limit: number) => void;
    search: string;
    setSearch: (search: string) => void;
    fetchPreorders: () => void;
    fetchPreordersById: (id: string, filtersOverride?: ProductFilters, pageOverride?: number, limitOverride?: number) => void;
    filters: ProductFilters;
    setFilters: React.Dispatch<React.SetStateAction<ProductFilters>>;
}

const PreordersContext = createContext<PreordersContextProps | undefined>(undefined);

export const PreordersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [preorders, setPreorders] = useState<Preorders | null>(null);
    const [currentPreorders, setCurrentPreorders] = useState<Preorder | null>(null);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState<ProductFilters>({});

    const queryVariables = useMemo(() => ({
        page,
        limit,
        search,
        filters,
    }), [page, limit, search, filters]);

    const [fetchPreordersQuery, { loading, error }] = useLazyQuery(GET_ALL_PREORDERS, {
        fetchPolicy: 'cache-and-network',
        variables: queryVariables,
        onCompleted: (data) => {
            setPreorders({
                products: data?.getAllPreorders?.products || [],
                brands: data?.getAllPreorders?.brands || [],
                rarities: data?.getAllPreorders?.rarities || [],
                sets: data?.getAllPreorders?.sets || [],
              });
            setTotalCount(data?.getAllPreorders?.totalCount || 0);
            setTotalPages(data?.getAllPreorders?.totalPages || 1);
        },
    });

    const [fetchPreordersByIdQuery] = useLazyQuery(GET_PREORDERS_BY_ID, {
        fetchPolicy: 'cache-and-network',
        onCompleted: (data) => {
            setTotalCount(data?.getCategoryById?.totalCount || 0);
            setTotalPages(data?.getCategoryById?.totalPages || 1);
            setCurrentPreorders({
                ...data?.getPreordersById,
                brands: data?.getPreordersById?.brands || [],
                rarities: data?.getPreordersById?.rarities || [],
                sets: data?.getPreordersById?.sets || [],
            });
        },
    });

    const fetchPreorders = useCallback(() => {
        fetchPreordersQuery({ variables: queryVariables });
    }, [fetchPreordersQuery, queryVariables]);

    const fetchPreordersById = useCallback((id: string, filtersOverride?: ProductFilters, pageOverride?: number, limitOverride?: number) => {
        fetchPreordersByIdQuery({
            variables: {
                id,
                page: pageOverride ?? page,
                limit: limitOverride ?? limit,
                filters: filtersOverride ?? filters,
            },
        });
    }, [fetchPreordersByIdQuery, page, limit, filters]);

    useEffect(() => {
        console.log(preorders, 'preorders use Effect context');
        fetchPreorders();
    }, [fetchPreorders]);

    return (
        <PreordersContext.Provider
            value={{
                preorders,
                setCurrentPreorders,
                currentPreorders,
                loading,
                error,
                totalCount,
                totalPages,
                page,
                setPage,
                limit,
                setLimit,
                search,
                setSearch,
                fetchPreorders,
                fetchPreordersById,
                filters,
                setFilters,
            }}
        >
            {children}
        </PreordersContext.Provider>
    );
};

export const usePreordersContext = () => {
    const context = useContext(PreordersContext);
    if (!context) {
        throw new Error('usePreordersContext must be used within a PreordersProvider');
    }
    return context;
};
