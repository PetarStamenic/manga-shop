const express = require('express');
const {sequelize, User} = require("./models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();


var corsOptions = {
    origin: '*',
    optionSuccessStatus: 200
}

app.use(express.json())
app.use(cors(corsOptions));

app.post('/register', (req, res) => {

    const obj = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email,
        vendor: req.body.vendor,
        mobile: req.body.mobile
    }

    console.log("ovde")

    User.create(obj).then(rows => {

        const user = {
            userID: rows.id,
            email: rows.email
        }

        const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
        console.log("i ovde")
        console.log(token);

        res.send({token: token})

    }).catch(err => res.status(500).send(err));

});

app.post('/login', (req, res) => {


    console.log(req.body.email);

    User.findOne({where: {email: req.body.email}})
        .then(user => {
            console.log("user:"+user)
            console.log(user)
            if(bcrypt.compareSync(req.body.password, user.passwordHash)){
                const obj = {
                    userID: user.id,
                    email: user.email
                };

                const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);

                res.send({token: token});
            }else{
                res.status(400).json({msg: "Invalid credentials"});
            }
        }).catch(err => {console.log(err); res.status(500).json(err)});


});




app.listen({port: 9000}, async () => {
    await sequelize.authenticate();
});