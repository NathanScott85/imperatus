import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_CAROUSEL_PAGES, ADD_CAROUSEL_PAGE, UPDATE_CAROUSEL_PAGE, DELETE_CAROUSEL_PAGE } from '../../graphql/carousel';

interface UploadedFile {
    id: string;
    url: string;
    key: string;
    fileName: string;
    contentType: string;
    createdAt: string;
}

interface CarouselPage {
    id: string;
    title: string;
    description: string;
    buttonText?: string;
    img?: UploadedFile | null;
    brandId?: string;
    productId?: string;
    disabled?: boolean;
}

interface CarouselContextProps {
    carousel: CarouselPage[] | null;
    loading: boolean;
    error: any;
    fetchCarousel: () => void;
    addCarousel: (
        title: string,
        description: string,
        img: File | null,
        buttonText?: string,
        brandId?: number,
        productId?: string,
        disabled?: boolean
    ) => Promise<void>;
    updateCarousel: (
        id: string,
        title?: string,
        description?: string,
        buttonText?: string, 
        img?: File | null,
        brandId?: string,
        productId?: string,
        disabled?: boolean
    ) => Promise<void>;
    deleteCarousel: (id: string) => Promise<void>;
    setCarousel: React.Dispatch<React.SetStateAction<CarouselPage[]>>;
    totalCount: number;
    totalPages: number;
    page: number;
    setPage: (page: number) => void;
    search: string;
    setSearch: (search: string) => void;
}

const CarouselContext = createContext<CarouselContextProps | null>(null);

export const CarouselProvider = ({ children }: { children: ReactNode }) => {
    const [carousel, setCarousel] = useState<CarouselPage[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');

    const [fetchCarousel, { loading, error }] = useLazyQuery(GET_CAROUSEL_PAGES, {
        fetchPolicy: 'cache-and-network',
        variables: { page, limit: 10, search },
        onCompleted: (data) => {
            setCarousel(data?.getCarouselPages.carouselPages || []);
            setTotalCount(data?.getCarouselPages.totalCount || 0);
            setTotalPages(data?.getCarouselPages.totalPages || 1);
        },
    });

    const [addCarouselMutation] = useMutation(ADD_CAROUSEL_PAGE);
    const [updateCarouselMutation] = useMutation(UPDATE_CAROUSEL_PAGE);
    const [deleteCarouselMutation] = useMutation(DELETE_CAROUSEL_PAGE);

    const addCarousel = async (
        title: string,
        description: string,
        img: File | null,
        buttonText?: string,
        brandId?: number,
        productId?: string,
        disabled: boolean = false
    ) => {
        try {
            const { data } = await addCarouselMutation({
                variables: { title, description, img, buttonText, brandId, productId, disabled },
            });

            if (data) {
                fetchCarousel();
            }
        } catch (err) {
            console.error('Error adding carousel page:', err);
            throw new Error('Failed to add carousel page.');
        }
    };

    const updateCarousel = async (
        id: string,
        title?: string,
        description?: string,
        buttonText?: string, 
        img?: File | null,
        brandId?: string,
        productId?: string,
        disabled?: boolean
    ) => {
        try {
            const brandid = Number(brandId);
            const { data } = await updateCarouselMutation({
                variables: { id, title, description, buttonText, img, brandid, productId, disabled },
            });

            if (data) {
                fetchCarousel();
            }
        } catch (err) {
            console.error('Error updating carousel page:', err);
            throw new Error('Failed to update carousel page.');
        }
    };

    const deleteCarousel = async (id: string) => {
        try {
            const { data } = await deleteCarouselMutation({
                variables: { id },
            });

            if (data?.deleteCarouselPage?.deletedPage) {
                setCarousel((prev) => prev.filter((page) => page.id !== id));
            }
        } catch (err) {
            console.error('Error deleting carousel page:', err);
            throw new Error('Failed to delete carousel page.');
        }
    };

    useEffect(() => {
        fetchCarousel();
    }, [fetchCarousel, page, search]);

    return (
        <CarouselContext.Provider
            value={{
                carousel,
                loading,
                error,
                fetchCarousel,
                addCarousel,
                updateCarousel,
                deleteCarousel,
                setCarousel,
                totalCount,
                totalPages,
                page,
                setPage,
                search,
                setSearch,
            }}
        >
            {children}
        </CarouselContext.Provider>
    );
};

export const useCarouselContext = () => {
    const context = useContext(CarouselContext);
    if (!context) {
        throw new Error('useCarouselContext must be used within a CarouselProvider');
    }
    return context;
};
