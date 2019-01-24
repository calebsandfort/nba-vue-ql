import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    plays(offset: Int, limit: Int, order: String): [Play!]
    play(id: ID!): Play
  }
  extend type Mutation {
    createPlay(input: PlayInput!): Play!
    updatePlay(id: ID!, input: PlayInput!): Play!
    deletePlay(id: ID!): Boolean!
  }
  type Play {
    id: ID!
    idx: Int!
    away_score: Int!
    home_score: Int!
    play_away_score: Int!
    play_home_score: Int!
    minute: Int!
    second: Int!
    game: Game!
  }
  input PlayInput {
      idx: Int!
      away_score: Int!
      home_score: Int!
      play_away_score: Int!
      play_home_score: Int!
      minute: Int!
      second: Int!
  }
`;