const express = require("express");
const {sequelize, User} = require("../models");

const route = express.Router();

route.use(express.json());

route.use(express.urlencoded({extended: true}));

const {userValidator} = require("../validation");
const {bool} = require("joi");

route.get("/", async (req, res) => {
    try{
        const users = await User.findAll();
        return res.json(users);
    }catch(err){
        res.status(500).json({error:"Greska", body:err});
    }

});


route.get("/:id", async (req, res) => {
    try{
        const user = await User.findByPk(req.params.id);
        return res.json(user);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

route.post('/add', async (req, res) => {
    try{
        console.log(req.body)
        const {error, succ} = userValidator.validate(req.body);
        if(error){
            res.status(400).json({msg: "Greska prilikom popunjavanja forme " + error.details[0].message});
            return;
        }
        const newUser = await User.create(req.body);
        res.json(newUser);

    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

route.put('/edit/:id', async (req, res) => {
try{
        const {error, succ} = userValidator.validate(req.body);
        if(error){
            res.status(400).json({msg: "Greska prilikom popunjavanja forme " + error.details[0].message});
            return;
        }

        const user = await User.findByPk(req.params.id);
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.vendor = req.body.vendor;
        user.mobile = req.body.mobile;
        user.email = req.body.email;
        user.adress = req.body.adress;
        user.passwordHash = req.body.passwordHash;

        await user.save();

        return res.json(user);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});


route.delete('/delete/:id', async (req, res) => {

    try{
        const user = await User.findByPk(req.params.id);
        await user.destroy();
        return res.json(user);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

module.exports = route;