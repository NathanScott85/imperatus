import React, { createContext, useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_CAROUSEL_ITEM } from '../../graphql/carousel'; // Adjust the import path as necessary

const CarouselContext = createContext<any>(null);

export const CarouselProvider = ({ children }: any) => {
    const [carouselItems, setCarouselItems] = useState<any[]>([]);

    const [
        createCarouselItemMutation,
        { loading, error },
    ] = useMutation(CREATE_CAROUSEL_ITEM);
    console.log(loading, 'loading');
    const createCarouselItem = async (item: any) => {
        try {
            const { data } = await createCarouselItemMutation({
                variables: item,
            });
            console.log(data, 'data');
            if (data && data.createCarouselItem) {
                setCarouselItems((prevItems) => [
                    ...prevItems,
                    data.createCarouselItem,
                ]);
            }
        } catch (error) {
            console.error('Error creating carousel item:', error);
        }
    };

    return (
        <CarouselContext.Provider
            value={{
                carouselItems,
                createCarouselItem,
                loading,
                error,
            }}
        >
            {children}
        </CarouselContext.Provider>
    );
};

export const useCarouselContext = () => useContext(CarouselContext);
