import  moment from 'moment';
import Sequelize from 'sequelize';
import _ from 'lodash';

export default {
  Query: {
    seasonMonths: async (parent, { offset = 0, limit = 0, order =  'idx ASC', seasonId = 0}, { models }) => {
      const params = {};

      if(limit > 0){
        params.offset = offset;
        params.limit = limit;
      }

      if(order != ''){
        params.order = Sequelize.literal(order);
      }

      if(seasonId > 0){
        params.where = {
          seasonId
        };
      }

      return await models.SeasonMonth.findAll(params);
    },

    seasonMonth: async (parent, { id }, { models }) => {
      return await models.SeasonMonth.findById(id);
    },
  },


  Mutation: {
    createSeasonMonth: async (
      parent,
      { input },
      { models },
    ) => {
      return await models.SeasonMonth.create(input);
    },

    updateSeasonMonth: async (parent, { id, input }, { models }) => {
      const seasonMonth = await models.SeasonMonth.findById(id);
      return await seasonMonth.update(input);
    },

    deleteSeasonMonth: async (parent, { id }, { models }) => {
      return await models.SeasonMonth.destroy({
        where: { id },
      });
    },
  },

  SeasonMonth: {
    bbref_url: (seasonMonth) => {
      let year = seasonMonth.year;
      switch (seasonMonth.month) {
        case 'October':
        case 'November':
        case 'December':
          year = seasonMonth.year + 1;
          break;
      }

      return `https://www.basketball-reference.com/leagues/NBA_${year}_games-${_.lowerCase(seasonMonth.month)}.html`
    },

    display: (seasonMonth) => `${moment(`01-${seasonMonth.month}-${seasonMonth.year}`, 'D-MMMM-YYYY').format("MMM YYYY")}`,

    season: async (seasonMonth, args, { models }) => {
      return await models.Season.findById(seasonMonth.seasonId);
    },

    games: async (seasonMonth, args, { models }) => {
      return await models.Game.findAll({
        where: {
          seasonMonthId: seasonMonth.id,
        },
      });
    },
    teamSeasonMonth: async (seasonMonth, {teamId}, { models }) => {
      return await models.TeamSeasonMonth.findOne({
        where: {
          teamId,
          seasonMonthId: seasonMonth.id
        },
      });
    }

  },
};