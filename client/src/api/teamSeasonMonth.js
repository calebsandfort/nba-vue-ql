import { gql } from "apollo-boost";
import {errorHandler} from "./index";

export const fragments = {
  simple: gql`
    fragment SimpleTeamSeasonMonth on TeamSeasonMonth{
        id
        reg_wins
        reg_losses,
        playoff_wins,
        playoff_losses,
        reg_record,
        playoff_record
    }
  `
}

const GET = gql`
    query ($id: ID!) {
        teamSeasonMonth(id: $id) {
            ...SimpleTeamSeasonMonth
        }
    }
    ${fragments.simple}
`;

const GET_ALL = gql`
    query{
        teamSeasonMonths {
            ...SimpleTeamSeasonMonth
        }
    }
    ${fragments.simple}
`;

const CREATE = gql`
    mutation ($input: TeamSeasonMonthInput!) {
        createTeamSeasonMonth(input: $input)
        {
            ...SimpleTeamSeasonMonth
        }
    }
    ${fragments.simple}
`;

const UPDATE = gql`
    mutation ($id: ID!, $input: TeamSeasonMonthInput!) {
        updateTeamSeasonMonth(id: $id, input: $input)
        {
            ...SimpleTeamSeasonMonth
        }
    }
    ${fragments.simple}
`;

const DELETE = gql`
    mutation ($id: ID!) {
        deleteTeamSeasonMonth(id: $id)
    }
`;

export const get = async (client, variables) =>
  client
    .query({
      query: GET,
      variables: variables
    })
    .catch(errorHandler);

export const getAll = async (client) =>
  client
    .query({
      query: GET_ALL
    })
    .catch(errorHandler);

export const create = async (client, variables) =>
  client
    .mutate({
      mutation: CREATE,
      variables: variables
    })
    .catch(errorHandler);

export const update = async (client, variables) =>
  client
    .mutate({
      mutation: UPDATE,
      variables: variables
    })
    .catch(errorHandler);

export const deleteTeamSeasonMonth = async (client, variables) =>
  client
    .mutate({
      mutation: DELETE,
      variables: variables
    })
    .catch(errorHandler);

export const createFromList = async (client, list) => {
  const teamSeasonMonths = [];

  for (let i = 0; i < list.length; i++) {
    teamSeasonMonths.push((await create(client, {
      input: list[i]
    })).data.createTeamSeasonMonth);
  }

  return teamSeasonMonths;
};