import { gql } from '@apollo/client';

export const GET_ALL_SHIPPING_OPTIONS = gql`
    query GetAllShippingOptions($page: Int, $limit: Int, $search: String) {
        getAllShippingOptions(page: $page, limit: $limit, search: $search) {
            options {
                id
                name
                cost
                estimatedDays
                description
                provider {
                    id
                    name
                }
            }
            total
            page
            pages
        }
    }
`;

export const GET_ALL_SHIPPING_PROVIDERS = gql`
    query GetAllShippingProviders($page: Int, $limit: Int, $search: String) {
        getAllShippingProviders(page: $page, limit: $limit, search: $search) {
            providers {
                id
                name
                createdAt
                updatedAt
            }
            total
            page
            pages
        }
    }
`;

export const CREATE_SHIPPING_PROVIDER = gql`
    mutation CreateShippingProvider($name: String!) {
        createShippingProvider(name: $name) {
            id
            name
            createdAt
            updatedAt
        }
    }
`;

export const CREATE_SHIPPING_OPTION = gql`
    mutation CreateShippingOption(
        $name: String!
        $cost: Float!
        $estimatedDays: Int!
        $description: String
        $isActive: Boolean!
        $providerId: Int!
    ) {
        createShippingOption(
            name: $name
            cost: $cost
            estimatedDays: $estimatedDays
            description: $description
            isActive: $isActive
            providerId: $providerId
        ) {
            id
            name
            cost
            estimatedDays
            description
            isActive
            createdAt
            updatedAt
            provider {
                id
                name
            }
        }
    }
`;

export const UPDATE_SHIPPING_OPTION = gql`
    mutation UpdateShippingOption(
        $id: Int!
        $name: String
        $cost: Float
        $estimatedDays: Int
        $description: String
        $isActive: Boolean
        $providerId: Int
    ) {
        updateShippingOption(
            id: $id
            name: $name
            cost: $cost
            estimatedDays: $estimatedDays
            description: $description
            isActive: $isActive
            providerId: $providerId
        ) {
            id
            name
            cost
            estimatedDays
            description
            isActive
            createdAt
            updatedAt
            provider {
                id
                name
            }
        }
    }
`;

export const UPDATE_SHIPPING_PROVIDER = gql`
    mutation UpdateShippingProvider($id: Int!, $name: String!) {
        updateShippingProvider(id: $id, name: $name) {
            id
            name
            createdAt
            updatedAt
            options {
                id
                name
            }
        }
    }
`;
