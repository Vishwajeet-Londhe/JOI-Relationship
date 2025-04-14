const express = require('express');
const app = express();
const username = require('./models/user-model');
const userModel = require('./models/user-model');

app.use(express.json());
app.use(express.urlencoded({extented:true}));

app.get('/',function(req,res){
    res.send("chal rha hai");
})

app.post("/create", async function(req,res){
    let user = await userModel.create({
        name:req.body.name
    })

    res.send(user);
})

app.listen(3000);