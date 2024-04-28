const express = require("express");
const {sequelize, Order} = require("../models");

const route = express.Router();

route.use(express.json());

route.use(express.urlencoded({extended: true}));

const {orderValidator} = require("../validation");

route.get("/", async (req, res) => {
    try{
        const orders = await Order.findAll();
        return res.json(orders);
    }catch(err){
        res.status(500).json({error:"Greska", body:err});
    }

});


route.get("/:id", async (req, res) => {
    try{
        const order = await Order.findByPk(req.params.id);
        return res.json(order);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

route.post('/add', async (req, res) => {
    try{
        const {error, succ} = orderValidator.validate(req.body);
        if(error){
            res.status(400).json({msg: "Greska prilikom popunjavanja forme " + error.details[0].message});
            return;
        }
        const newOrder = await Order.create(req.body);
        res.json(newOrder);

    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

route.put('/edit/:id', async (req, res) => {
    try{
        const {error, succ} = orderValidator.validate(req.body);
        if(error){
            res.status(400).json({msg: "Greska prilikom popunjavanja forme " + error.details[0].message});
            return;
        }

        const order = await Order.findByPk(req.params.id);
        order.userId = req.body.userId;
        order.sessionId = req.body.sessionId;
        order.token = req.body.token;
        order.status = req.body.status;
        order.subTotal = req.body.subTotal;
        order.itemDiscount = req.body.itemDiscount;
        order.tax = req.body.tax;
        order.shipping = req.body.shipping;
        order.sessionId = req.body.sessionId;
        order.total = req.body.total;
        order.promo = req.body.promo;
        order.discount = req.body.discount;
        order.grandTotal = req.body.grandTotal;
        order.content = req.body.content;

        await order.save();

        return res.json(order);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});


route.delete('/delete/:id', async (req, res) => {

    try{
        const order = await Order.findByPk(req.params.id);
        await order.destroy();
        return res.json(order);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

module.exports = route;