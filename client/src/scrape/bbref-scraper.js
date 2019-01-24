import rp from 'request-promise'
import $ from 'cheerio'
import _ from 'lodash'
import moment from 'moment'

//region Teams
export const getTeams = async () => {
  return rp(`https://www.basketball-reference.com/teams/`)
    .then(function(html){
      const teams = [];

      $('#teams_active tr.full_table a', html).each(function (i, h) {
        const row = $(h);
        const scrapedTeam = {
          name: row.text(),
          bbref_id: getTeamName(row.attr("href"))
        }

        teams.push(scrapedTeam);
      });

      return teams;

    })
    .catch(function (err) {
      console.log(err)
    })
}

const coearceBbrefId = (bbref_id) => {
  switch (bbref_id) {
    case 'CHO':
      return 'CHA';
    case 'BRK':
      return 'NJN';
    case 'NOP':
      return 'NOH';
    default:
      return bbref_id;
  }
}

const getTeamName = (source) =>{
  let teamName = '';

  const re = /\/teams\/(.+)\//;
  const matches = re.exec(source);
  if(matches != null && matches.length === 2){
    teamName = matches[1];
  }

  return coearceBbrefId(teamName);
}
//endregion

//region Seasons
export const getSeasons = async (count) => {
  return rp(`https://www.basketball-reference.com/leagues/`)
    .then(function(html){
      const seasons = [];

      $('#stats th[data-stat="season"] > a', html).each(function (i, h) {

        if(seasons.length < count) {
          const row = $(h);
          const scrapedSeason = {
            year: getSeasonYear(row.attr("href"))
          }

          seasons.push(scrapedSeason);
        }
      });

      return seasons;
    })
    .catch(function (err) {
      console.log(err)
    })
}

const getSeasonYear = (source) =>{
  let seasonYear = '';

  const re = /\/leagues\/NBA_(.+)\.html/;
  const matches = re.exec(source);
  if(matches != null && matches.length === 2){
    seasonYear = parseInt(matches[1]);
  }

  return seasonYear;
}
//endregion

//region Games
export const scrapeSeasons = async (seasons, teams, addTestingProps = false) => {
  let games = []

  for(let i = 0; i < seasons.length; i++) {
    for (let j = 0; j < seasons[i].schedule_urls.length; j++) {
      games = _.concat(games, (await scrapeSeasonMonth(seasons[i].schedule_urls[j], teams, addTestingProps)).games);
    }
  }

  return games;
};

export const scrapeSeason = async (season, teams, addTestingProps = false) => {
  let games = []

  for(let i = 0; i < season.schedule_urls.length; i++){
    games = _.concat(games, (await scrapeSeasonMonth(season.schedule_urls[i], teams, addTestingProps)).games);
  }

  return games;
};

export const scrapeSeasonMonth = async (url, teams, addTestingProps = false) => {
  const response = {
    games: []
  }

  let el = {};
  const monthDisplay = getMonthDisplay(url);

  process.stdout.write(`Scraping games from ${monthDisplay}...`);

  const game_bbref_ids = await rp(url)
    .then(function(html) {
      const bbref_ids = [];

      $("#schedule > tbody > tr > th", html).each(function (i, h) {
        el = $(h);
        bbref_ids.push(el.attr("csk"));
      });

      return bbref_ids;
    })
    .catch(function (err) {
      console.log(err)
    });

  response.games = [];

  if (typeof (game_bbref_ids) != 'undefined') {
    const gamePromises = [];

    game_bbref_ids.forEach(function(bbref_id) {
      gamePromises.push(getGame(bbref_id, teams));
    });

    response.games = await Promise.all(gamePromises);
    response.games = _.filter(response.games, function(g) {
      return g != null;
    });
  }

  if (addTestingProps) {
    response.games_length = response.games.length;
  }

  process.stdout.write(`finished.\n`);

  return response;
}

