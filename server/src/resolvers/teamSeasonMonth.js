import  moment from 'moment';
import Sequelize from 'sequelize';
import _ from 'lodash';

export default {
  Query: {
    teamSeasonMonths: async (parent, { offset = 0, limit = 0, order =  'idx ASC'}, { models }) => {
      const params = {};

      if(limit > 0){
        params.offset = offset;
        params.limit = limit;
      }

      if(order != ''){
        params.order = Sequelize.literal(order);
      }

      return await models.TeamSeasonMonth.findAll(params);
    },

    teamSeasonMonth: async (parent, { id }, { models }) => {
      return await models.TeamSeasonMonth.findById(id);
    },
  },


  Mutation: {
    createTeamSeasonMonth: async (
      parent,
      { input },
      { models },
    ) => {
      const teamSeasonMonth = Object.assign({}, input);

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
                  seasonMonthId: {
                    [Sequelize.Op.eq]: input.seasonMonthId
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
                  seasonMonthId: {
                    [Sequelize.Op.eq]: input.seasonMonthId
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
      
      teamSeasonMonth.reg_wins = await models.Game.count(reg_wins_query);
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
                  seasonMonthId: {
                    [Sequelize.Op.eq]: input.seasonMonthId
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
                  seasonMonthId: {
                    [Sequelize.Op.eq]: input.seasonMonthId
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

      teamSeasonMonth.reg_losses = await models.Game.count(reg_losses_query);
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
                  seasonMonthId: {
                    [Sequelize.Op.eq]: input.seasonMonthId
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
                  seasonMonthId: {
                    [Sequelize.Op.eq]: input.seasonMonthId
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

      teamSeasonMonth.playoff_wins = await models.Game.count(playoff_wins_query);
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
                  seasonMonthId: {
                    [Sequelize.Op.eq]: input.seasonMonthId
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
                  seasonMonthId: {
                    [Sequelize.Op.eq]: input.seasonMonthId
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

      teamSeasonMonth.playoff_losses = await models.Game.count(playoff_losses_query);
      //endregion
      
      return await models.TeamSeasonMonth.create(teamSeasonMonth);
    },

    updateTeamSeasonMonth: async (parent, { id, input }, { models }) => {
      const teamSeasonMonth = await models.TeamSeasonMonth.findById(id);
      return await teamSeasonMonth.update(input);
    },

    deleteTeamSeasonMonth: async (parent, { id }, { models }) => {
      return await models.TeamSeasonMonth.destroy({
        where: { id },
      });
    },
  },

  TeamSeasonMonth: {
    display: (teamSeasonMonth) => `${moment(`01-${teamSeasonMonth.season.month}-${teamSeasonMonth.season.year}`, 'D-MMMM-YYYY').format("MMM YYYY")}`,

    reg_record: (teamSeasonMonth) => `${teamSeasonMonth.reg_wins} - ${teamSeasonMonth.reg_losses}`,
    playoff_record: (teamSeasonMonth) => `${teamSeasonMonth.playoff_wins} - ${teamSeasonMonth.playoff_losses}`,

    seasonMonth: async (teamSeasonMonth, args, { models }) => {
      return await models.SeasonMonth.findById(teamSeasonMonth.seasonMonthId);
    },
    team: async (teamSeasonMonth, args, { loaders }) => {
      return await loaders.team.load(teamSeasonMonth.teamId);
    },

  },
};