import {
    ApolloClient,
    InMemoryCache,
    ApolloLink,
    HttpLink,
} from '@apollo/client';

const isProduction = process.env.NODE_ENV === 'production';
const apiUri = isProduction
    ? 'https://your-production-api.com/graphql' // temporary for now
    : 'http://localhost:4000/graphql';

const credentialsPolicy = isProduction ? 'include' : 'same-origin';

const httpLink = new HttpLink({
    uri: apiUri,
    credentials: credentialsPolicy,
});

const authLink = new ApolloLink((operation, forward) => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

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
