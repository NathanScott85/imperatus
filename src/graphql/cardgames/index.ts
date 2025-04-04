import { gql } from '@apollo/client';

export const GET_CARDGAMES = gql`
  query GetAllCardGames {
    getAllCardGames {
        id
        name
        description
        category {
            id
            name
        }
        img {
            url
        }
    }
}
`;

export const GET_CARDGAME_BY_ID = gql`
    query CardGame($id: ID!) {
        cardGame(id: $id) {
            id
            name
            description
            category {
                id
                name
            }
            img {
                url
            }
        }
    }
`;

export const CREATE_CARDGAME = gql`
 mutation CreateCardGame($name: String!, $description: String!, $img: Upload!, $categoryId: Int!) {
    createCardGame(name: $name, description: $description, img: $img, categoryId: $categoryId) {
        id
        name
        description
        category {
            id
            name
        }
        img {
            url
        }
    }
}
`;

export const UPDATE_CARDGAME = gql`
  mutation UpdateCardGame($id: ID!, $name: String, $description: String, $img: Upload, $categoryId: Int) {
    updateCardGame(id: $id, name: $name, description: $description, img: $img, categoryId: $categoryId) {
        id
        name
        description
        category {
            id
            name
        }
        img {
            url
        }
    }
}
`;

export const DELETE_CARDGAME = gql`
mutation DeleteCardGame($id: ID!) {
    deleteCardGame(id: $id) {
        message
    }
}
`;
