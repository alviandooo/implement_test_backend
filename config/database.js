const Sequelize = require('sequelize');

const db = new Sequelize({
  dialect: process.env.DATABASE_DIALECT,
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  logging: false,

	pool: {
		max: 200,
		min: 0,
		idle: 20000,
		acquire: 200000,
		    evict: 1000
	},
	timezone: "+07:00"
});

db.authenticate()
	.then(() => {
		console.log('Connection database has been established successfully.');
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err);
	});

module.exports = db;