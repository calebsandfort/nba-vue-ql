import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    teamSeasons(offset: Int, limit: Int, order: String): [TeamSeason!]
    teamSeasonsQueryable(query: EntityQuery): [TeamSeason!]
    teamSeason(id: ID!): TeamSeason
  }
  extend type Mutation {
    createTeamSeason(input: TeamSeasonInput!): TeamSeason!
    updateTeamSeason(id: ID!, input: TeamSeasonInput!): TeamSeason!
    deleteTeamSeason(id: ID!): Boolean!
  }
  type TeamSeason {
    id: ID!
    idx: Int!
    reg_wins: Int!
    reg_losses: Int!
    playoff_wins: Int!
    playoff_losses: Int!
    display: String
    reg_record: String
    playoff_record: String
    team: Team
    season: Season
  }
  input TeamSeasonInput {
      idx: Int!
      teamId: Int!
      seasonId: Int!
  }
`;