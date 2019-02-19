import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    seasonMonths(offset: Int, limit: Int, order: String, seasonId: Int): [SeasonMonth!]
    seasonMonthsQueryable(query: EntityQuery): [SeasonMonth!]
    seasonMonth(id: ID!): SeasonMonth
  }
  extend type Mutation {
    createSeasonMonth(input: SeasonMonthInput!): SeasonMonth!
    updateSeasonMonth(id: ID!, input: SeasonMonthInput!): SeasonMonth!
    deleteSeasonMonth(id: ID!): Boolean!
  }
  type SeasonMonth {
    id: ID!
    year: Int!
    month: String!
    idx: Int!
    bbref_url: String!
    display: String!
    season: Season
    games: [Game]
    teamSeasonMonth(teamId: Int!, teamId: Int!): TeamSeasonMonth
  }
  input SeasonMonthInput {
      year: Int!
      month: String!
      idx: Int!
  }
`;