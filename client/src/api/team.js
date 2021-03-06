import { gql } from "apollo-boost";
import {errorHandler} from "./index";

export const fragments = {
  simple: gql`
    fragment SimpleTeam on Team{
        id
        name
        bbref_id,
        bbref_url,
        bbref_logo_url
    }
  `
}

const GET = gql`
    query ($id: ID!) {
        team(id: $id) {
            ...SimpleTeam
        }
    }
    ${fragments.simple}
`;

const GET_ALL = gql`
    query{
        teams {
            ...SimpleTeam
        }
    }
    ${fragments.simple}
`;

const CREATE = gql`
    mutation ($input: TeamInput!) {
        createTeam(input: $input)
        {
            ...SimpleTeam
        }
    }
    ${fragments.simple}
`;

const UPDATE = gql`
    mutation ($id: ID!, $input: TeamInput!) {
        updateTeam(id: $id, input: $input)
        {
            ...SimpleTeam
        }
    }
    ${fragments.simple}
`;

const DELETE = gql`
    mutation ($id: ID!) {
        deleteTeam(id: $id)
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

export const deleteTeam = async (client, variables) =>
  client
    .mutate({
      mutation: DELETE,
      variables: variables
    })
    .catch(errorHandler);

export const createFromList = async (client, list) => {
  const teams = [];

  for (let i = 0; i < list.length; i++) {
    teams.push((await create(client, {
      input: list[i]
    })).data.createTeam);
  }

  return teams;
};