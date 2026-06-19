const db = require("../config/firebaseAdmin");

const {
    redisClient
} = require("../config/redisClient");

const syncInventoryToRedis =
async () => {

    try {

        const snapshot =
        await db
        .collection("products")
        .get();

        for (
            const doc
            of snapshot.docs
        ) {

            const product =
            doc.data();

            const key =
            `product:${doc.id}:stock`;

            await redisClient.set(
                key,
                product.stock
            );

            console.log(
                `Synced ${key} = ${product.stock}`
            );

        }

        console.log(
            "Inventory Sync Complete"
        );

    }
    catch(error){

        console.log(
            "Redis Sync Error:",
            error
        );

    }

};

module.exports = {
    syncInventoryToRedis
};