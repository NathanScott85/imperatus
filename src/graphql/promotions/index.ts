import { gql } from '@apollo/client';

export const GET_ALL_PROMOTIONS = gql`
    query GetAllPromotions($page: Int, $limit: Int, $search: String) {
        getAllPromotions(page: $page, limit: $limit, search: $search) {
            promotions {
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
                slug
                startDate
                endDate
                createdAt
                updatedAt
            }
            totalCount
            totalPages
            currentPage
        }
    }
`;

export const CREATE_PROMOTION = gql`
    mutation CreatePromotion(
        $title: String!
        $description: String!
        $img: Upload
        $startDate: String!
        $endDate: String!
    ) {
        createPromotion(
            title: $title
            description: $description
            img: $img
            startDate: $startDate
            endDate: $endDate
        ) {
            id
            title
            description
            img {
                id
                url
            }
            slug
            startDate
            endDate
            createdAt
            updatedAt
        }
    }
`;

export const UPDATE_PROMOTION = gql`
    mutation UpdatePromotion(
        $id: ID!
        $title: String!
        $description: String!
        $img: Upload
        $startDate: String!
        $endDate: String!
    ) {
        updatePromotion(
            id: $id
            title: $title
            description: $description
            img: $img
            startDate: $startDate
            endDate: $endDate
        ) {
            id
            title
            description
            img {
                url
            }
            slug
            startDate
            endDate
            createdAt
            updatedAt
        }
    }
`;

export const DELETE_PROMOTION = gql`
    mutation DeletePromotion($id: ID!) {
        deletePromotion(id: $id)
    }
`;