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
            brand {
                id
                name
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

export const UPDATE_CAROUSEL_PAGE = gql`
    mutation UpdateCarouselPage(
        $id: ID!
        $title: String
        $description: String
        $img: Upload
        $brandId: ID
    ) {
        updateCarouselPage(
            id: $id
            title: $title
            description: $description
            img: $img
            brandId: $brandId
        ) {
            id
            title
            description
            img {
                id
                url
                fileName
            }
            brand {
                id
                name
            }
        }
    }
`;

export const DELETE_CAROUSEL_PAGE = gql`
    mutation DeleteCarouselPage($id: ID!) {
        deleteCarouselPage(id: $id) {
            message
            deletedPage {
                id
                title
                description
            }
        }
    }
`;
