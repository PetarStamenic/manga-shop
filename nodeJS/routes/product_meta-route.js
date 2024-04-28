const express = require("express");
const {sequelize, Product_meta} = require("../models");

const route = express.Router();

route.use(express.json());

route.use(express.urlencoded({extended: true}));

const {productMetaValidator} = require("../validation");

route.get("/", async (req, res) => {
    try{
        const productMeta = await Product_meta.findAll();
        return res.json(productMeta);
    }catch(err){
        res.status(500).json({error:"Greska", body:err});
    }

});


route.get("/:id", async (req, res) => {
    try{
        const productMeta = await Product_meta.findByPk(req.params.id);
        return res.json(productMeta);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

route.post('/add', async (req, res) => {
    try{
        const {error, succ} = productMetaValidator.validate(req.body);
        if(error){
            res.status(400).json({msg: "Greska prilikom popunjavanja forme " + error.details[0].message});
            return;
        }
        const newProductMeta = await Product_meta.create(req.body);
        res.json(newProductMeta);

    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

route.put('/edit/:id', async (req, res) => {
    try{
        const {error, succ} = productMetaValidator.validate(req.body);
        if(error){
            res.status(400).json({msg: "Greska prilikom popunjavanja forme " + error.details[0].message});
            return;
        }

        const productMeta = await Product_meta.findByPk(req.params.id);
        productMeta.productId = req.body.productId;
        productMeta.content = req.body.content;

        await productMeta.save();

        return res.json(productMeta);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});


route.delete('/delete/:id', async (req, res) => {

    try{
        const productMeta = await Product_meta.findByPk(req.params.id);
        await productMeta.destroy();
        return res.json(productMeta);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

module.exports = route;