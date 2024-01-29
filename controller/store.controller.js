const express = require('express')
const app = express.Router()
const db = require('../config/db')

app.get('/store', async(req, res) => {
    try {
        const result = await db.stores.findMany({
            include: {
                user: true
            }
        })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
})

app.get('/store/:id', async(req, res) => {
    try {
        const id = req.params.id
        const result = await db.stores.findFirst({
            where: {
                id: id
            }
        })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
})

app.get('/user/:user_id/store', async(req, res) => {
    try {
        const user_id = req.params.user_id
        const result = await db.stores.findMany({
            where: {
                user_id: user_id
            }
        })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
})

app.delete('/store/:id', async(req, res) => {
    try {
        const id = req.params.id
        const result = await db.stores.delete({
            where: {
                id: id
            }
        })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
})

app.post('/store', async(req, res) => {
    try {
        const data = {
            name: req.body.name,
            detail: req.body.detail,
            address: req.body.address,
            province: req.body.province,
            district: req.body.district,
            aumpher: req.body.aumpher,
            zip_code: req.body.zip_code,
            image_store: req.body.image_store,
            user_id: req.body.user_id,
        }
        const result = await db.stores.create({
            data: data
        })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
})

app.put('/store/:id', async(req, res) => {
    try {
        const data = {
            name: req.body.name,
            detail: req.body.detail,
            address: req.body.address,
            province: req.body.province,
            district: req.body.district,
            aumpher: req.body.aumpher,
            zip_code: req.body.zip_code,
            image_store: req.body.image_store,
            user_id: req.body.user_id,
        }
        const result = await db.stores.update({
            where: {
                id: req.params.id
            },
            data: data
        })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = app