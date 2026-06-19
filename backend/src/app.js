const express = require("express");

const authRoutes =
require("./routes/authRoutes");

const uploadRoutes =
require("./routes/uploadRoutes");

const productRoutes =
require("./routes/productRoutes");

const orderRoutes =
require("./routes/orderRoutes");

const app = express();

const cors = require("cors");

app.use(
    cors({
        origin: "http://localhost:5500"
    })
);

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use(
    "/api/upload",
    uploadRoutes
);

app.use(
    "/api/products",
    productRoutes
);

app.use(
    "/api/orders",
    orderRoutes
);

app.get("/test", (req, res) => {

    console.log("TEST HIT");

    res.json({
        message: "Backend Working"
    });

});

module.exports = app;