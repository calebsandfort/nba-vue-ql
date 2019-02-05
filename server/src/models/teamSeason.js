const teamSeason = (sequelize, DataTypes) => {
  const TeamSeason = sequelize.define('teamSeason', {
    reg_wins: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    reg_losses: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    playoff_wins: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    playoff_losses: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    idx: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  TeamSeason.associate = models => {
    TeamSeason.belongsTo(models.Season, { onDelete: 'CASCADE' });
    TeamSeason.belongsTo(models.Team, { onDelete: 'CASCADE' });
  };

  return TeamSeason;
};

export default teamSeason;