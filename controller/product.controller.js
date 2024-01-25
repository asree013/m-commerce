const express = require('express')
const app = express.Router()
const db = require('../config/db')


app.get('/product', async(req, res) => {
    try {
        const result = await db.products.findMany({
            include: {
                category: true,
                users: true
            }
        })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
})

app.get('/product/:id', async(req, res) => {
    try {
        const id = req.params.id
        const result = await db.products.findFirst({
            where: {
                id: id
            },
            include: {
                category: true,
                users: true
            }
        })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
})

app.post('/product', async(req, res) => {
    try {
        const data = {
            name: req.body.name,
            price: req.body.price, 
            detail: req.body.detail,
            stock: req.body.stock,
            category_id: req.body.category_id,
            user_id: req.body.user_id
        }
        console.log(data);
        const result = await db.products.create({
            data: data
        })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
})

app.put('/product/:id', async(req, res) => {
    try {
        const id = req.params.id
        const data = {
            name: req.body.name,
            price: req.body.price, 
            detail: req.body.detail,
            stock: req.body.stock,
            category_id: req.body.category,
            user_id: req.body.user_id
        }
        const result = await db.products.update({
            where: {
                id: id
            },
            data: data
        })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
})

app.delete('/product/:id', async(req, res) => {
    try {
        const id = req.params.id
        const result = await db.products.delete({
            where: {
                id: id
            }
        })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = app 