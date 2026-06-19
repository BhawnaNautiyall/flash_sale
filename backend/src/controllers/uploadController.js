const cloudinary =
require("../config/cloudinary");

const db =
require("../config/firebaseAdmin");

const {
    redisClient
} = require("../config/redisClient");

const uploadImage =
async (req, res) => {

    console.log(
        "REQUEST RECEIVED"
    );

    try {

        console.log("FILE:");
        console.log(req.file);

        console.log(
            "NAME:",
            req.body.name
        );

        console.log(
            "DESCRIPTION:",
            req.body.description
        );

        console.log(
            "ORIGINAL PRICE:",
            req.body.originalPrice
        );

        console.log(
            "FLASH SALE PRICE:",
            req.body.flashSalePrice
        );

        console.log(
            "STOCK:",
            req.body.stock
        );

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

        console.log(
            "CLOUDINARY SUCCESS"
        );

        const stock =
        Number(
            req.body.stock
        );

        const productRef =
        await db
        .collection("products")
        .add({

            name:
            req.body.name,

            description:
            req.body.description,

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

        const redisKey =
        `product:${productRef.id}:stock`;

        await redisClient.set(
            redisKey,
            stock
        );

        console.log(
            `Redis Key Created: ${redisKey}`
        );

        console.log(
            `Redis Stock: ${stock}`
        );

        res.status(200).json({

            imageUrl:
            result.secure_url,

            productId:
            productRef.id

        });

        console.log(
            "RESPONSE SENT TO FRONTEND"
        );

    }
    catch (error) {

        console.log(
            "UPLOAD ERROR"
        );

        console.log(error);

        res.status(500).json({

            message:
            "Upload Failed"

        });

    }

};

module.exports = {
    uploadImage
};