import { gql } from '@apollo/client';

export const UPDATE_USER_ADDRESS = gql`
    mutation UpdateUserAddress(
        $id: Int!
        $phone: String
        $address: String
        $city: String
        $postcode: String
    ) {
        updateUserAddress(
            id: $id
            phone: $phone
            address: $address
            city: $city
            postcode: $postcode
        ) {
            id
            phone
            address
            city
            postcode
        }
    }
`;
