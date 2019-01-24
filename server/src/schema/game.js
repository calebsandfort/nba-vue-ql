import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    games(offset: Int, limit: Int, order: String): [Game!]
    game(id: ID!): Game
  }
  extend type Mutation {
    createGame(input: GameInput!): Game!
    updateGame(id: ID!, input: GameInput!): Game!
    deleteGame(id: ID!): Boolean!
  }
  type Game {
    id: ID!
    date: Date!
    bbref_id: String!
    away_score: Int!
    home_score: Int!
    bbref_url: String!
    awayTeam: Team!
    homeTeam: Team!
    plays: [Play]
    scoreBars: [ScoreBar]
  }
  input GameInput {
      date: Date!
      bbref_id: String!,
      away_score: Int!
      home_score: Int!
      awayTeamId: ID!,
      homeTeamId: ID!,
      plays: [PlayInput],
      scoreBars: [ScoreBarInput]
  }
`;