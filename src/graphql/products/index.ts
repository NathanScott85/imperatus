import { gql } from '@apollo/client';

export const GET_ALL_PRODUCTS = gql`
    query GetProducts($page: Int, $limit: Int) {
        products(page: $page, limit: $limit) {
            products {
                id
                name
                price
                category {
                    name
                }
                stock {
                    amount
                    instock
                    soldout
                }
            }
            totalCount
            totalPages
            currentPage
        }
    }
`;
