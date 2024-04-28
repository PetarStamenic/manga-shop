const express = require("express");
const {sequelize, Rating} = require("../models");

const route = express.Router();

route.use(express.json());

route.use(express.urlencoded({extended: true}));

const {ratingValidator} = require("../validation");
const {where} = require("sequelize");

route.get("/", async (req, res) => {
    try{
        const rating = await Rating.findAll();
        return res.json(rating);
    }catch(err){
        res.status(500).json({error:"Greska", body:err});
    }

});


route.get("/:id", async (req, res) => {
    try{
        const prodId = req.params.id
        const rating = await Rating.findAll({where: {productId:prodId}});
        /*arr = [];
        rating.forEach(rev =>{
            if(rev.productId == prodId)
                arr.push(rev);
        })
        return res.json(rev);

         */
        return res.json(rating)
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

route.post('/add', async (req, res) => {
    try{
        const {error, succ} = ratingValidator.validate(req.body);
        if(error){
            res.status(400).json({msg: "Greska prilikom popunjavanja forme " + error.details[0].message});
            return;
        }
        const newRating = await Rating.create(req.body);
        res.json(newRating);

    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

route.put('/edit/:id', async (req, res) => {
    try{
        const {error, succ} = ratingValidator.validate(req.body);
        if(error){
            res.status(400).json({msg: "Greska prilikom popunjavanja forme " + error.details[0].message});
            return;
        }

        const rating = await Rating.findByPk(req.params.id);
        rating.title = req.body.title;
        rating.ratingValue = req.body.ratingValue;
        rating.published = req.body.published;
        rating.publishedAt = req.body.publishedAt;
        rating.content = req.body.content;


        await rating.save();

        return res.json(rating);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});


route.delete('/delete/:id', async (req, res) => {

    try{
        const rating = await Rating.findByPk(req.params.id);
        await rating.destroy();
        return res.json(rating);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

module.exports = route;