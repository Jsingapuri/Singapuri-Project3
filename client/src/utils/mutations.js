import { gql } from '@apollo/client';

export const USER_LOGIN = gql`
  mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user{
          username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
          username
          email
      }
    }
  }
`;
export const SAVE_POKEMON = gql`
  mutation savePokemon($pokemonData: pokemonInput!) {
    savePokemon(pokemonData: $pokemonData) {
      _id
      username
      email
      savedPokemon {
        bookId
        authors
        image
        link
        title
        description
      }
    }
  }
`;

export const REMOVE_POKEMON = gql`
  mutation removePokemon($pokemonId: ID!) {
    removePokemon(pokemonId: $pokemonId) {
      _id
      username
      email
      savedPokemon {
        bookId
        authors
        image
        description
        title
        link
      }
    }
  }
`;