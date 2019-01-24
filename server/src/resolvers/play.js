import Sequelize from "sequelize";

export default {
  Query: {
    plays: async (parent, { offset = 0, limit = 0, order =  'idx ASC'}, { models }) => {
      const params = {};

      if(limit > 0){
        params.offset = offset;
        params.limit = limit;
      }

      if(order != ''){
        params.order = Sequelize.literal(order);
      }

      return await models.Play.findAll(params);
    },
    play: async (parent, { id }, { models }) => {
      return await models.Play.findById(id);
    },
  },

  Mutation: {
    createPlay: async (
      parent,
      { input },
      { models },
    ) => {
      return await models.Play.create(input);
    },

    updatePlay: async (parent, { id, input }, { models }) => {
      const play = await models.Play.findById(id);
      return await play.update(input);
    },

    deletePlay: async (parent, { id }, { models }) => {
      return await models.Play.destroy({
        where: { id },
      });
    },
  },

  Play: {
    game: async (play, args, { models }) => {
      return await models.Game.findById(play.gameId);
    }
  },
};