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
    post.save()
        .then(createdPost => {
            res.status(201).json({
                message: 'Post added successfuly',
                postId: createdPost._id
            });
        });
});

app.get('/api/posts',(req, res, next) => {
    Post.find()
        .then((documents) =>{
            res.status(200).json({
                message: 'posts fetche succesfully',
                posts: documents
            });
        })
        .catch();
});

app.delete('/api/posts/:id', (req, res, next) => {
    console.log(req.params.id);
    Post.deleteOne({ _id: req.params.id })
        .then(result => {
            console.log(result);
            res.status(200).json({ message: "Post deleted!"});
        });
});

module.exports = app;