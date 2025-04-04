import { ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';

const apiUri =
    process.env.REACT_APP_API_URL || 'http://localhost:4000/graphql';

const isProduction = process.env.NODE_ENV === 'production';
const credentialsPolicy = isProduction ? 'include' : 'same-origin';

const httpLink = createUploadLink({
    uri: apiUri,
    credentials: credentialsPolicy,
    headers: {
        'x-apollo-operation-name': 'upload',
        'apollo-require-preflight': 'true',
    },
});

const authLink = new ApolloLink((operation, forward) => {
    const accessToken = sessionStorage.getItem('accessToken');
    const refreshToken = sessionStorage.getItem('refreshToken');

    operation.setContext({
        headers: {
            Authorization: accessToken ? `Bearer ${accessToken}` : '',
            'x-refresh-token': refreshToken || '',
        },
    });

    return forward(operation);
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});
