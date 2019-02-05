const game = (sequelize, DataTypes) => {
  const Game = sequelize.define('game', {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    bbref_id: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      length: 20,
      validate: {
        notEmpty: true,
      },
    },
    away_score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    home_score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    is_playoff: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    away_win: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    home_win: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  Game.associate = models => {
    Game.hasMany(models.Play, { onDelete: 'CASCADE' });
    Game.hasMany(models.ScoreBar, { onDelete: 'CASCADE' });
    Game.belongsTo(models.Season, { onDelete: 'CASCADE' });
    Game.belongsTo(models.SeasonMonth, { onDelete: 'CASCADE' });
  };

  return Game;
};

export default game;