import { gql } from '@apollo/client';

export const CREATE_STRIPE_PAYMENT_INTENT = gql`
    mutation CreateStripePaymentIntent(
        $input: CreateStripePaymentIntentInput!
    ) {
        createStripePaymentIntent(input: $input) {
            clientSecret
        }
    }
`;
