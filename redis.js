const redis = require("redis");

let redisClient;

async function connectRedis(){
  redisClient = redis.createClient({
	socket: {
		host: process.env.REDIS_HOST,
		port: process.env.REDIS_PORT
	}
  });

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();

  redisClient.on('connect', function() {
    console.log('***\nRedis Connected!\n***');
  });
}
export {redisClient, connectRedis};