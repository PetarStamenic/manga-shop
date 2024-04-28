const express = require("express");
const {sequelize, Cart, Cart_item} = require("../models");

const route = express.Router();

route.use(express.json());

route.use(express.urlencoded({extended: true}));

const {cartValidator} = require("../validation");
const {where} = require("sequelize");

route.get("/", async (req, res) => {
    try{
        const carts = await Cart.findAll();
        return res.json(carts);
    }catch(err){
        res.status(500).json({error:"Greska", body:err});
    }

});


route.get("/:id", async (req, res) => {
    try{
        const cart = await Cart.findByPk(req.params.id);
        return res.json(cart);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

route.get("/user/:id", async (req, res) => {
    try{
        const cart = await Cart.findOne({where: {userId:req.params.id}});
        return res.json(cart);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

route.post('/add/:userId', async (req, res) => {


    try {
        //const {error, succ} = cartValidator.validate(req.body);


        var data = JSON.parse(JSON.stringify(req.body));

        const carts = await Cart.findAll();
        carts.forEach(cart => {
            console.log(cart);
        })
        const cartCheck = await Cart.findOne({where: {userId: req.params.userId}})
        console.log(cartCheck);
        if (cartCheck != null) {
            res.json(cartCheck)
        } else {
            const newCart = await Cart.create(req.params.userId);
            newCart.userId = req.params.userId;
            newCart.save();
            res.json(newCart);
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

route.put('/edit/:id', async (req, res) => {
    try{
        const {error, succ} = cartValidator.validate(req.body);
        if(error){
            res.status(400).json({msg: "Greska prilikom popunjavanja forme " + error.details[0].message});
            return;
        }

        const cart = await Cart.findByPk(req.params.id);
        cart.userId = req.body.userId;
        cart.sessionId = req.body.sessionId;
        cart.token = req.body.token;
        cart.status = req.body.status;
        cart.content = req.body.content;

        await cart.save();

        return res.json(cart);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});


route.delete('/delete/:id', async (req, res) => {

    try{
        const cart = await Cart.findByPk(req.params.id);
        await cart.destroy();
        return res.json(cart);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

module.exports = route;