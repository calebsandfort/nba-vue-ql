import Sequelize from 'sequelize';

export default {
  Query: {
    teams: async (parent, { offset = 0, limit = 0, order =  'name ASC'}, { models }) => {
      const params = {};

      if(limit > 0){
        params.offset = offset;
        params.limit = limit;
      }

      if(order != ''){
        params.order = Sequelize.literal(order);
      }

      return await models.Team.findAll(params);
    },
    team: async (parent, { id }, { models }) => {
      return await models.Team.findById(id);
    },
  },


  Mutation: {
    createTeam: async (
      parent,
      { input },
      { models },
    ) => {
      return await models.Team.create(input);
    },

    updateTeam: async (parent, { id, input }, { models }) => {
      const team = await models.Team.findById(id);
      return await team.update(input);
    },

    deleteTeam: async (parent, { id }, { models }) => {
      return await models.Team.destroy({
        where: { id },
      });
    },
  },

  Team: {
    bbref_url: (team) => `https://www.basketball-reference.com/teams/${team.bbref_id}/`,
    bbref_logo_url: (team) => `https://d2p3bygnnzw9w3.cloudfront.net/req/201901091/tlogo/bbr/${team.bbref_id}.png`,
    games: async (team, args, { models }) => {
      return await models.Game.findAll({
        where: {
          [Sequelize.Op.or]: [
            {
              homeTeamId: {
                [Sequelize.Op.eq]: team.id
              }
            },
            {
              awayTeamId: {
                [Sequelize.Op.eq]: team.id
              }
            }
          ]
        },
      });
    },
    homeGames: async (team, args, { models }) => {
      return await models.Game.findAll({
        where: {
          homeTeamId: team.id,
        },
      });
    },
    awayGames: async (team, args, { models }) => {
      return await models.Game.findAll({
        where: {
          awayTeamId: team.id,
        },
      });
    },
    teamSeasons: async (team, args, { models }) => {
      return await models.TeamSeason.findAll({
        where: {
          teamId: team.id,
        },
      });
    },
    teamSeasonMonths: async (team, args, { models }) => {
      return await models.TeamSeasonMonth.findAll({
        where: {
          teamId: team.id,
        },
      });
    }
  },
};