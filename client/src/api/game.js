import { gql } from "apollo-boost";
import {errorHandler} from "./index";
import { getGame } from "../scrape/bbref-scraper";
import _ from 'lodash';
import { fragments as playFragments } from "./play";
import { fragments as scoreBarFragments } from "./scoreBar";

export const fragments = {
    simple: gql`
        fragment SimpleGame on Game{
            id
            bbref_id,
            away_score,
            home_score,
            bbref_url,
            date,
            awayTeam {
                id,
                name
            },
            homeTeam {
                id,
                name
            }
        }
    `
}

const GET = gql`
    query ($id: ID!) {
        game(id: $id) {
            ...SimpleGame,
            plays {
                ...SimplePlay
            },
            scoreBars {
                ...SimpleScoreBar
            }
        }
    }
    ${fragments.simple}
    ${playFragments.simple}
    ${scoreBarFragments.simple}
`;

const GET_ALL = gql`
    query{
        games {
            ...SimpleGame,
            plays {
                ...SimplePlay
            },
            scoreBars {
                ...SimpleScoreBar
            }
        }
    }
    ${fragments.simple}
    ${playFragments.simple}
    ${scoreBarFragments.simple}
`;

const GET_ALL_QUERYABLE = gql`
    query ($includePlays: Boolean!, $includeScoreBars: Boolean!, $query: EntityQuery) {
        gamesQueryable(query: $query) {
            ...SimpleGame,
            plays @include(if: $includePlays) {
                ...SimplePlay
            },
            scoreBars @include(if: $includeScoreBars) {
                ...SimpleScoreBar
            }
        }
    }
    ${fragments.simple}
    ${playFragments.simple}
    ${scoreBarFragments.simple}
`;

const CREATE = gql`
    mutation ($input: GameInput!) {
        createGame(input: $input)
        {
            id
        }
    }
`;

const UPDATE = gql`
    mutation ($id: ID!, $input: GameInput!) {
        updateGame(id: $id, input: $input)
        {
            id
            bbref_id,
            away_score,
            home_score,
            bbref_url,
            date,
            awayTeam {
                id,
                name
            },
            homeTeam {
                id,
                name
            },
            plays {
                idx,
                away_score,
                home_score,
                play_away_score,
                play_home_score,
                minute,
                second
            },
            scoreBars {
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
        }
    }
`;

const DELETE = gql`
    mutation ($id: ID!) {
        deleteGame(id: $id)
    }
`;

export const getRequestVariables = () => {
    return {
        id: 0,
        includePlays: false,
        includeScoreBars: false,
        query: null
    };
}

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

export const getAllQueryable = async (client, variables) =>
  client
    .query({
        query: GET_ALL_QUERYABLE,
        variables: variables
    })
    .catch(errorHandler);

export const create = async (client, variables) => {
  return client
    .mutate({
      mutation: CREATE,
      variables: variables
    })
    .catch(errorHandler);
}

export const update = async (client, variables) =>
  client
    .mutate({
      mutation: UPDATE,
      variables: variables
    })
    .catch(errorHandler);

export const deleteGame = async (client, variables) =>
  client
    .mutate({
      mutation: DELETE,
      variables: variables
    })
    .catch(errorHandler);

export const createFromList = async (client, list) => {
    // const createPromises = _.map(list, function(item) {
    //     return create(client, { input: item });
    // });
    //
    // const createResponses = await Promise.all(createPromises);
    //
    // const games = _.map(createResponses, function(createResponse) {
    //     return createResponse.data.createGame;
    // });
    process.stdout.write(`Saving games`);

    const games = [];

    for (let i = 0; i < list.length; i++) {
        games.push((await create(client, { input: list[i] })).data.createGame);
        process.stdout.write(`.`);
    }

    process.stdout.write(`finished.\n`);

    return games;
};