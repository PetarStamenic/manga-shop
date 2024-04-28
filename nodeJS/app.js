const path = require('path');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express()

var corsOptions = {
    origin: '*',
    optionSuccessStatus: 200
}

app.use(express.json())
app.use(cors(corsOptions));

function getCookies(req){

    if(req.headers.cookie == null) return {};

    const rawCookies = req.headers.cookie.split("; ");
    const parsedCookies = {};

    rawCookies.forEach(rawCookie => {
        const parsedCookie = rawCookie.split('=');
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });


    return parsedCookies;
}

function authToken(req, res, next){

    const cookies = getCookies(req);
    const token = cookies['token'];

    if(token == null) return res.redirect(301, '/login');

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.redirect(301, '/login');

        req.user = user;

        next();
    });

}



app.get("/vendor/users", authToken, (req, res) => {res.sendFile(path.join(__dirname, 'static', 'user.html'));});
app.get("/vendor", authToken, (req, res) => {res.sendFile(path.join(__dirname, 'static', 'user.html'));});
app.get("/user.js", authToken, (req, res) => {res.sendFile(path.join(__dirname, 'static', 'user.js'));});
app.get("/vendor/carts", authToken, (req, res) => {res.sendFile(path.join(__dirname, 'static', 'carts.html'));});
app.get("/carts.js", authToken, (req, res) => {res.sendFile(path.join(__dirname, 'static', 'carts.js'));});
app.get("/vendor/cartitems", authToken, (req, res) => {res.sendFile(path.join(__dirname, 'static', 'cartItems.html'));});
app.get("/cartItems.js", authToken, (req, res) => {res.sendFile(path.join(__dirname, 'static', 'cartItems.js'));});
app.get("/vendor/categories", authToken, (req, res) => {res.sendFile(path.join(__dirname, 'static', 'categories.html'));});
app.get("/categories.js", authToken, (req, res) => {res.sendFile(path.join(__dirname, 'static', 'categories.js'));});
app.get("/vendor/orders", authToken, (req, res) => {res.sendFile(path.join(__dirname, 'static', 'orders.html'));});
app.get("/orders.js", authToken, (req, res) => {res.sendFile(path.join(__dirname, 'static', 'orders.js'));});
app.get("/vendor/orderitems", authToken, (req, res) => {res.sendFile(path.join(__dirname, 'static', 'orderItems.html'));});
app.get("/orderItems.js", authToken, (req, res) => {res.sendFile(path.join(__dirname, 'static', 'orderItems.js'));});
app.get("/vendor/products", authToken, (req, res) => {res.sendFile(path.join(__dirname, 'static', 'products.html'));});
app.get("/products.js", authToken, (req, res) => {res.sendFile(path.join(__dirname, 'static', 'products.js'));});
app.get("/vendor/product+categories", authToken, (req, res) => {res.sendFile(path.join(__dirname, 'static', 'productCategories.html'));});
app.get("/productCategories.js", authToken, (req, res) => {res.sendFile(path.join(__dirname, 'static', 'productCategories.js'));});
app.get("/vendor/productmetas", authToken, (req, res) => {res.sendFile(path.join(__dirname, 'static', 'productMeta.html'));});
app.get("/productMeta.js", authToken, (req, res) => {res.sendFile(path.join(__dirname, 'static', 'productMeta.js'));});
app.get("/vendor/ratings", authToken, (req, res) => {res.sendFile(path.join(__dirname, 'static', 'ratings.html'));});
app.get("/ratings.js", authToken, (req, res) => {res.sendFile(path.join(__dirname, 'static', 'ratings.js'));});
app.get("/vendor/transactions", authToken, (req, res) => {res.sendFile(path.join(__dirname, 'static', 'transactions.html'));});
app.get("/transactions.js", authToken, (req, res) => {res.sendFile(path.join(__dirname, 'static', 'transactions.js'));});

app.get("/login", (req, res) => {res.sendFile(path.join(__dirname, 'static', 'login.html'));});
app.get("/login.js", (req, res) => {res.sendFile(path.join(__dirname, 'static', 'login.js'));});

app.listen({ port:7000 }, async () => {
    console.log("Started server on localhost:7000");
});

