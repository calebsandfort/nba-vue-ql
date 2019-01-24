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

  return Season;
};

export default season;