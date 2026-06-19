const { createClient } = require("redis");

// Validate Redis environment variables
const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT;
const redisUsername = process.env.REDIS_USERNAME;
const redisPassword = process.env.REDIS_PASSWORD;

// DEBUG: Show all env variables that contain REDIS
console.log("\n=== REDIS ENVIRONMENT DEBUG ===");
console.log("process.env keys containing REDIS:", Object.keys(process.env).filter(key => key.includes("REDIS")));
console.log("REDIS_HOST value:", redisHost);
console.log("REDIS_PORT value:", redisPort);
console.log("REDIS_USERNAME value:", redisUsername);
console.log("REDIS_PASSWORD value:", redisPassword ? "***SET***" : "NOT SET");
console.log("================================\n");

if (!redisHost || !redisPort || !redisUsername || !redisPassword) {
    console.warn("⚠️  Warning: Some Redis environment variables are missing!");
    console.warn("Missing: ", {
        host: !redisHost,
        port: !redisPort,
        username: !redisUsername,
        password: !redisPassword
    });
    console.warn("Skipping Redis connection...");
}

const redisConfig = {
    username: redisUsername || "default",
    password: redisPassword || "",
    socket: {
        host: redisHost || "localhost",
        port: redisPort ? parseInt(redisPort, 10) : 6379
    }
};

console.log("Redis Config being used:", {
    host: redisConfig.socket.host,
    port: redisConfig.socket.port,
    username: redisConfig.username,
    hasPassword: !!redisConfig.password
});

const redisClient = createClient(redisConfig);

redisClient.on(
    "connect",
    () => {

        console.log(
            "Redis Connected ✓"
        );

    }
);

redisClient.on(
    "error",
    (err) => {

        console.log(
            "Redis Error:",
            err.message || err
        );

    }
);

const connectRedis =
async () => {

    if (!redisHost || !redisPort) {
        console.log("⚠️  Redis credentials missing - skipping connection");
        return;
    }

    try {

        await redisClient.connect();

        console.log(
            "Redis Ready ✓"
        );

    }
    catch(error){

        console.log(
            "Redis Connection Failed:",
            error.message || error
        );
        
        console.log(
            "Continuing without Redis..."
        );

    }

};

module.exports = {

    redisClient,

    connectRedis

};