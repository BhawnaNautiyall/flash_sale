const cloudinary = require("../config/cloudinary");
const db = require("../config/firebaseAdmin");

const {redisClient} = require("../config/redisClient");

const uploadImage =
async (req, res) => {
    try {
        const result =
        await cloudinary
        .uploader
        .upload(
            req.file.path,
            {
                folder:
                "flashsale-products"
            }
        );

        const stock =Number(req.body.stock);

        const productRef =
        await db
        .collection("products")
        .add({
            name: req.body.name,
            description: req.body.description,

            originalPrice:
            Number(
                req.body.originalPrice
            ),

            flashSalePrice:
            Number(
                req.body.flashSalePrice
            ),
            stock,
            
            imageUrl:
            result.secure_url,
            
            createdAt:
            new Date()
        });

        const redisKey =`product:${productRef.id}:stock`;
        await redisClient.set(
            redisKey,
            stock
        );

        res.status(200).json({
            imageUrl: result.secure_url,
            productId: productRef.id

        });

    }
    catch (error) {
        res.status(500).json({
            message:
            "Upload Failed"

        });
    }
};

module.exports = {
    uploadImage
};
