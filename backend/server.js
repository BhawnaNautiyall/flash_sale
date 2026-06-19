console.log("STEP 1: Starting server...");

const result = require("dotenv").config();

if (result.error) {
    console.error(
        "❌ Error loading .env file:",
        result.error
    );
} else {

    console.log(
        "✓ STEP 2: .env file loaded successfully"
    );

    console.log(
        "Loaded .env variables:",
        Object.keys(
            result.parsed || {}
        ).length,
        "variables"
    );
}

console.log(
    "STEP 3: Loading app..."
);

const app =
require("./src/app");

console.log(
    "STEP 3.5: Connecting to Redis..."
);

const {
    connectRedis
} = require(
    "./src/config/redisClient"
);

const {
    syncInventoryToRedis
} = require(
    "./src/services/syncInventoryToRedis"
);

const startServer =
async () => {

    try {

        await connectRedis();

        console.log(
            "STEP 3.6: Syncing Inventory..."
        );

        await syncInventoryToRedis();

        const PORT =
        process.env.PORT || 5000;

        app.listen(
            PORT,
            () => {

                console.log(
                    `✓ STEP 4: Server running on PORT ${PORT}`
                );

            }
        );

    }
    catch(error){

        console.log(
            "Startup Error:",
            error
        );

    }

};

startServer();