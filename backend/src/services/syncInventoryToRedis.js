const db = require("../config/firebaseAdmin");

const {redisClient} = require("../config/redisClient");

const syncInventoryToRedis = async () => {
    try {
        const snapshot =await db.collection("products").get();
        for (const doc of snapshot.docs) {
            const product =doc.data();
            const key = `product:${doc.id}:stock`;
            await redisClient.set(key, product.stock);
        }
    }
    catch(error){
    }
};

module.exports = {
    syncInventoryToRedis
};
