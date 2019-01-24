import { gql } from "apollo-boost";

const GET = gql`
    query ($id: ID!) {
        season(id: $id) {
            id
            year,
            previous_year
            bbref_url,
            display,
            schedule_urls
        }
    }
`;

const GET_ALL = gql`
    query{
        seasons {
            id,
            year,
            previous_year
            bbref_url,
            display,
            schedule_urls
        }
    }
`;

const CREATE = gql`
    mutation ($input: SeasonInput!) {
        createSeason(input: $input)
        {
            id
            year,
            previous_year
            bbref_url,
            display,
            schedule_urls
        }
    }
`;

const UPDATE = gql`
    mutation ($id: ID!, $input: SeasonInput!) {
        updateSeason(id: $id, input: $input)
        {
            id
            year,
            previous_year
            bbref_url,
            display,
            schedule_urls
        }
    }
`;

const DELETE = gql`
    mutation ($id: ID!) {
        deleteSeason(id: $id)
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

export const create = async (client, variables) => {
  return client
    .mutate({
      mutation: CREATE,
      variables: variables
    });
}

export const update = async (client, variables) =>
  client
    .mutate({
      mutation: UPDATE,
      variables: variables
    });

export const deleteSeason = async (client, variables) =>
  client
    .mutate({
      mutation: DELETE,
      variables: variables
    });

export const createFromList = async (client, list) => {
  const seasons = [];

  for (let i = 0; i < list.length; i++) {
    seasons.push((await create(client, {
      input: list[i]
    })).data.createSeason);
  }

  return seasons;
};