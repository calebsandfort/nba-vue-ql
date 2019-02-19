import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    scoreBars(offset: Int, limit: Int, order: String): [ScoreBar!]
    scoreBarsQueryable(query: EntityQuery): [ScoreBar!]
    scoreBar(id: ID!): ScoreBar
  }
  extend type Mutation {
    createScoreBar(input: ScoreBarInput!): ScoreBar!
    updateScoreBar(id: ID!, input: ScoreBarInput!): ScoreBar!
    deleteScoreBar(id: ID!): Boolean!
  }
  type ScoreBar {
    id: ID!
    bar_number: Int!
    away_open: Int!
    away_high: Int!
    away_low: Int!
    away_close: Int!
    away_volume: Int!
    home_open: Int!
    home_high: Int!
    home_low: Int!
    home_close: Int!
    home_volume: Int!
    volume: Int!
    game: Game!
  }
  input ScoreBarInput {
      bar_number: Int!
      away_open: Int!
      away_high: Int!
      away_low: Int!
      away_close: Int!
      away_volume: Int!
      home_open: Int!
      home_high: Int!
      home_low: Int!
      home_close: Int!
      home_volume: Int!
      volume: Int!
  }
`;