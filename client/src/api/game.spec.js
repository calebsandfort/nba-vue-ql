import { expect } from "chai";
import _ from "lodash";
import moment from "moment";
import { getClient } from "./apollo-client-factory";
import * as gameApi from "./game";
import * as teamApi from "../api/team";

let client = null;
let gameID = '1';
let teams = [];

describe("games", () => {
  before("before games", async () => {
    client = getClient();
    teams = (await teamApi.getAll(client)).data.teams;
  });

  beforeEach(function() {
    this.timeout(2000);
  });

  // it("creates a game", async () => {
  //
  //   const awayTeam = _.find(teams, { 'bbref_id': 'BOS' });
  //   const homeTeam = _.find(teams, { 'bbref_id': 'CLE' });
  //
  //   const result = await gameApi.create(client, {
  //     input: {
  //       bbref_id: '201710170CLE',
  //       away_score: 100,
  //       home_score: 100,
  //       awayTeamId: parseInt(awayTeam.id),
  //       homeTeamId: parseInt(homeTeam.id),
  //       date: moment('8:01 PM, October 17, 2017', 'h:mm A, MMMM D, YYYY').format(),
  //       plays: [{
  //         idx: 1,
  //         away_score: 1,
  //         home_score: 1,
  //         play_away_score: 1,
  //         play_home_score: 1,
  //         minute: 1,
  //         second: 1,
  //       }],
  //       scoreBars: [{
  //         bar_number: 1,
  //         away_open: 1,
  //         away_high: 1,
  //         away_low: 1,
  //         away_close: 1,
  //         away_volume: 1,
  //         home_open: 1,
  //         home_high: 1,
  //         home_low: 1,
  //         home_close: 1,
  //         home_volume: 1,
  //         volume: 1,
  //       }]
  //     }
  //   });
  //
  //   gameID = result.data.createGame.id;
  //
  //   const expectedResult = {
  //     createGame: {
  //       "__typename": "Game",
  //       id: gameID,
  //       bbref_id: '201710170CLE',
  //       away_score: 100,
  //       home_score: 100,
  //       //date: moment('8:01 PM, October 17, 2017', 'h:mm A, MMMM D, YYYY').utc().format(),
  //       date: "2017-10-18T03:01:00.000Z",
  //       bbref_url: `https://www.basketball-reference.com/boxscores/pbp/201710170CLE.html`,
  //       awayTeam : {
  //         "__typename": "Team",
  //         id: awayTeam.id,
  //         name: awayTeam.name
  //       },
  //       homeTeam : {
  //         "__typename": "Team",
  //         id: homeTeam.id,
  //         name: homeTeam.name
  //       },
  //       plays: [{
  //         "__typename": "Play",
  //         idx: 1,
  //         away_score: 1,
  //         home_score: 1,
  //         play_away_score: 1,
  //         play_home_score: 1,
  //         minute: 1,
  //         second: 1,
  //       }],
  //       scoreBars: [{
  //         "__typename": "ScoreBar",
  //         bar_number: 1,
  //         away_open: 1,
  //         away_high: 1,
  //         away_low: 1,
  //         away_close: 1,
  //         away_volume: 1,
  //         home_open: 1,
  //         home_high: 1,
  //         home_low: 1,
  //         home_close: 1,
  //         home_volume: 1,
  //         volume: 1,
  //       }]
  //     }
  //   };
  //
  //   expect(result.data).to.eql(expectedResult);
  // });

  // it("returns a game when game can be found", async () => {
  //   const expectedResult = {
  //     game: {
  //       "__typename": "Game",
  //       id: gameID,
  //       name: "Vancouver Grizzlies",
  //       bbref_id: "CAN",
  //       bbref_logo_url: "https://d2p3bygnnzw9w3.cloudfront.net/req/201901091/tlogo/bbr/CAN.png",
  //       bbref_url: "https://www.basketball-reference.com/games/CAN/"
  //     }
  //   };
  //
  //   const result = await gameApi.get(client, { id: gameID });
  //
  //   expect(result.data).to.eql(expectedResult);
  // });
  //
  // it("returns null when game cannot be found", async () => {
  //   const expectedResult = {
  //     game: null
  //   };
  //
  //   const result = await gameApi.get(client, { id: "42" });
  //
  //   expect(result.data).to.eql(expectedResult);
  // });
  //
  // it("updates a game", async () => {
  //   const expectedResult = {
  //     updateGame: {
  //       "__typename": "Game",
  //       id: gameID,
  //       name: "Vancouver Grizzlies",
  //       bbref_id: "VAN",
  //       bbref_logo_url: "https://d2p3bygnnzw9w3.cloudfront.net/req/201901091/tlogo/bbr/VAN.png",
  //       bbref_url: "https://www.basketball-reference.com/games/VAN/"
  //     }
  //   };
  //
  //   const result = await gameApi.update(client, {
  //     id: gameID,
  //     input: {
  //       name: "Vancouver Grizzlies",
  //       bbref_id: "VAN"
  //     }
  //   });
  //
  //   expect(result.data).to.eql(expectedResult);
  // });
  //
  // it("deletes a game", async () => {
  //   const expectedResult = {
  //     deleteGame: true
  //   };
  //
  //   const result = await gameApi.deleteGame(client, {
  //     id: gameID
  //   });
  //
  //   expect(result.data).to.eql(expectedResult);
  // });
  //
  // it("returns a list of games", async () => {
  //   const expectedResult = 30;
  //
  //   const result = await gameApi.getAll(client);
  //
  //   expect(result.data.games.length).to.eql(expectedResult);
  // });
});