const db = require("../config/firebaseAdmin");

const getProducts = async (req, res) => {
    try {

        const snapshot = await db
            .collection("products")
            .orderBy("createdAt", "desc")
            .get();

        const products = [];

        snapshot.forEach(doc => {
            products.push({
                id: doc.id,
                ...doc.data()
            });
        });

        res.status(200).json(products);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to fetch products"
        });
    }
};

const getProductById = async (req, res) => {

    try {

        const doc = await db
            .collection("products")
            .doc(req.params.id)
            .get();

        if (!doc.exists) {

            return res.status(404).json({
                message: "Product Not Found"
            });

        }

        res.status(200).json({
            id: doc.id,
            ...doc.data()
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }
};

module.exports = {
    getProducts,
    getProductById
};