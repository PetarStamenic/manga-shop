const express = require("express");
const {sequelize, Order_item} = require("../models");

const route = express.Router();

route.use(express.json());

route.use(express.urlencoded({extended: true}));

const {orderItemValidator} = require("../validation");

route.get("/", async (req, res) => {
    try{
        const orderItems = await Order_item.findAll();
        return res.json(orderItems);
    }catch(err){
        res.status(500).json({error:"Greska", body:err});
    }

});


route.get("/:id", async (req, res) => {
    try{
        const orderItem = await Order_item.findByPk(req.params.id);
        return res.json(orderItem);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

route.post('/add', async (req, res) => {
    try{
        const {error, succ} = orderItemValidator.validate(req.body);
        if(error){
            res.status(400).json({msg: "Greska prilikom popunjavanja forme " + error.details[0].message});
            return;
        }
        const newOrder_item = await Order_item.create(req.body);
        res.json(newOrder_item);

    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

route.put('/edit/:id', async (req, res) => {
    try{
        const {error, succ} = orderItemValidator.validate(req.body);
        if(error){
            res.status(400).json({msg: "Greska prilikom popunjavanja forme " + error.details[0].message});
            return;
        }

        const orderItem = await Order_item.findByPk(req.params.id);
        orderItem.userId = req.body.userId;
        orderItem.quantity = req.body.quantity;
        orderItem.content = req.body.content;

        await orderItem.save();

        return res.json(orderItem);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});


route.delete('/delete/:id', async (req, res) => {

    try{
        const orderItem = await Order_item.findByPk(req.params.id);
        await orderItem.destroy();
        return res.json(orderItem);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

module.exports = route;