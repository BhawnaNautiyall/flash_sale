const express =
require("express");

const router =
express.Router();

const verifyFirebase =
require("../middleware/verifyFirebase");

const {
    getProfile
}
=
require("../controllers/authController");

router.get(
    "/profile",
    verifyFirebase,
    getProfile
);

module.exports = router;