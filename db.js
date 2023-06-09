require("dotenv").config()
const {Sequelize} = require("sequelize");


const sequelize = new Sequelize({
	database: process.env.DB_NAME,
 	username: process.env.PG_USERNAME,
	password: process.env.PG_PASSWORD,
	dialect: process.env.PGPOOL_DIALECT,
	host: process.env.PG_HOST,
	port: process.env.PG_PORT
}
)

//const sequelize = new Sequelize({
//	host: 'localhost',
//	port: 5432,
//	dialect: 'postgres',
//	database: 'lebedev',
//	username: 'postgres',
//	password: 'MORISGRISHA',
//});

module.exports = {sequelize};
