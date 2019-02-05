import { gql } from "apollo-boost";
import {errorHandler} from "./index";

export const fragments = {
  simple: gql`
    fragment SimpleTeamSeason on TeamSeason{
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
        teamSeason(id: $id) {
            ...SimpleTeamSeason
        }
    }
    ${fragments.simple}
`;

const GET_ALL = gql`
    query{
        teamSeasons {
            ...SimpleTeamSeason
        }
    }
    ${fragments.simple}
`;

const CREATE = gql`
    mutation ($input: TeamSeasonInput!) {
        createTeamSeason(input: $input)
        {
            ...SimpleTeamSeason
        }
    }
    ${fragments.simple}
`;

const UPDATE = gql`
    mutation ($id: ID!, $input: TeamSeasonInput!) {
        updateTeamSeason(id: $id, input: $input)
        {
            ...SimpleTeamSeason
        }
    }
    ${fragments.simple}
`;

const DELETE = gql`
    mutation ($id: ID!) {
        deleteTeamSeason(id: $id)
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

export const deleteTeamSeason = async (client, variables) =>
  client
    .mutate({
      mutation: DELETE,
      variables: variables
    })
    .catch(errorHandler);

export const createFromList = async (client, list) => {
  const teamSeasons = [];

  for (let i = 0; i < list.length; i++) {
    teamSeasons.push((await create(client, {
      input: list[i]
    })).data.createTeamSeason);
  }

  return teamSeasons;
};