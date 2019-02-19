import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    teams(offset: Int, limit: Int, order: String): [Team!]
    teamsQueryable(query: EntityQuery): [Team!]
    team(id: ID!): Team
  }
  extend type Mutation {
    createTeam(input: TeamInput!): Team!
    updateTeam(id: ID!, input: TeamInput!): Team!
    deleteTeam(id: ID!): Boolean!
  }
  type Team {
    id: ID!
    name: String!
    bbref_id: String!
    bbref_url: String!
    bbref_logo_url: String!
    games: [Game]
    homeGames: [Game]
    awayGames: [Game]
    teamSeasons: [TeamSeason]
    teamSeasonMonths: [TeamSeasonMonth]
  }
  input TeamInput {
      name: String
      bbref_id: String
  }
`;