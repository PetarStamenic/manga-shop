const express = require("express");
const {sequelize, Transaction} = require("../models");

const route = express.Router();

route.use(express.json());

route.use(express.urlencoded({extended: true}));

const {transactionValidator} = require("../validation");

route.get("/", async (req, res) => {
    try{
        const transaction = await Transaction.findAll();
        return res.json(transaction);
    }catch(err){
        res.status(500).json({error:"Greska", body:err});
    }

});


route.get("/:id", async (req, res) => {
    try{
        const transaction = await Transaction.findByPk(req.params.id);
        return res.json(transaction);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

route.post('/add', async (req, res) => {
    try{
        const {error, succ} = transactionValidator.validate(req.body);
        if(error){
            res.status(400).json({msg: "Greska prilikom popunjavanja forme " + error.details[0].message});
            return;
        }
        const newTransaction = await Transaction.create(req.body);
        res.json(newTransaction);

    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

route.put('/edit/:id', async (req, res) => {
    try{
        const {error, succ} = transactionValidator.validate(req.body);
        if(error){
            res.status(400).json({msg: "Greska prilikom popunjavanja forme " + error.details[0].message});
            return;
        }

        const transaction = await Transaction.findByPk(req.params.id);
        transaction.code = req.body.code;
        transaction.type = req.body.type;
        transaction.mode = req.body.mode;
        transaction.status = req.body.status;
        transaction.content = req.body.content;


        await transaction.save();

        return res.json(transaction);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});


route.delete('/delete/:id', async (req, res) => {

    try{
        const transaction = await Transaction.findByPk(req.params.id);
        await transaction.destroy();
        return res.json(transaction);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

module.exports = route;