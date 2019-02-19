import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    teamSeasonMonths(offset: Int, limit: Int, order: String): [TeamSeasonMonth!]
    teamSeasonMonthsQueryable(query: EntityQuery): [TeamSeasonMonth!]
    teamSeasonMonth(id: ID!): TeamSeasonMonth
  }
  extend type Mutation {
    createTeamSeasonMonth(input: TeamSeasonMonthInput!): TeamSeasonMonth!
    updateTeamSeasonMonth(id: ID!, input: TeamSeasonMonthInput!): TeamSeasonMonth!
    deleteTeamSeasonMonth(id: ID!): Boolean!
  }
  type TeamSeasonMonth {
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
    seasonMonth: SeasonMonth
  }
  input TeamSeasonMonthInput {
      idx: Int!
      teamId: Int!
      seasonMonthId: Int!
  }
`;