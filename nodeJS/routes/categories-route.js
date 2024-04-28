const express = require("express");
const {sequelize, Category} = require("../models");

const route = express.Router();

route.use(express.json());

route.use(express.urlencoded({extended: true}));

const {categoryValidator} = require("../validation");

route.get("/", async (req, res) => {
    try{
        const categorys = await Category.findAll();
        return res.json(categorys);
    }catch(err){
        res.status(500).json({error:"Greska", body:err});
    }

});


route.get("/:id", async (req, res) => {
    try{
        const category = await Category.findByPk(req.params.id);
        return res.json(category);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

route.post('/add', async (req, res) => {
    try{
        const {error, succ} = categoryValidator.validate(req.body);
        if(error){
            res.status(400).json({msg: "Greska prilikom popunjavanja forme " + error.details[0].message});
            return;
        }
        const newCategory = await Category.create(req.body);
        res.json(newCategory);

    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

route.put('/edit/:id', async (req, res) => {
    try{
        const {error, succ} = categoryValidator.validate(req.body);
        if(error){
            res.status(400).json({msg: "Greska prilikom popunjavanja forme " + error.details[0].message});
            return;
        }

        const category = await Category.findByPk(req.params.id);
        category.title = req.body.title;
        category.metaTitle = req.body.metaTitle;
        category.slug = req.body.slug;
        category.content = req.body.content;


        await category.save();

        return res.json(category);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});


route.delete('/delete/:id', async (req, res) => {

    try{
        const category = await Category.findByPk(req.params.id);
        await category.destroy();
        return res.json(category);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

module.exports = route;