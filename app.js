/*
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
*/

// Relationship Introduction

// embedding
/*
const express = require('express');
const app = express();
const userModel = require("./models/user-model");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/create', async (req, res) => {
    let createdUser = await userModel.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })

    res.send(createdUser);
});

app.post("/:username/create/post", async (req, res) => {
    let user = await userModel.findOne({ username: req.params.username });
    user.posts.push({content: "ye mera dursa post hai"});
    await user.save();
    res.send(user);
})

app.listen(3000);

*/

// referencing

const express = require('express');
const app = express();
const userModel = require("./models/user-model");
const postModel = require("./models/post-model");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/create', async (req, res) => {
    let createdUser = await userModel.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })

    res.send(createdUser);
});

app.post("/:username/create/post", async (req, res) => {
    let user = await userModel.findOne({ username: req.params.username });
    
    let createdPost = await postModel.create({
        content: "ye mera ref ka post hai",
        user: user._id
    })

    user.posts.push(createdPost._id);
    await user.save();
    res.send({user, createdPost});
})

app.get("/posts", async function (req, res) {
    let posts = await postModel.find().populate("user");
    res.send(posts);
})

app.get("/users", async function (req, res) {
    let users = await userModel.find().populate("posts");
    res.send(users);
})
app.listen(3000);