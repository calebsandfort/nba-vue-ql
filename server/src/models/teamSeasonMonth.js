const teamSeasonMonth = (sequelize, DataTypes) => {
  const TeamSeasonMonth = sequelize.define('teamSeasonMonth', {
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

  TeamSeasonMonth.associate = models => {
    TeamSeasonMonth.belongsTo(models.SeasonMonth, { onDelete: 'CASCADE' });
    TeamSeasonMonth.belongsTo(models.Team, { onDelete: 'CASCADE' });
  };

  return TeamSeasonMonth;
};

export default teamSeasonMonth;