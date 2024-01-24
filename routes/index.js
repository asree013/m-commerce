const express = require('express');
const route = express.Router()
const path = require('path');

    const headPath = path.join(__dirname, '../view/page/');

route.get('/', (req, res) => {
    res.sendFile('index.html');
});

route.get('/chat', (req, res) => {
    res.sendFile(headPath+ 'chat.html');
})
route.get('/login', (req, res) => {
    res.sendFile(headPath+ 'login.html');
})
route.get('/register', (req, res) => {
    res.sendFile(headPath + 'register.html')
})

module.exports = route
