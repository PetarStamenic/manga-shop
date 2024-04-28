const express = require("express");
const {sequelize, Product} = require("../models");
const {Product_Category} = require("../models")

const route = express.Router();

route.use(express.json());

route.use(express.urlencoded({extended: true}));

const {productValidator} = require("../validation");

route.get("/", async (req, res) => {
    try{
        const products = await Product.findAll({attributes:['id', 'userId', 'title', 'metaTitle', 'slug', 'summary', 'type', 'price', 'discount', 'quantity', 'forSale', 'publishedAt', 'saleStartsAt', 'saleEndsAt', 'content', 'createdAt', 'updatedAt']})
        return res.json(products);
    }catch(err){
        res.status(500).json({error:"Greska", body:err});
    }

});

route.get("/category/:id",async (req,res)=>{
    try {
        const ids = await Product_Category.findAll({where: {categoryId:req.params.id}})
        result1 = [];
        for (const prodId of ids) {
            console.log(prodId);
            const product = await Product.findByPk(prodId.productId,{attributes:['id', 'userId', 'title', 'metaTitle', 'slug', 'summary', 'type', 'price', 'discount', 'quantity', 'forSale', 'publishedAt', 'saleStartsAt', 'saleEndsAt', 'content', 'createdAt', 'updatedAt']});
            if(product.quantity>0)
                result1.push(product);
        }
        return res.json(result1);
    } catch (err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }
});

route.get("/q=:sq", async (req, res) => {
    try{
        const q = req.params.sq
        console.log(q);
        q.replace("%20"," ");
        const product = await Product.findAll({attributes:['id', 'userId', 'title', 'metaTitle', 'slug', 'summary', 'type', 'price', 'discount', 'quantity', 'forSale', 'publishedAt', 'saleStartsAt', 'saleEndsAt', 'content', 'createdAt', 'updatedAt']})
        const array1 = [];
        product.forEach(element =>{
            if(element.title.toLowerCase().includes(q.toLowerCase()))
                array1.push(element)
            }
        )
        return res.json(array1);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

route.get("/:id", async (req, res) => {
    try{
        console.log("ovde ulazi");
        const product = await Product.findByPk(req.params.id,{attributes:['id', 'userId', 'title', 'metaTitle', 'slug', 'summary', 'type', 'price', 'discount', 'quantity', 'forSale', 'publishedAt', 'saleStartsAt', 'saleEndsAt', 'content', 'createdAt', 'updatedAt']});
        return res.json(product);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

route.post('/add', async (req, res) => {
    try{
        const {error, succ} = productValidator.validate(req.body);
        if(error){
            res.status(400).json({msg: "Greska prilikom popunjavanja forme " + error.details[0].message});
            return;
        }
        const newProduct = await Product.create(req.body);
        res.json(newProduct);

    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

route.put('/edit/:id', async (req, res) => {
    try{
        const {error, succ} = productValidator.validate(req.body);
        if(error){
            res.status(400).json({msg: "Greska prilikom popunjavanja forme " + error.details[0].message});
            return;
        }

        const product = await Product.findByPk(req.params.id);
        product.userId = req.body.userId;
        product.title = req.body.title;
        product.metaTitle = req.body.metaTitle;
        product.slug = req.body.slug;
        product.summary = req.body.summary;
        product.type = req.body.type;
        product.price = req.body.price;
        product.discount = req.body.discount;
        product.quantity = req.body.quantity;
        product.forSale = req.body.forSale;
        product.publishedAt = req.body.publishedAt;
        product.saleStartsAt = req.body.saleStartsAt;
        product.saleEndsAt = req.body.saleEndsAt;
        product.content = req.body.content;


        await product.save();

        return res.json(product);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});


route.delete('/delete/:id', async (req, res) => {

    try{
        const product = await Product.findByPk(req.params.id);
        await product.destroy();
        return res.json(product);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Greska", data: err});
    }

});

module.exports = route;