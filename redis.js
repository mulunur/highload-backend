const redis = require("redis");

class redisConnection {
    constructor() {
        this.redisClient = redis.createClient({
            socket: {
                host: process.env.REDIS_HOST,
                port: process.env.REDIS_PORT
            }
        });

        redisClient.on("error", (error) => console.error(`Error : ${error}`));



        redisClient.on('connect', function () {
            console.log('***\nRedis Connected!\n***');
        });
    }

    async connect(params) {
        await this.redisClient.connect();
    }

}

module.exports = redisConnection
 



