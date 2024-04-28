const express = require("express");
const {sequelize, Cart_item} = require("../models");
const {Product} = require("../models")

const route = express.Router();

route.use(express.json());

route.use(express.urlencoded({extended: true}));

const {cartItemValidator} = require("../validation");

route.get("/", async (req, res) => {
    try{
        const cartItems = await Cart_item.findAll();
        return res.json(cartItems);
    }catch(err){
        res.status(500).json({error:"Greska", body:err});
    }

});


route.get("/:id", async (req, res) => {
    try{
        const cartItem = await Cart_item.findByPk(req.params.id);
        return res.json(cartItem);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

route.post('/add/:cartId/:itemId', async (req, res) => {

    try{
        console.log(req.body);
        var data = JSON.parse(JSON.stringify(req.body));

        const itemCheck = await Cart_item.findOne({where: {cartId:req.params.cartId,productId:req.params.itemId}})
        console.log(itemCheck);
        if(itemCheck!= null){
            console.log(itemCheck)
            itemCheck.active = 1;
            itemCheck.quantity++;
            await itemCheck.save();
            res.json(itemCheck);
        } else {
            const newCart_item = await Cart_item.create();
            const prod = await Product.findByPk(req.params.itemId,{attributes:['id', 'userId', 'title', 'metaTitle', 'slug', 'summary', 'type', 'price', 'discount', 'quantity', 'forSale', 'publishedAt', 'saleStartsAt', 'saleEndsAt', 'content', 'createdAt', 'updatedAt']});
            newCart_item.cartId = req.params.cartId;
            newCart_item.productId = req.params.itemId;
            newCart_item.price = prod.price;
            newCart_item.discount = prod.discount;
            newCart_item.quantity = 1;
            newCart_item.active = 1;
            await newCart_item.save();
            res.json(newCart_item);

        }
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

route.put('/remove/:cartId/:itemId', async (req, res) => {

    try {

        console.log(req.body);
        var data = JSON.parse(JSON.stringify(req.body));

        const itemCheck = await Cart_item.findOne({where: {cartId:req.params.cartId,productId:req.params.itemId}})
        console.log(itemCheck);
        if (itemCheck.quantity > 1) {
            itemCheck.active = 1;
            itemCheck.quantity--;
            await itemCheck.save();
            res.json(itemCheck);
        } else {
            await itemCheck.destroy();
            res.json(itemCheck);
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

route.delete('/delete/cart/:id', async (req, res) => {

    try{
        const cartItems = await Cart_item.findAll({where: {cartId:req.params.id}});
        for (const cartItem of cartItems) {
            await cartItem.destroy();
        }
        return res.json(cartItems);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

route.put('/edit/:id', async (req, res) => {
    try{
        const {error, succ} = cartItemValidator.validate(req.body);
        if(error){
            res.status(400).json({msg: "Greska prilikom popunjavanja forme " + error.details[0].message});
            return;
        }

        const cartItem = await Cart_item.findByPk(req.params.id);
        cartItem.cartId = req.body.cartId;
        cartItem.productId = req.body.productId;
        cartItem.price = req.body.price;
        cartItem.discount = req.body.discount;
        cartItem.quantity = req.body.quantity;
        cartItem.active = req.body.active;
        cartItem.content = req.body.content;


        await cartItem.save();

        return res.json(cartItem);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});


route.delete('/delete/:id', async (req, res) => {

    try{
        const cartItem = await Cart_item.findByPk(req.params.id);
        await cartItem.destroy();
        return res.json(cartItem);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

module.exports = route;