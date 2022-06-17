const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect("mongodb+srv://titoortizcr:dgFLMmvk9N7oosrV@cluster0.bxom9eu.mongodb.net/node-angular?retryWrites=true&w=majority")
    .then(() => {
        console.log('Connect to database!');
    }).catch(() => {
        console.log('Connection fail!');
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", 
    "Origin, X-Request-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", 
    "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});

app.post("/api/posts", (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
    });
    post.save();
    res.status(201).json({
        message: 'Post added successfuly'
    });
});

app.use('/api/posts',(req, res, next) => {
    Post.find()
        .then((documents) =>{
            res.status(200).json({
                message: 'posts fetche succesfully',
                posts: documents
            });
        })
        .catch();
});

module.exports = app;