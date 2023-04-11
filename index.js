require("dotenv").config()
const express = require("express");
const sequelize = require("./db").sequelize;
const fileUpload = require('express-fileupload')
const cors = require("cors");
const path = require('path');
const models = require("./models/model");
const router = require("./routers/index");
const {ErrorHandler} = require("./middleware/errorHandlerMiddleware");
const http = require("http");
const res = require("express/lib/response");
const redis = require("redis");
const app = express();


const Port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/', router)
app.use(ErrorHandler)

let redis_client = redis.createClient({
	legacyMode: true,
	socket: {
		host: process.env.REDIS_HOST,
		port: parseInt(process.env.REDIS_PORT, 10)
	}
});


const start = async () => {
	try {
		await sequelize.authenticate();
		//await sequelize.dropSchema('public', {});
		//await sequelize.createSchema('public', {});
		await sequelize.sync();
		console.log('Sequelize was initialized');
		// Redis.connectRedis();
		// redis = Redis.client

		

		await redis_client.connect()
		redis_client.on("error", (error) => console.error(`Error : ${error}`));
        redis_client.on('connect', function () {
            console.log('***\nRedis Connected!\n***');
        });

		redis_client.RPUSH('testrecord', 'test recorddddd')	
	} catch (error) {
		console.log(error);
		process.exit();
	}
}



start()

module.exports = redis_client

http.createServer(app).listen(Port, () => {
	app.get('/', function(req, res){
		res.sendfile('./tupaya.html');
	});
	console.log(`Server is working on port ${Port}`);
});


