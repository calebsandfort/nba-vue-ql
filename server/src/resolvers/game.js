import Sequelize from "sequelize";

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
    plays: async (game, args, { models }) => {
      return await models.Play.findAll({
        where: {
          gameId: game.id,
        },
      });
    },
    scoreBars: async (game, args, { models }) => {
      return await models.ScoreBar.findAll({
        where: {
          gameId: game.id,
        },
      });
    }
  },
};