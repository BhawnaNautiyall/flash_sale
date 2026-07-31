const db = require("../config/firebaseAdmin");
const admin = require("firebase-admin");

const {
    reserveInventory,
    rollbackInventory
} = require("../services/inventoryService");

const placeOrder = async (req, res) => {

    let inventoryReserved = false;
    let productIdForRollback = null;

    try {
        const {
            productId,
            address,
            phoneNumber
        } = req.body;

        productIdForRollback = productId;
        const userId = req.user.uid;
        const userEmail = req.user.email;
        const productData = await reserveInventory(productId);
        inventoryReserved = true;

        const orderRef = await db
            .collection("orders")
            .add({
                userId,
                userEmail,
                productId,
                productName: productData.name,
                quantity: 1,
                address,
                phoneNumber,
                paymentMethod: "COD",
                status: "PLACED",
                createdAt: admin.firestore
                    .FieldValue
                    .serverTimestamp()
            });

        await orderRef.update({
            orderId: orderRef.id
        });

        res.status(200).json({
            message: "Order Placed Successfully"
        });
    }
    catch (error) {
        if (
            inventoryReserved &&
            productIdForRollback
        ) {
            try {
                await rollbackInventory(productIdForRollback);
            }
            catch (rollbackError) {
                // Rollback failed
            }
        }
        if (error.message === "Out of Stock") {
            return res.status(400).json({
                message: "Out of Stock"
            });
        }
        if (error.message === "Product not found") {
            return res.status(404).json({
                message: "Product not found"
            });
        }
        res.status(500).json({
            message: "Server Error"
        });
    }

};

const getMyOrders = async (req, res) => {
    try {
        const userId = req.user.uid;
        const snapshot = await db
            .collection("orders")
            .where(
                "userId",
                "==",
                userId
            )
            .orderBy(
                "createdAt",
                "desc"
            )
            .get();
        const orders = [];
        snapshot.forEach(doc => {
            orders.push({
                id: doc.id,
                ...doc.data()
            });
        });
        res.status(200).json(orders);
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to fetch orders"
        });
    }
};
module.exports = {
    placeOrder,
    getMyOrders
};
