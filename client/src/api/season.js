import { gql } from "apollo-boost";
import {errorHandler} from "./index";
import { fragments as seasonMonthFragments } from "./seasonMonth";
import { fragments as teamSeasonFragments } from "./teamSeason";

export const fragments = {
  simple: gql`
      fragment SimpleSeason on Season{
          id
          year,
          previous_year
          bbref_url,
          display,
          schedule_urls
      }
  `
}

const GET = gql`
    query ($id: ID!) {
        season(id: $id) {
            ...SimpleSeason
        }
    }
    ${fragments.simple}
`;

const GET_ALL = gql`
    query ($includeMonths: Boolean!, $includeTeamSeasons: Boolean!, $teamId: Int!){
        seasons {
            ...SimpleSeason
            months @include(if: $includeMonths) {
                ...SimpleSeasonMonth
            }
            teamSeason(teamId: $teamId) @include(if: $includeTeamSeasons) {
                ...SimpleTeamSeason
            }
        }
    }
    ${fragments.simple}
    ${seasonMonthFragments.simple}
    ${teamSeasonFragments.simple}
`;

const CREATE = gql`
    mutation ($input: SeasonInput!) {
        createSeason(input: $input)
        {
            ...SimpleSeason
        }
    }
    ${fragments.simple}
`;

const UPDATE = gql`
    mutation ($id: ID!, $input: SeasonInput!) {
        updateSeason(id: $id, input: $input)
        {
            ...SimpleSeason
        }
    }
    ${fragments.simple}
`;

const DELETE = gql`
    mutation ($id: ID!) {
        deleteSeason(id: $id)
    }
`;

export const getRequestVariables = () => {
  return {
    id: 0,
    includeMonths: false,
    includeTeamSeasons: false,
    teamId: 0
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
    })
    .catch(errorHandler);

export const deleteSeason = async (client, variables) =>
  client
    .mutate({
      mutation: DELETE,
      variables: variables
    })
    .catch(errorHandler);

export const createFromList = async (client, list) => {
  const seasons = [];

  for (let i = 0; i < list.length; i++) {
    seasons.push((await create(client, {
      input: list[i]
    })).data.createSeason);
  }

  return seasons;
};