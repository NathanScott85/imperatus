import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_CAROUSEL_PAGES, ADD_CAROUSEL_PAGE } from '../../graphql/carousel';

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
    img?: UploadedFile | null;
}

interface CarouselContextProps {
    carousel: CarouselPage[] | null;
    loading: boolean;
    error: any;
    fetchCarousel: () => void;
    addCarousel: (title: string, description: string, img: File | null) => Promise<void>;
    setCarousel: React.Dispatch<React.SetStateAction<CarouselPage[]>>;
}

const CarouselContext = createContext<CarouselContextProps | null>(null);

export const CarouselProvider = ({ children }: { children: ReactNode }) => {
    const [carousel, setCarousel] = useState<CarouselPage[]>([]);

    const [fetchCarousel, { loading, error }] = useLazyQuery(GET_CAROUSEL_PAGES, {
        fetchPolicy: 'cache-and-network',
        onCompleted: (data) => {
            setCarousel(data?.getCarouselPages || []);
        },
    });

    // Mutation for adding a new carousel page
    const [addCarouselMutation] = useMutation(ADD_CAROUSEL_PAGE);

    // Function to call the add carousel mutation
    const addCarousel = async (title: string, description: string, img: File | null) => {
        try {
            const { data } = await addCarouselMutation({
                variables: {
                    title,
                    description,
                    img, // The backend should handle this as an Upload scalar
                },
            });

            // // Optionally update local state with the new carousel
            // if (data) {
            //     fetchCarousel(); // Refetch all carousels
            // }
        } catch (err) {
            console.error('Error adding carousel page:', err);
            throw new Error('Failed to add carousel page.');
        }
    };

    useEffect(() => {
        fetchCarousel();
    }, [fetchCarousel]);

    return (
        <CarouselContext.Provider
            value={{
                carousel,
                loading,
                error,
                fetchCarousel,
                addCarousel,
                setCarousel,
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
