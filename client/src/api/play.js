import { gql } from "apollo-boost";
import {errorHandler} from "./index";

export const fragments = {
  simple: gql`
    fragment SimplePlay on Play{
        id
        idx,
        away_score,
        home_score,
        play_away_score,
        play_home_score,
        minute,
        second
    }
  `
}

const GET = gql`
    query ($id: ID!) {
        play(id: $id) {
            ...SimplePlay
        }
    }
    ${fragments.simple}
`;

const GET_ALL = gql`
    query{
        plays {
            ...SimplePlay
        }
    }
    ${fragments.simple}
`;

const CREATE = gql`
    mutation ($input: PlayInput!) {
        createPlay(input: $input)
        {
            ...SimplePlay
        }
    }
    ${fragments.simple}
`;

const UPDATE = gql`
    mutation ($id: ID!, $input: PlayInput!) {
        updatePlay(id: $id, input: $input)
        {
            ...SimplePlay
        }
    }
    ${fragments.simple}
`;

const DELETE = gql`
    mutation ($id: ID!) {
        deletePlay(id: $id)
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

export const deletePlay = async (client, variables) =>
  client
    .mutate({
      mutation: DELETE,
      variables: variables
    })
    .catch(errorHandler);

export const createFromList = async (client, list) => {
  const plays = [];

  for (let i = 0; i < list.length; i++) {
    plays.push((await create(client, {
      input: list[i]
    })).data.createPlay);
  }

  return plays;
};