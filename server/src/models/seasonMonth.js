const seasonMonth = (sequelize, DataTypes) => {
  const SeasonMonth = sequelize.define('seasonMonth', {
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    month: {
      type: DataTypes.STRING,
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

  SeasonMonth.associate = models => {
    SeasonMonth.hasMany(models.Game, { onDelete: 'CASCADE' });
    SeasonMonth.belongsTo(models.Season, { onDelete: 'CASCADE' });
    SeasonMonth.hasMany(models.TeamSeasonMonth, { onDelete: 'CASCADE' });
  };

  return SeasonMonth;
};

export default seasonMonth;