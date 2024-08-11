import { gql } from '@apollo/client';

export const CHANGE_PASSWORD_MUTATION = gql`
    mutation ChangeUserPassword(
        $id: Int!
        $newPassword: String!
        $oldPassword: String!
    ) {
        changeUserPassword(
            id: $id
            newPassword: $newPassword
            oldPassword: $oldPassword
        ) {
            message
        }
    }
`;
