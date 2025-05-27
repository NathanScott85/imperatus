import { gql } from '@apollo/client';

export const GET_APPLICATION_SETTINGS = gql`
    query GetApplicationSettings {
        getApplicationSettings {
            comingSoon
            maintenance
        }
    }
`;

export const UPDATE_APPLICATION_SETTINGS = gql`
    mutation UpdateApplicationSettings(
        $comingSoon: Boolean
        $maintenance: Boolean
    ) {
        updateApplicationSettings(
            comingSoon: $comingSoon
            maintenance: $maintenance
        ) {
            comingSoon
            maintenance
        }
    }
`;
