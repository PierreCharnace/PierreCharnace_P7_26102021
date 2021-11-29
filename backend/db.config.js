const mysql = require('mysql');
const { Sequelize } = require('sequelize');
require('dotenv').config({path: './config/.env'});

const sequelize = new Sequelize({

    host: 'DB_HOST',

    user: 'DB_USERNAME',

    password: 'DB_PASS',

    database: 'database_development',

    dialect: "mysql"

});

const db = {};
try {
    db;
    console.log('Connecté à la base de données MySQL!');
} catch (error) {
    console.error('Impossible de se connecter, erreur suivante :', error);
}

db.Sequelize = Sequelize;
db.sequelize = sequelize;