import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    seasons(offset: Int, limit: Int, order: String): [Season!]
    seasonsQueryable(query: EntityQuery): [Season!]
    season(id: ID!): Season
  }
  extend type Mutation {
    createSeason(input: SeasonInput!): Season!
    updateSeason(id: ID!, input: SeasonInput!): Season!
    deleteSeason(id: ID!): Boolean!
  }
  type Season {
    id: ID!
    year: Int!
    previous_year: Int!
    bbref_url: String!
    display: String!
    schedule_urls: [String!]!
    months(order: String): [SeasonMonth]
    games: [Game]
    teamSeason(teamId: Int!): TeamSeason
  }
  input SeasonInput {
      year: Int!
      months: [SeasonMonthInput]
  }
`;