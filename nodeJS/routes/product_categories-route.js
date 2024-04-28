const express = require("express");
const {sequelize, Product_Category} = require("../models");

const route = express.Router();

route.use(express.json());

route.use(express.urlencoded({extended: true}));

const {productCategoryValidator} = require("../validation");

route.get("/", async (req, res) => {
    try{
        const productCategorys = await Product_Category.findAll();
        return res.json(productCategorys);
    }catch(err){
        res.status(500).json({error:"Greska", body:err});
    }

});


route.get("/:id", async (req, res) => {
    try{
        const productCategory = await Product_Category.findByPk(req.params.id);
        return res.json(productCategory);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

route.post('/add', async (req, res) => {
    try{
        const {error, succ} = productCategoryValidator.validate(req.body);
        if(error){
            res.status(400).json({msg: "Greska prilikom popunjavanja forme " + error.details[0].message});
            return;
        }
        const newProduct_Category = await Product_Category.create(req.body);
        res.json(newProduct_Category);

    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

route.put('/edit/:id', async (req, res) => {
    try{
        const {error, succ} = productCategoryValidator.validate(req.body);
        if(error){
            res.status(400).json({msg: "Greska prilikom popunjavanja forme " + error.details[0].message});
            return;
        }

        const productCategory = await Product_Category.findByPk(req.params.id);
        productCategory.productId = req.body.productId;
        productCategory.categoryId = req.body.categoryId;

        await productCategory.save();

        return res.json(productCategory);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});


route.delete('/delete/:id', async (req, res) => {

    try{
        const productCategory = await Product_Category.findByPk(req.params.id);
        await productCategory.destroy();
        return res.json(productCategory);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

module.exports = route;