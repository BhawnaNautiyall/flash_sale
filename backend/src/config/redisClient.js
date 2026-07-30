const { createClient } = require("redis");

const redisClient = createClient({
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT)
    }
});

redisClient.on("connect", () => {
    console.log("Redis Connected ✓");
});

redisClient.on("error", (err) => {
    console.error("Redis Error:", err.message);
});

const connectRedis = async () => {
    try {
        await redisClient.connect();
        console.log("Redis Ready ✓");
    } catch (err) {
        console.error("Redis Connection Failed:", err.message);
    }
};

module.exports = { redisClient, connectRedis };