export const getGame = async (id, teams, addTestingProps = false) => {
  return rp(`https://www.basketball-reference.com/boxscores/pbp/${id}.html`)
    .then(function(html){
      let game = {};
      const metaElements = $(".scorebox_meta > div", html);
      const dateElement = metaElements.first();

      const gameDateString = getGameDate(dateElement.text());
      const today = moment();
      const gameDate = moment(gameDateString);

      if(!gameDate.isBefore(today, 'day')){
        return null;
      }

      const teamElements = $('.scorebox [itemprop="performer"] [itemprop="name"]', html);
      const awayTeamNode = teamElements.first();
      const homeTeamNode = teamElements.last();

      const awayTeamBbrefId = getTeamName(awayTeamNode.attr("href"));
      const homeTeamBbrefId = getTeamName(homeTeamNode.attr("href"));

      const awayTeam = _.find(teams, { 'bbref_id': awayTeamBbrefId });

      if(typeof (awayTeam) == 'undefined'){
        console.log(awayTeamBbrefId)
      }

      const homeTeam = _.find(teams, { 'bbref_id': homeTeamBbrefId });

      if(typeof (homeTeam) == 'undefined'){
        console.log(homeTeamBbrefId)
      }

      game.bbref_id = id;
      game.awayTeamId = parseInt(awayTeam.id);
      game.homeTeamId = parseInt(homeTeam.id);
      game.date = getGameDate(dateElement.text());

      let currentQuarter = 0;
      let currentMinute = 0;
      let tempMinute = 0;
      let row = {};
      let away_score = 0;
      let home_score = 0;
      let play_away_score = 0;
      let play_home_score = 0;
      let playScoreColumns = [];
      let away_margin = 0;
      let home_margin = 0;
      let time = '';
      let currentScoreBar = null;

      game.plays = [];
      game.scoreBars = [];

      $("#pbp tr", html).each(function (i, h) {
        row = $(h);
        currentQuarter += getQuarterIncrement(row);

        if(row.children('td').length == 6) {
          time = $(row.children()[0]).text();
          tempMinute = getMinuteBucket(currentQuarter, time);

          if(tempMinute != currentMinute){
            currentMinute = tempMinute;

            if(currentScoreBar != null){
              game.scoreBars.push(Object.assign({}, currentScoreBar));

              currentScoreBar = {
                bar_number: currentMinute,
                away_open: currentScoreBar.away_close,
                away_high: currentScoreBar.away_close,
                away_low: currentScoreBar.away_close,
                away_close: currentScoreBar.away_close,
                away_volume: 0,
                home_open: currentScoreBar.home_close,
                home_high: currentScoreBar.home_close,
                home_low: currentScoreBar.home_close,
                home_close: currentScoreBar.home_close,
                home_volume: 0,
                volume: 0
              };
            }
            else {
              currentScoreBar = {
                bar_number: currentMinute,
                away_open: 0,
                away_high: 0,
                away_low: 0,
                away_close: 0,
                away_volume: 0,
                home_open: 0,
                home_high: 0,
                home_low: 0,
                home_close: 0,
                home_volume: 0,
                volume: 0
              };
            }
          }

          playScoreColumns = row.children('.bbr-play-score');

          if (playScoreColumns.length === 2) {
            //region Play
            play_away_score = getScore($(playScoreColumns[1]).text());
            play_home_score = getScore($(playScoreColumns[0]).text());
            away_score += play_away_score;
            home_score += play_home_score;

            game.plays.push({
              idx: game.plays.length,
              play_away_score: play_away_score,
              play_home_score: play_home_score,
              away_score: away_score,
              home_score: home_score,
              minute: currentMinute,
              second: getSeconds(time)
            });
            //endregion

            //region ScoreBar
            away_margin = away_score - home_score;
            home_margin = home_score - away_score;
            
            updateScoreBar(currentScoreBar, 'away', away_margin, play_away_score);
            updateScoreBar(currentScoreBar, 'home', home_margin, play_home_score);
            //endregion
          }
        }

      });

      game.scoreBars.push(Object.assign({}, currentScoreBar));

      game.away_score = away_score;
      game.home_score = home_score;

      if(addTestingProps) {
        game.plays_length = game.plays.length;
        game.play = game.plays[1];
        game.scoreBars_length = game.scoreBars.length;
        game.scoreBar = game.scoreBars[1];
      }

      return game;
    })
    .catch(function (err) {
      //console.log(`https://www.basketball-reference.com/boxscores/pbp/${id}.html`);
    })
}

const updateScoreBar = (scoreBar, prefix, margin, volume) => {
  const high_prop_name = `${prefix}_high`;
  const low_prop_name = `${prefix}_low`;
  const close_prop_name = `${prefix}_close`;
  const volume_prop_name = `${prefix}_volume`;

  const high = scoreBar[high_prop_name];
  const low = scoreBar[low_prop_name];

  if(margin > high){
    scoreBar[high_prop_name] = margin;
  }
  else if(margin < low){
    scoreBar[low_prop_name] = margin;
  }

  scoreBar[close_prop_name] = margin
  scoreBar[volume_prop_name] += volume;
  scoreBar.volume += volume;
}

const getScore = (source) => {
  let score = 0;

  if(!isNaN(source)){
    score = parseInt(source);
  }

  return score;
}

const getMinuteBucket = (currentQuarter, time) => {
  const quarterLength = 12;
  const overtimeLength = 12;
  let minuteBucket = 0;
  let quarterOffset = 0;
  const timeSplit = time.split(":");

  if(currentQuarter <= 4){
    quarterOffset = (currentQuarter - 1) * quarterLength;
    minuteBucket = quarterOffset + (quarterLength - parseInt(timeSplit[0]));
  }
  else {
    quarterOffset = (quarterLength * 4) + ((currentQuarter - 5) * overtimeLength);
    minuteBucket = quarterOffset + (overtimeLength - parseInt(timeSplit[0]));
  }

  return minuteBucket;
}

const getQuarterIncrement = (row) => {
  let increment = 0;
  const rowId = row.attr('id');

  if(row.hasClass("thead") && typeof(rowId) != 'undefined' && rowId != null &&
      (rowId == 'q1'
      || rowId == 'q2'
      || rowId == 'q3'
      || rowId == 'q4'
      || rowId == 'q5'
      || rowId == 'q6'
      || rowId == 'q7'
      || rowId == 'q8')){
    increment = 1;
  }

  return increment;
}

const getSeconds = (source) => {
  let seconds = 0;

  const re = /\d+:(\d+)\.\d+/;
  const matches = re.exec(source);
  if(matches != null && matches.length === 2){
    seconds = 60 - parseInt(matches[1]);
  }

  return seconds;
}

const getGameDate = (source) => {
  const date = moment(source, 'h:mm A, MMMM D, YYYY');
  return date.format();
}

const getMonthDisplay = (source) =>{
  let monthDisplay = '';

  const re = /.+NBA_(\d{4})_games-(.+)\.html/;
  const matches = re.exec(source);
  if(matches != null && matches.length === 3){
    let year = parseInt(matches[1]);

    switch (matches[2]) {
      case 'october':
      case 'november':
      case 'december':
        year -= 1;
        break;
    }

    monthDisplay = `${_.capitalize(matches[2])} ${year}`;
  }

  return monthDisplay;
}
//endregion