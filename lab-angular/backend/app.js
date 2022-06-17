const express = require('express');

const app = express();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", 
    "Origin, X-Request-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", 
    "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});

app.use('/api/posts',(req, res, next) => {
    const posts = [
        {
            id: '1851454',
            title: 'first post',
            content: 'content'
        },
        {
            id: '1851454',
            title: 'second post',
            content: 'content'
        }
    ];
    return res.status(200).json({
        message: 'posts fetche succesfully',
        posts: posts
    });
});

module.exports = app;