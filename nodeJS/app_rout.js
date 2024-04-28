const path = require('path');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const http = require('http');
const { Server } = require("socket.io");
require('dotenv').config();

const app = express()
const server = http.createServer(app);
const io = new Server(server,{
    cors: {
        origin: 'http://127.0.0.1:8080'
        //credentials: false
    },
    allowEIO3: true
});
var corsOptions = {
    origin: '*',
    optionSuccessStatus: 200
}

app.use(express.json())
app.use(cors(corsOptions));

const userRoutes = require("./routes/user-route.js");
const ratingRoutes = require("./routes/ratings-route.js");
const transactionRoutes = require("./routes/transactions-route");
const productRoutes = require("./routes/products-route");
const productMetaRoutes = require("./routes/product_meta-route");
const productCategoiresRoutes = require("./routes/product_categories-route");
const ordersRoutes = require("./routes/orders-routes");
const orderItemsRoutes = require("./routes/order_items-route");
const categoriesRoutes = require("./routes/categories-route");
const cartRoutes = require("./routes/carts-route");
const cartItemsRoutes = require("./routes/cart_items-route");
app.use("/vendor/user", userRoutes);
app.use("/rating", ratingRoutes);
app.use("/vendor/transaction", transactionRoutes);
app.use("/product", productRoutes);
app.use("/vendor/productmeta", productMetaRoutes);
app.use("/vendor/productcategories", productCategoiresRoutes);
app.use("/vendor/order", ordersRoutes);
app.use("/vendor/orderitem", orderItemsRoutes);
app.use("/category", categoriesRoutes);
app.use("/cart", cartRoutes);
app.use("/cartitem", cartItemsRoutes);

function authSocket(msg, next) {
    if (msg[1].token == null) {
        next(new Error("Not authenticated"));
    } else {
        jwt.verify(msg[1].token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                next(new Error(err));
            } else {
                msg[1].user = user;
                next();
            }
        });
    }
}

io.on('connection', socket => {
    socket.use(authSocket);

    socket.on('comment', msg => {
        Messages.create({ body: msg.body, artId: msg.artId, userId: msg.user.userId })
            .then( rows => {
                Messages.findOne({ where: { id: rows.id }, include: ['user'] })
                    .then( msg => io.emit('comment', JSON.stringify(msg)) )
            }).catch( err => res.status(500).json(err) );
    });

    socket.on('error', err => socket.emit('error', err.message) );
});

app.listen({port: 8500}, async () => {
    console.log("Started server on localhost:8081");
});