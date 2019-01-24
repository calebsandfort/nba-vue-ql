import { gql } from "apollo-boost";

const GET = gql`
    query ($id: ID!) {
        team(id: $id) {
            id
            name
            bbref_id,
            bbref_url,
            bbref_logo_url
        }
    }
`;

const GET_ALL = gql`
    query{
        teams {
            id,
            name,
            bbref_id,
            bbref_url,
            bbref_logo_url
        }
    }
`;

const CREATE = gql`
    mutation ($input: TeamInput!) {
        createTeam(input: $input)
        {
            id
            name
            bbref_id,
            bbref_url,
            bbref_logo_url
        }
    }
`;

const UPDATE = gql`
    mutation ($id: ID!, $input: TeamInput!) {
        updateTeam(id: $id, input: $input)
        {
            id
            name
            bbref_id,
            bbref_url,
            bbref_logo_url
        }
    }
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
    });

export const getAll = async (client) =>
  client
    .query({
      query: GET_ALL
    });

export const create = async (client, variables) =>
  client
    .mutate({
      mutation: CREATE,
      variables: variables
    });

export const update = async (client, variables) =>
  client
    .mutate({
      mutation: UPDATE,
      variables: variables
    });

export const deleteTeam = async (client, variables) =>
  client
    .mutate({
      mutation: DELETE,
      variables: variables
    });

export const createFromList = async (client, list) => {
  const teams = [];

  for (let i = 0; i < list.length; i++) {
    teams.push((await create(client, {
      input: list[i]
    })).data.createTeam);
  }

  return teams;
};