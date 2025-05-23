import { gql } from '@apollo/client';

export const GET_ALL_ORDERS = gql`
    query GetAllOrders($page: Int, $limit: Int, $search: String) {
        getAllOrders(page: $page, limit: $limit, search: $search) {
            orders {
                id
                orderNumber
                email
                name
                address
                city
                postcode
                phone
                subtotal
                shippingCost
                vat
                firstOrder
                total
                status
                createdAt
                updatedAt
                discountCode {
                    id
                    code
                }
                items {
                    id
                    productId
                    quantity
                    price
                    product {
                        id
                        name
                        price
                        rrp
                        description
                        slug
                        preorder
                        rarity {
                            id
                            name
                        }
                        variant {
                            id
                            name
                        }
                        cardType {
                            id
                            name
                            brandId
                        }
                        set {
                            id
                            setName
                            setCode
                            description
                            brandId
                        }
                    }
                }
            }
            totalCount
            totalPages
            currentPage
        }
    }
`;

export const GET_USER_ORDERS = gql`
    query GetUserOrders($email: String, $userId: Int, $page: Int, $limit: Int) {
        getUserOrders(
            email: $email
            userId: $userId
            page: $page
            limit: $limit
        ) {
            orders {
                id
                orderNumber
                name
                address
                firstOrder
                city
                phone
                postcode
                email
                shippingCost
                subtotal
                total
                status
                vat
                createdAt
                updatedAt
                items {
                    id
                    productId
                    quantity
                    price
                    product {
                        id
                        name
                        price
                        slug
                        rarity {
                            id
                            name
                        }
                        set {
                            id
                            setName
                        }
                    }
                }
            }
            totalCount
            totalPages
            currentPage
        }
    }
`;

export const IS_FIRST_ORDER = gql`
    query IsFirstOrder($email: String!) {
        isFirstOrder(email: $email)
    }
`;

export const CREATE_ORDER = gql`
    mutation CreateOrder($input: CreateOrderInput!) {
        createOrder(input: $input) {
            id
            orderNumber
            email
            name
            address
            city
            postcode
            phone
            subtotal
            shippingCost
            vat
            total
            firstOrder
            discountCode {
                id
                code
            }
            createdAt
        }
    }
`;

export const UPDATE_ORDER = gql`
    mutation UpdateOrder($id: Int!, $input: UpdateOrderInput!) {
        updateOrder(id: $id, input: $input) {
            id
            orderNumber
            name
            email
            address
            city
            postcode
            phone
            shippingCost
            subtotal
            vat
            total
            status
            trackingNumber
            trackingProvider
            discountCode {
                id
                code
            }
            createdAt
            updatedAt
        }
    }
`;

export const GET_ALL_STATUS = gql`
    query GetAllStatus {
        getAllStatus {
            id
            value
            label
        }
    }
`;

export const CREATE_ORDER_STATUS = gql`
    mutation createStatus($value: String!, $label: String!) {
        createStatus(value: $value, label: $label) {
            id
            value
            label
        }
    }
`;

export const UPDATE_ORDER_STATUS = gql`
    mutation updateOrderStatus($id: Int!, $value: String!, $label: String!) {
        updateOrderStatus(id: $id, value: $value, label: $label) {
            id
            value
            label
        }
    }
`;

export const DELETE_ORDER_STATUS = gql`
    mutation DeleteOrderStatus($id: Int!) {
        deleteOrderStatus(id: $id) {
            success
            message
        }
    }
`;
