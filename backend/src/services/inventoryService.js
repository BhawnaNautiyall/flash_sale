const db = require("../config/firebaseAdmin");

const {redisClient} = require("../config/redisClient");

const reserveInventory = async ( productId) => {
    const productRef = db.collection("products").doc(productId);
    const productDoc = await productRef.get();
    if (!productDoc.exists) {
        throw new Error("Product not found");
    }
    const productData = productDoc.data();
    const redisKey =`product:${productId}:stock`;

    const remainingStock = await redisClient.decr(redisKey);

    if (remainingStock < 0) {
        await redisClient.incr(redisKey);
        throw new Error("Out of Stock");
    }
    await productRef.update({stock: remainingStock});
    return {
        ...productData,
        stock: remainingStock
    };
};
const rollbackInventory = async (productId) => {
    const redisKey =`product:${productId}:stock`;
    const restoredStock =await redisClient.incr( redisKey);
    const productRef =db.collection("products").doc(productId);

    await productRef.update({stock: restoredStock});
};
module.exports = {
    reserveInventory,
    rollbackInventory
};
