const { gql } = require("apollo-server-express");

const typeDefs = gql`
type Query {
  getSingleUser: User
}
type User {
    _id: ID!
    username: String!
    email: String!
   password: String!
    savedPokemon: [Pokemon]
  }
  type Pokemon {
    pokemonId: ID!
    description: String
  }
  type Auth {
    token: ID!
    user: User
  }
  input PokemonInput {
    name: String
    description: String
    
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    savePokemon(pokemonData: PokemonInput!): User
    removePokemon(pokemonId: ID!): User
  }
`;

module.exports = typeDefs;
