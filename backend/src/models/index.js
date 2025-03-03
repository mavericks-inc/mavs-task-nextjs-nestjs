'use strict';
import process from 'process';
import Sequelize from 'sequelize';
import config from '../config/config.json' assert { type: 'json' };
import Users from './users.js';
import Articles from './articles.js';
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db['Users'] = Users(sequelize, Sequelize.DataTypes);
db['Articles'] = Articles(sequelize, Sequelize.DataTypes);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
