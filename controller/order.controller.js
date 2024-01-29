const express = require('express')
const app = express.Router()
const db = require('../config/db')

app.get('/order', async(req, res) => {
    try {
        const result = await db.orders.findMany({
            include: {
                product_item: true
            }
        })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
})

app.get('/order/:id', async(req, res) => {
    try {
        const result = await db.orders.findFirst({
            where: {
                id: req.params.id
            },
            include: {
                product_item: true
            }
        })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
})

app.delete('/order/:id', async(req, res) => {
    try {
        await db.order_item.deleteMany({
            where: {
                id: req.params.id
            }
        })
        const result = await db.orders.delete({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
})

app.post('/order', async(req, res) => {
    try {
        const data = {
            count: req.body.count
        }
        const order = await db.orders.create({data: data})
        const item = {
            product_id: req.body.product_id,
            order_id: order.id
        }
        const result = await db.order_item.create({data: item})
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
})

app.put('/order/:id', async(req, res) => {
    try {
        const data = {
            count: req.body.count,
            status: req.body.status
        }
        const order = await db.orders.create({data: data})
        res.status(200).json(order)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = app