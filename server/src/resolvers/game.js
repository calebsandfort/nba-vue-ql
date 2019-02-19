import Sequelize from "sequelize";
import * as entityQuery from '../utilities/entityQuery';

export default {
  Query: {
    games: async (parent, { offset = 0, limit = 0, order =  'date ASC'}, { models }) => {
      const params = {};

      if(limit > 0){
        params.offset = offset;
        params.limit = limit;
      }

      if(order != ''){
        params.order = Sequelize.literal(order);
      }

      return await models.Game.findAll(params);
    },
    gamesQueryable: async (parent, {query}, { models }) => {
      const params = entityQuery.entityQueryToSequelize(query);
      return await models.Game.findAll(params);
    },
    game: async (parent, { id }, { models }) => {
      return await models.Game.findById(id);
    },
  },

  Mutation: {
    createGame: async (
      parent,
      { input },
      { models },
    ) => {
      const game = await models.Game.create(input);

      const collectionPromises = []
      
      if(typeof (input.plays) != 'undefined' && input.plays.length > 0){
        input.plays.forEach(function(play){
          play.gameId = game.id;
          collectionPromises.push(models.Play.create(play));
        });
      }

      if(typeof (input.scoreBars) != 'undefined' && input.scoreBars.length > 0){
        input.scoreBars.forEach(function(scoreBar){
          scoreBar.gameId = game.id;
          collectionPromises.push(models.ScoreBar.create(scoreBar));
        });
      }

      if(collectionPromises.length > 0) {
        await Promise.all(collectionPromises);
      }

      return game;
    },

    updateGame: async (parent, { id, input }, { models }) => {
      const game = await models.Game.findById(id);
      return await game.update(input);
    },

    deleteGame: async (parent, { id }, { models }) => {
      return await models.Game.destroy({
        where: { id },
      });
    },
  },

  Game: {
    bbref_url: (game) => `https://www.basketball-reference.com/boxscores/pbp/${game.bbref_id}.html`,
    awayTeam: async (game, args, { loaders }) => {
      return await loaders.team.load(game.awayTeamId);
    },
    homeTeam: async (game, args, { loaders }) => {
      return await loaders.team.load(game.homeTeamId);
    },
    season: async (game, args, { models }) => {
      return await models.Season.findById(game.seasonId);
    },
    month: async (game, args, { models }) => {
      return await models.SeasonMonth.findById(game.seasonMonthId);
    },
    plays: async (game, args, { models }) => {
      return await models.Play.findAll({
        where: {
          gameId: game.id,
        },
        order: Sequelize.literal('idx ASC')
      });
    },
    scoreBars: async (game, args, { models }) => {
      return await models.ScoreBar.findAll({
        where: {
          gameId: game.id,
        },
        order: Sequelize.literal('bar_number ASC')
      });
    },
    team_win: (game, {teamId}) => {
      return game.homeTeamId == teamId ? game.home_win : game.away_win;
    },
    team_home: (game, {teamId}) => {
      return game.homeTeamId == teamId;
    },
    result_score: (game, {teamId}) => {
      const firstScore = game.homeTeamId == teamId ? game.home_score : game.away_score;
      const secondScore = game.homeTeamId == teamId ? game.away_score : game.home_score;
      return `${firstScore} - ${secondScore}`;
    },
    opponent: async (game, {teamId}, {loaders}) => {
      const opponent_id = game.homeTeamId == teamId ? game.awayTeamId : game.homeTeamId;
      return await loaders.team.load(opponent_id);
    },
    team_score: (game, {teamId}) => {
      return game.homeTeamId == teamId ? game.home_score : game.away_score;
    },
    opponent_score: (game, {teamId}) => {
      return game.homeTeamId == teamId ? game.away_score : game.home_score;
    }
  },
};