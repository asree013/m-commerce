const express = require('express')
const app = express.Router()
const db = require('../config/db')


app.get('/product', async (req, res) => {
    try {
        // Get the page number and items per page from query parameters
        const page = parseInt(req.query.page) || 1; // default to page 1 if not provided
        const pageSize = parseInt(req.query.pageSize) || 10; // default to 10 items per page if not provided

        // Calculate the offset based on the page number and items per page
        const offset = (page - 1) * pageSize;

        const result = await db.products.findMany({
            include: {
                category: true,
                store: {
                    include: {
                        user: true
                    }
                }
            },
            skip: offset,       // Skip the specified number of items
            take: pageSize      // Take only the specified number of items
        });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
});

app.get('/user/:user_id/product', async (req, res) => {
    try {
        // Get the page number and items per page from query parameters
        const page = parseInt(req.query.page) || 1; // default to page 1 if not provided
        const pageSize = parseInt(req.query.pageSize) || 10; // default to 10 items per page if not provided

        // Calculate the offset based on the page number and items per page
        const offset = (page - 1) * pageSize;

        const result = await db.products.findMany({
            include: {
                category: true,
                store: true
            },
            where: {
                store: {
                    user_id: req.params.user_id
                }
            },
            skip: offset,       // Skip the specified number of items
            take: pageSize      // Take only the specified number of items
        });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
});

app.get('/product/:id', async(req, res) => {
    try {
        const id = req.params.id
        const result = await db.products.findFirst({
            where: {
                id: id
            },
            include: {
                category: true,
                store: true
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
            store_id: req.body.store_id,
            sku: req.body.sku,
            barcode: req.body.barcode,
            image: req.body.image
        }
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
            category_id: req.body.category_id,
            store_id: req.body.store_id
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