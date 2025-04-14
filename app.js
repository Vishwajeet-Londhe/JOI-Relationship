const express = require('express');
const app = express();
const {userModel, validateModel} = require('./models/user-model');

app.use(express.json());
app.use(express.urlencoded({extented:true}));

app.get('/',function(req,res){
    res.send("chal rha hai");
})

app.post("/create", async function(req,res){
    let {name, username, age, contact, email} = req.body;

    validateModel({name, username, age, contact, email});
    res.send("check console");
})

app.listen(3000);