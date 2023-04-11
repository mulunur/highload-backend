// const redis = require("redis");

// class Redis {
//     static async connectRedis() {
//         this.client = redis.createClient({
//             socket: {
//                 host: process.env.REDIS_HOST,
//                 port: parseInt(process.env.REDIS_PORT, 10)
//             }
//         });

//         this.client.on("error", (error) => console.error(`Error : ${error}`));
//         this.client.on('connect', function () {
//             console.log('***\nRedis Connected!\n***');
//         });

//         await this.client.connect();
//     }
// }

// module.exports = Redis
 



