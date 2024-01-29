const express = require('express');
const route = express.Router()
const path = require('path');
const veryfyToken = require('../middleware/auth.middleware')
const uuid = require('uuid')

const headPath = path.join(__dirname, '../view/page/');

route.get('/', (req, res) => {
    res.sendFile('index.html');
});

route.get('/home', (req, res) => {
    res.sendFile(headPath+ 'home.html');
})

route.get('/chat', (req, res) => {
    res.sendFile(headPath+ 'chat.html');
})
route.get('/login', (req, res) => {
    res.sendFile(headPath+ 'login.html');
})
route.get('/register', (req, res) => {
    res.sendFile(headPath + 'register.html')
})
route.get(`/category/:id`, (req, res) => {
    res.sendFile(headPath + 'category_form.html')
})
route.get('/product/:id', (req, res) => {
    res.sendFile(headPath + 'product_form.html')
})
route.get('/store', (req, res) => {
    res.sendFile(headPath + 'store.html')
})
route.get('/store/:id', (req, res) => {
    res.sendFile(headPath + 'store_form.html')
})
route.get('/product', (req, res) => {
    res.sendFile(headPath+ 'product.html')
})

module.exports = route
