const admin = require("firebase-admin");

const serviceAccount =
require("../../serviceAccountKey.json");

if (!admin.apps.length) {
    admin.initializeApp({
        credential:
        admin.credential.cert(serviceAccount)
    });
}

const verifyFirebase = async (
    req,
    res,
    next
) => {

    try {

        const token =
        req.headers.authorization
        ?.split(" ")[1];

        console.log("Token received:", token ? "Yes" : "No");

        if(!token){

            return res.status(401)
            .json({
                message:"No Token"
            });

        }

        const decoded =
        await admin.auth()
        .verifyIdToken(token);

        req.user = decoded;

        console.log("Token verified for user:", decoded.email);

        next();

    }
    catch(error){

        console.log("Token verification error:", error.message);

        return res.status(401)
        .json({
            message:"Invalid Token",
            error: error.message
        });

    }

};

module.exports = verifyFirebase;