import  moment from 'moment';
import Sequelize from 'sequelize';

export default {
  Query: {
    seasons: async (parent, { offset = 0, limit = 0, order =  'year ASC'}, { models }) => {
      const params = {};

      if(limit > 0){
        params.offset = offset;
        params.limit = limit;
      }

      if(order != ''){
        params.order = Sequelize.literal(order);
      }

      return await models.Season.findAll(params);
    },

    season: async (parent, { id }, { models }) => {
      return await models.Season.findById(id);
    },
  },


  Mutation: {
    createSeason: async (
      parent,
      { input },
      { models },
    ) => {
      return await models.Season.create(input);
    },

    updateSeason: async (parent, { id, input }, { models }) => {
      const season = await models.Season.findById(id);
      return await season.update(input);
    },

    deleteSeason: async (parent, { id }, { models }) => {
      return await models.Season.destroy({
        where: { id },
      });
    },
  },

  Season: {
    previous_year: (season) => season.year - 1,
    bbref_url: (season) => `https://www.basketball-reference.com/leagues/NBA_${season.year}.html`,
    display: (season) => `${season.year - 1}-${moment("01-01-" + season.year).format("YY")}`,
    schedule_urls: (season) => [
      `https://www.basketball-reference.com/leagues/NBA_${season.year}_games-october.html`,
      `https://www.basketball-reference.com/leagues/NBA_${season.year}_games-november.html`,
      `https://www.basketball-reference.com/leagues/NBA_${season.year}_games-december.html`,
      `https://www.basketball-reference.com/leagues/NBA_${season.year}_games-january.html`,
      `https://www.basketball-reference.com/leagues/NBA_${season.year}_games-february.html`,
      `https://www.basketball-reference.com/leagues/NBA_${season.year}_games-march.html`,
      `https://www.basketball-reference.com/leagues/NBA_${season.year}_games-april.html`,
      `https://www.basketball-reference.com/leagues/NBA_${season.year}_games-may.html`,
      `https://www.basketball-reference.com/leagues/NBA_${season.year}_games-june.html`
    ]
  },
};