const express = require('express')
const app = express.Router()
const db = require('../config/db')

app.get('/category', async(req, res) => { 
    try {
        const result = await db.category.findMany({})
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
})

app.get('/category/:id', async(req, res) => { 
    try {
        const id = req.params.id
        const result = await db.category.findFirst({
            where: {
                id: id
            }
        })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
})

app.post('/category', async(req, res) => {
    try {
        const data = {
            name: req.body.name,
            detail: req.body.detail
        }
        const result = await db.category.create({
            data: data
        })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
})

app.put('/category/:id', async(req, res) => {
    try {
        const id = req.params.id
        const data = {
            name: req.body.name,
            detail: req.body.detail
        }
        const result = await db.category.update({
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

app.delete('/category/:id', async(req, res) => {
    try {
        const id = req.params.id
        const data = {
            name: req.body.name,
            detail: req.body.detail
        }
        const result = await db.category.delete({
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