import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
    query GET_ALL_USERS {
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
    }
`;
