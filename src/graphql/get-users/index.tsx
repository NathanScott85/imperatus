import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
    query GET_ALL_USERS($page: Int, $limit: Int, $search: String) {
        users(page: $page, limit: $limit, search: $search) {
            users {
                id
                fullname
                email
                dob
                phone
                address
                city
                postcode
                emailVerified
            }
            totalCount
            totalPages
            currentPage
        }
    }
`;
