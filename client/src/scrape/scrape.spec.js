import moment from 'moment'
import { getClient } from '../api/apollo-client-factory'
import { expect, use } from "chai";
import chaiExclude from 'chai-exclude';
import * as teamApi from "../api/team";
import * as seasonApi from "../api/season";
import * as gameApi from "../api/game";
import * as bbrefScraper from "./bbref-scraper";
import _ from "lodash";

use(chaiExclude);

let client = null;
let teams = [];

describe("scrape", () => {
  before("scrape", async () => {
    client = getClient();
    teams = (await teamApi.getAll(client)).data.teams;
  });

  it("scrapes NBA teams", async () => {
    const expectedResult = 30;
    const response = await teamApi.getAll(client);
    let teams = response.data.teams;

    if(teams.length == 0) {
      const scrapedTeams = await bbrefScraper.getTeams();


      teams = await teamApi.createFromList(client, scrapedTeams);
    }

    expect(teams.length).to.eql(expectedResult);
  });

  it("scrapes NBA seasons", async () => {
    const expectedResult = 5;
    const response = await seasonApi.getAll(client);
    let seasons = response.data.seasons;

    if(seasons.length == 0) {
      const scrapedSeasons = await bbrefScraper.getSeasons(expectedResult);
      seasons = await seasonApi.createFromList(client, scrapedSeasons);
    }

    expect(seasons.length).to.eql(expectedResult);
  });

  it("scrapes NBA games", function(){
    if (teams.length > 0) {
      this.timeout(60 * 60 * 1000);

      return seasonApi.getAll(client)
        .then(function(seasonsResponse) {
          return bbrefScraper.scrapeSeasons(seasonsResponse.data.seasons, teams, false);
        })
        .then(function(games) {
          return gameApi.createFromList(client, games);
        });
    }
  });

  // it("scrapes an NBA season's games", function(){
  //   if (teams.length > 0) {
  //     this.timeout(10 * 60 * 1000);
  //
  //     return seasonApi.getAll(client)
  //       .then(function(seasonsResponse) {
  //         return bbrefScraper.scrapeSeason(seasonsResponse.data.seasons[0], teams, false);
  //       })
  //       .then(function(scrapeResponse) {
  //         expect(scrapeResponse.length).to.eql(1311);
  //       });
  //   }
  // });

  // it("scrapes an NBA month's games", function(){
  //   if (teams.length > 0) {
  //     this.timeout(5 * 60 * 1000);
  //
  //     return bbrefScraper.scrapeSeasonMonth("https://www.basketball-reference.com/leagues/NBA_2019_games-october.html", teams, true)
  //       .then(function(response) {
  //         const expectedResult = {
  //                 games_length: 110
  //               };
  //
  //         expect(response).excluding(['games']).to.eql(expectedResult);
  //
  //         return gameApi.createFromList(client, response.games);
  //       })
  //       .then(function(games) {
  //         expect(games.length).to.eql(110);
  //       });
  //   }
  // });

  it("scrapes an NBA game", async  () => {

    if (teams.length > 0) {
      const expectedResult = {
        bbref_id: '201710170CLE',
        awayTeamId: parseInt(_.find(teams, { "bbref_id": "BOS" }).id),
        homeTeamId: parseInt(_.find(teams, { "bbref_id": "CLE" }).id),
        date: moment("8:01 PM, October 17, 2017", "h:mm A, MMMM D, YYYY").format(),
        away_score: 99,
        home_score: 102,
        plays_length: 114,
        play: {
          idx: 1,
          play_away_score: 2,
          play_home_score: 0,
          away_score: 4,
          home_score: 0,
          minute: 2,
          second: 12
        },
        scoreBars_length: 48,
        scoreBar: {
          bar_number: 2,
          away_open: 2,
          away_high: 4,
          away_low: 1,
          away_close: 1,
          away_volume: 2,
          home_open: -2,
          home_high: -1,
          home_low: -4,
          home_close: -1,
          home_volume: 3,
          volume: 5
        }
      };

      const response = await bbrefScraper.getGame("201710170CLE", teams, true);

      expect(response).excluding(['plays', 'scoreBars']).to.eql(expectedResult);
    }
  });

});