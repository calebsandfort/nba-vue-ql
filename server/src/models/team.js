const team = (sequelize, DataTypes) => {
  const Team = sequelize.define('team', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    bbref_id: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      length: 3,
      validate: {
        notEmpty: true,
      },
    },
  });

  Team.associate = models => {
    Team.hasOne(models.Game, {as: 'HomeTeam', foreignKey : 'homeTeamId'});
    Team.hasOne(models.Game, {as: 'AwayTeam', foreignKey : 'awayTeamId'});
  };

  return Team;
};

export default team;