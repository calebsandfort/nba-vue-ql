import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    games(offset: Int, limit: Int, order: String): [Game!]
    gamesQueryable(query: EntityQuery): [Game!]
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
    is_playoff: Boolean!
    away_win: Boolean!
    home_win: Boolean!
    bbref_url: String!
    awayTeam: Team!
    homeTeam: Team!
    plays: [Play]
    scoreBars: [ScoreBar]
    season: Season
    month: SeasonMonth
    team_win(teamId: ID!): Boolean
    team_home(teamId: ID!): Boolean
    result_score(teamId: ID!): String
    team_score(teamId: ID!): Int
    opponent(teamId: ID!): Team
    opponent_score(teamId: ID!): Int
  }
  input GameInput {
      date: Date!
      bbref_id: String!,
      away_score: Int!
      home_score: Int!
      is_playoff: Boolean!
      away_win: Boolean!
      home_win: Boolean!
      awayTeamId: ID!,
      homeTeamId: ID!,
      seasonId: ID!,
      seasonMonthId: ID!,
      plays: [PlayInput],
      scoreBars: [ScoreBarInput]
  }
`;