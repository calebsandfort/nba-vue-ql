import  moment from 'moment';
import Sequelize from 'sequelize';
import _ from 'lodash';

export default {
  Query: {
    teamSeasons: async (parent, { offset = 0, limit = 0, order =  'idx ASC'}, { models }) => {
      const params = {};

      if(limit > 0){
        params.offset = offset;
        params.limit = limit;
      }

      if(order != ''){
        params.order = Sequelize.literal(order);
      }

      return await models.TeamSeason.findAll(params);
    },

    teamSeason: async (parent, { id }, { models }) => {
      return await models.TeamSeason.findById(id);
    },
  },


  Mutation: {
    createTeamSeason: async (
      parent,
      { input },
      { models },
    ) => {
      const teamSeason = Object.assign({}, input);

      //region reg_wins
      const reg_wins_query = {
        where: {
          [Sequelize.Op.or]: [
            {
              [Sequelize.Op.and]: [
                {
                  homeTeamId: {
                    [Sequelize.Op.eq]: input.teamId
                  }
                },
                {
                  seasonId: {
                    [Sequelize.Op.eq]: input.seasonId
                  }
                },
                {
                  is_playoff: {
                    [Sequelize.Op.eq]: false
                  }
                },
                {
                  home_win: {
                    [Sequelize.Op.eq]: true
                  }
                }
              ]
            },
            {
              [Sequelize.Op.and]: [
                {
                  awayTeamId: {
                    [Sequelize.Op.eq]: input.teamId
                  }
                },
                {
                  seasonId: {
                    [Sequelize.Op.eq]: input.seasonId
                  }
                },
                {
                  is_playoff: {
                    [Sequelize.Op.eq]: false
                  }
                },
                {
                  away_win: {
                    [Sequelize.Op.eq]: true
                  }
                }
              ]
            }
          ]
        }
      };
      
      teamSeason.reg_wins = await models.Game.count(reg_wins_query);
      //endregion

      //region reg_losses
      const reg_losses_query = {
        where: {
          [Sequelize.Op.or]: [
            {
              [Sequelize.Op.and]: [
                {
                  homeTeamId: {
                    [Sequelize.Op.eq]: input.teamId
                  }
                },
                {
                  seasonId: {
                    [Sequelize.Op.eq]: input.seasonId
                  }
                },
                {
                  is_playoff: {
                    [Sequelize.Op.eq]: false
                  }
                },
                {
                  away_win: {
                    [Sequelize.Op.eq]: true
                  }
                }
              ]
            },
            {
              [Sequelize.Op.and]: [
                {
                  awayTeamId: {
                    [Sequelize.Op.eq]: input.teamId
                  }
                },
                {
                  seasonId: {
                    [Sequelize.Op.eq]: input.seasonId
                  }
                },
                {
                  is_playoff: {
                    [Sequelize.Op.eq]: false
                  }
                },
                {
                  home_win: {
                    [Sequelize.Op.eq]: true
                  }
                }
              ]
            }
          ]
        }
      };

      teamSeason.reg_losses = await models.Game.count(reg_losses_query);
      //endregion

      //region playoff_wins
      const playoff_wins_query = {
        where: {
          [Sequelize.Op.or]: [
            {
              [Sequelize.Op.and]: [
                {
                  homeTeamId: {
                    [Sequelize.Op.eq]: input.teamId
                  }
                },
                {
                  seasonId: {
                    [Sequelize.Op.eq]: input.seasonId
                  }
                },
                {
                  is_playoff: {
                    [Sequelize.Op.eq]: true
                  }
                },
                {
                  home_win: {
                    [Sequelize.Op.eq]: true
                  }
                }
              ]
            },
            {
              [Sequelize.Op.and]: [
                {
                  awayTeamId: {
                    [Sequelize.Op.eq]: input.teamId
                  }
                },
                {
                  seasonId: {
                    [Sequelize.Op.eq]: input.seasonId
                  }
                },
                {
                  is_playoff: {
                    [Sequelize.Op.eq]: true
                  }
                },
                {
                  away_win: {
                    [Sequelize.Op.eq]: true
                  }
                }
              ]
            }
          ]
        }
      };

      teamSeason.playoff_wins = await models.Game.count(playoff_wins_query);
      //endregion

      //region playoff_losses
      const playoff_losses_query = {
        where: {
          [Sequelize.Op.or]: [
            {
              [Sequelize.Op.and]: [
                {
                  homeTeamId: {
                    [Sequelize.Op.eq]: input.teamId
                  }
                },
                {
                  seasonId: {
                    [Sequelize.Op.eq]: input.seasonId
                  }
                },
                {
                  is_playoff: {
                    [Sequelize.Op.eq]: true
                  }
                },
                {
                  away_win: {
                    [Sequelize.Op.eq]: true
                  }
                }
              ]
            },
            {
              [Sequelize.Op.and]: [
                {
                  awayTeamId: {
                    [Sequelize.Op.eq]: input.teamId
                  }
                },
                {
                  seasonId: {
                    [Sequelize.Op.eq]: input.seasonId
                  }
                },
                {
                  is_playoff: {
                    [Sequelize.Op.eq]: true
                  }
                },
                {
                  home_win: {
                    [Sequelize.Op.eq]: true
                  }
                }
              ]
            }
          ]
        }
      };

      teamSeason.playoff_losses = await models.Game.count(playoff_losses_query);
      //endregion
      
      return await models.TeamSeason.create(teamSeason);
    },

    updateTeamSeason: async (parent, { id, input }, { models }) => {
      const teamSeason = await models.TeamSeason.findById(id);
      return await teamSeason.update(input);
    },

    deleteTeamSeason: async (parent, { id }, { models }) => {
      return await models.TeamSeason.destroy({
        where: { id },
      });
    },
  },

  TeamSeason: {
    display: (teamSeason) => `${moment(`01-${teamSeason.season.month}-${teamSeason.season.year}`, 'D-MMMM-YYYY').format("MMM YYYY")}`,

    reg_record: (teamSeason) => `${teamSeason.reg_wins} - ${teamSeason.reg_losses}`,
    playoff_record: (teamSeason) => `${teamSeason.playoff_wins} - ${teamSeason.playoff_losses}`,

    season: async (teamSeason, args, { models }) => {
      return await models.Season.findById(teamSeason.seasonId);
    },
    team: async (teamSeason, args, { loaders }) => {
      return await loaders.team.load(teamSeason.teamId);
    },

  },
};