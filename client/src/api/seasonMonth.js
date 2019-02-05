import { gql } from "apollo-boost";
import {errorHandler} from "./index";
import { fragments as teamSeasonMonthFragments } from "./teamSeasonMonth";

export const fragments = {
  simple: gql`
    fragment SimpleSeasonMonth on SeasonMonth{
        id,
        idx,
        bbref_url,
        display,
        year,
        month
    }
  `
}

const GET = gql`
    query ($id: ID!) {
        seasonMonth(id: $id) {
            ...SimpleSeasonMonth
        }
    }
    ${fragments.simple}
`;

const GET_ALL = gql`
    query ($includeTeamSeasonMonths: Boolean!, $teamId: Int!, $seasonId: Int!){
        seasonMonths(seasonId: $seasonId) {
            ...SimpleSeasonMonth
            teamSeasonMonth(teamId: $teamId) @include(if: $includeTeamSeasonMonths) {
                ...SimpleTeamSeasonMonth
            }
        }
    }
    ${fragments.simple}
    ${teamSeasonMonthFragments.simple}
`;

const CREATE = gql`
    mutation ($input: SeasonMonthInput!) {
        createSeasonMonth(input: $input)
        {
            ...SimpleSeasonMonth
        }
    }
    ${fragments.simple}
`;

const UPDATE = gql`
    mutation ($id: ID!, $input: SeasonMonthInput!) {
        updateSeasonMonth(id: $id, input: $input)
        {
            ...SimpleSeasonMonth
        }
    }
    ${fragments.simple}
`;

const DELETE = gql`
    mutation ($id: ID!) {
        deleteSeasonMonth(id: $id)
    }
`;

export const getRequestVariables = () => {
  return {
    id: 0,
    includeTeamSeasonMonths: false,
    teamId: 0,
    seasonId: 0
  };
}

export const get = async (client, variables) =>
  client
    .query({
      query: GET,
      variables: variables
    })
    .catch(errorHandler);

export const getAll = async (client, variables) =>
  client
    .query({
      query: GET_ALL,
      variables: variables
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
    });

export const deleteSeasonMonth = async (client, variables) =>
  client
    .mutate({
      mutation: DELETE,
      variables: variables
    })
    .catch(errorHandler);

export const createFromList = async (client, list) => {
  const seasonMonths = [];

  for (let i = 0; i < list.length; i++) {
    seasonMonths.push((await create(client, {
      input: list[i]
    })).data.createSeasonMonth);
  }

  return seasonMonths;
};