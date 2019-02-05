import Sequelize from 'sequelize';

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres',
    host: process.env.DATABASE_HOST
  },
);

const models = {
  Team: sequelize.import('./team'),
  Season: sequelize.import('./season'),
  Game: sequelize.import('./game'),
  Play: sequelize.import('./play'),
  ScoreBar: sequelize.import('./scoreBar'),
  SeasonMonth: sequelize.import('./seasonMonth'),
  TeamSeason: sequelize.import('./teamSeason'),
  TeamSeasonMonth: sequelize.import('./teamSeasonMonth'),
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;