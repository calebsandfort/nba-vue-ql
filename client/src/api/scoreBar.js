import { gql } from "apollo-boost";
import {errorHandler} from "./index";

export const fragments = {
  simple: gql`
    fragment SimpleScoreBar on ScoreBar{
        id
        bar_number,
        away_open,
        away_high,
        away_low,
        away_close,
        away_volume,
        home_open,
        home_high,
        home_low,
        home_close,
        home_volume,
        volume
    }
  `
}

const GET = gql`
    query ($id: ID!) {
        scoreBar(id: $id) {
            ...SimpleScoreBar
        }
    }
    ${fragments.simple}
`;

const GET_ALL = gql`
    query{
        scoreBars {
            ...SimpleScoreBar
        }
    }
    ${fragments.simple}
`;

const CREATE = gql`
    mutation ($input: ScoreBarInput!) {
        createScoreBar(input: $input)
        {
            ...SimpleScoreBar
        }
    }
    ${fragments.simple}
`;

const UPDATE = gql`
    mutation ($id: ID!, $input: ScoreBarInput!) {
        updateScoreBar(id: $id, input: $input)
        {
            ...SimpleScoreBar
        }
    }
    ${fragments.simple}
`;

const DELETE = gql`
    mutation ($id: ID!) {
        deleteScoreBar(id: $id)
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

export const deleteScoreBar = async (client, variables) =>
  client
    .mutate({
      mutation: DELETE,
      variables: variables
    })
    .catch(errorHandler);

export const createFromList = async (client, list) => {
  const scoreBars = [];

  for (let i = 0; i < list.length; i++) {
    scoreBars.push((await create(client, {
      input: list[i]
    })).data.createScoreBar);
  }

  return scoreBars;
};