import { gql } from '@apollo/client';

export const UPDATE_USER = gql`
    mutation UpdateUser(
        $id: Int!
        $fullname: String!
        $email: String!
        $dob: String!
    ) {
        updateUser(id: $id, fullname: $fullname, email: $email, dob: $dob) {
            id
            fullname
            email
            dob
        }
    }
`;
