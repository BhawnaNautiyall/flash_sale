const express = require("express");

const router = express.Router();

const verifyFirebase =
require("../middleware/verifyFirebase");


const {
    placeOrder,
    getMyOrders
}
=
require(
"../controllers/orderController"
);

router.post("/", verifyFirebase, placeOrder);

router.get(
    "/my",
    verifyFirebase,
    getMyOrders
);

module.exports = router;