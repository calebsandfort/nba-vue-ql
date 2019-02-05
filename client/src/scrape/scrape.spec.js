import moment from 'moment'
import { getClient } from '../api/apollo-client-factory'
import { expect, use } from "chai";
import chaiExclude from 'chai-exclude';
import * as teamApi from "../api/team";
import * as seasonApi from "../api/season";
import * as seasonMonthApi from "../api/seasonMonth";
import * as gameApi from "../api/game";
import * as teamSeasonApi from "../api/teamSeason";
import * as teamSeasonMonthApi from "../api/teamSeasonMonth";
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

  // it("scrapes NBA teams", async () => {
  //   const expectedResult = 30;
  //   const response = await teamApi.getAll(client);
  //   let teams = response.data.teams;
  //
  //   if(teams.length == 0) {
  //     const scrapedTeams = await bbrefScraper.getTeams();
  //
  //
  //     teams = await teamApi.createFromList(client, scrapedTeams);
  //   }
  //
  //   expect(teams.length).to.eql(expectedResult);
  // });
  //
  // it("scrapes NBA seasons", async () => {
  //   const expectedResult = 5;
  //   const response = await seasonApi.getAll(client, seasonApi.getRequestVariables());
  //   let seasons = response.data.seasons;
  //
  //   if(seasons.length == 0) {
  //     const scrapedSeasons = await bbrefScraper.getSeasons(expectedResult);
  //     seasons = await seasonApi.createFromList(client, scrapedSeasons);
  //   }
  //
  //   expect(seasons.length).to.eql(expectedResult);
  // });
  //
  // it("scrapes NBA games", function(){
  //   if (teams.length > 0) {
  //     this.timeout(3 * 60 * 60 * 1000);
  //
  //     const seasonRequestVariables = seasonApi.getRequestVariables();
  //     seasonRequestVariables.includeMonths = true;
  //
  //     return seasonApi.getAll(client, seasonRequestVariables)
  //       .then(function(seasonsResponse) {
  //         return bbrefScraper.scrapeSeasons(seasonsResponse.data.seasons, teams, false);
  //       })
  //       .then(function(games) {
  //         return gameApi.createFromList(client, games);
  //       });
  //   }
  // });

  it("generates NBA team seasons", function(){
    if (teams.length > 0) {
      this.timeout(3 * 60 * 60 * 1000);

      const seasonRequestVariables = seasonApi.getRequestVariables();
      seasonRequestVariables.includeMonths = true;

      return seasonApi.getAll(client, seasonRequestVariables)
        .then(function(seasonsResponse) {

          const promises = [];
          let idx = 1;

          seasonsResponse.data.seasons.forEach(function(season) {
            teams.forEach(function(team) {
              promises.push(teamSeasonApi.create(client, {
                input: {
                  idx: idx,
                  seasonId: parseInt(season.id),
                  teamId: parseInt(team.id)
                }
              }));
            });

            idx += 1;
          });

          return Promise.all(promises);
        });
    }
  });

  it("generates NBA team season months", async () => {
    if (teams.length > 0) {

      const seasonMonthsResponse = await seasonMonthApi.getAll(client);

      let promises = [];
      let seasonMonth = {};
      let idx = 1;

      for(let i = 0; i < seasonMonthsResponse.data.seasonMonths.length; i++) {
        promises = [];
        seasonMonth = seasonMonthsResponse.data.seasonMonths[i];

        teams.forEach(function(team) {
          promises.push(teamSeasonMonthApi.create(client, {
            input: {
              idx: idx + 1,
              seasonMonthId: parseInt(seasonMonth.id),
              teamId: parseInt(team.id)
            }
          }));
        });

        await Promise.all(promises);
      }
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

  // it("scrapes an NBA game", async  () => {
  //
  //   if (teams.length > 0) {
  //     const expectedResult = {
  //       bbref_id: '201506040GSW',
  //       awayTeamId: parseInt(_.find(teams, { "bbref_id": "CLE" }).id),
  //       homeTeamId: parseInt(_.find(teams, { "bbref_id": "GSW" }).id),
  //       date: moment("9:00 PM, June 4, 2015", "h:mm A, MMMM D, YYYY").format(),
  //       away_score: 100,
  //       home_score: 108,
  //       is_playoff: true,
  //       away_win: false,
  //       home_win: true,
  //       seasonId: 1,
  //       seasonMonthId: 1
  //       // plays_length: 114,
  //       // play: {
  //       //   idx: 1,
  //       //   play_away_score: 2,
  //       //   play_home_score: 0,
  //       //   away_score: 4,
  //       //   home_score: 0,
  //       //   minute: 2,
  //       //   second: 12
  //       // },
  //       // scoreBars_length: 48,
  //       // scoreBar: {
  //       //   bar_number: 2,
  //       //   away_open: 2,
  //       //   away_high: 4,
  //       //   away_low: 1,
  //       //   away_close: 1,
  //       //   away_volume: 2,
  //       //   home_open: -2,
  //       //   home_high: -1,
  //       //   home_low: -4,
  //       //   home_close: -1,
  //       //   home_volume: 3,
  //       //   volume: 5
  //       // }
  //     };
  //
  //     const response = await bbrefScraper.getGame("201506040GSW", teams, {id: 1}, {id: 1}, false);
  //
  //     expect(response).excluding(['plays', 'scoreBars', 'play', 'scoreBar', 'plays_length', 'scoreBars_length']).to.eql(expectedResult);
  //   }
  // });

});