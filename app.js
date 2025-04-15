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

    let error = validateModel({name, username, age, contact, email});
    if(error) return res.status(500).send(error.message);

    let user = new userModel({name, username, age, contact, email});
    await user.save();

    res.send("Every thing work good and saved");
})

app.listen(3000);