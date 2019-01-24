import Sequelize from "sequelize";

export default {
  Query: {
    scoreBars: async (parent, { offset = 0, limit = 0, order =  'bar_number ASC'}, { models }) => {
      const params = {};

      if(limit > 0){
        params.offset = offset;
        params.limit = limit;
      }

      if(order != ''){
        params.order = Sequelize.literal(order);
      }

      return await models.ScoreBar.findAll(params);
    },
    scoreBar: async (parent, { id }, { models }) => {
      return await models.ScoreBar.findById(id);
    },
  },

  Mutation: {
    createScoreBar: async (
      parent,
      { input },
      { models },
    ) => {
      return await models.ScoreBar.create(input);
    },

    updateScoreBar: async (parent, { id, input }, { models }) => {
      const scoreBar = await models.ScoreBar.findById(id);
      return await scoreBar.update(input);
    },

    deleteScoreBar: async (parent, { id }, { models }) => {
      return await models.ScoreBar.destroy({
        where: { id },
      });
    },
  },

  ScoreBar: {
    game: async (scoreBar, args, { models }) => {
      return await models.Game.findById(scoreBar.gameId);
    }
  },
};