import { gql } from '@apollo/client';

export const DELETE_USER_MUTATION = gql`
    mutation DeleteUser($id: Int!) {
        deleteUser(id: $id) {
            message
        }
    }
`;
