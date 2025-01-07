import { gql } from '@apollo/client';

export const GET_CAROUSEL_PAGES = gql`
    query GetCarouselPages {
        getCarouselPages {
            id
            createdAt
            updatedAt
            pages {
                id
                title
                description
                img {
                    id
                    url
                    key
                    fileName
                    contentType
                    createdAt
                }
            }
        }
    }
`;

export const ADD_CAROUSEL_PAGE = gql`
    mutation CreateCarouselPage($title: String!, $description: String!, $img: Upload!) {
        createCarouselPage(title: $title, description: $description, img: $img) {
            id
            title
            description
            img {
                id
                url
                fileName
            }
        }
    }
`;

