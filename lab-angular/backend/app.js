const express = require('express');

const app = express();

app.use('/api/posts',(req, res, next) => {
    const posts = [
        {
            id: '1851454',
            title: 'first post',
            content: 'content'
        }
    ];
    res.status(200).json({
        message: 'posts fetche succesfully',
        post: posts
    });
});

module.exports = app;