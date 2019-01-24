import { gql } from "apollo-boost";
import { getGame } from "../scrape/bbref-scraper";
import _ from 'lodash';

const GET = gql`
    query ($id: ID!) {
        game(id: $id) {
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

const GET_ALL = gql`
    query{
        games {
            id,
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

export const deleteGame = async (client, variables) =>
  client
    .mutate({
      mutation: DELETE,
      variables: variables
    });

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