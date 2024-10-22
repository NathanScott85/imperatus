import { gql } from '@apollo/client';

export const CREATE_CAROUSEL_ITEM = gql`
    mutation CreateCarouselItem(
        $title: String!
        $description: String
        $image: Upload
        $logo: Upload 
        $isActive: Boolean!
    ) {
        createCarouselItem(
            title: $title
            description: $description
            image: $image
            logo: $logo
            isActive: $isActive
        ) {
            id
            title
            description
            isActive
            createdAt
            updatedAt
           
        }
    }
`;


 // carouselImage {
            //     id
            //     url
            //     fileName
            // }
            // carouselLogo {
            //     id
            //     url
            //     fileName
            // }