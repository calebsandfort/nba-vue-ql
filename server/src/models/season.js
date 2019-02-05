const season = (sequelize, DataTypes) => {
  const Season = sequelize.define('season', {
    year: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  Season.associate = models => {
    Season.hasMany(models.Game, { onDelete: 'CASCADE' });
    Season.hasMany(models.SeasonMonth, { onDelete: 'CASCADE' });
    Season.hasMany(models.TeamSeason, { onDelete: 'CASCADE' });
  };

  return Season;
};

export default season;