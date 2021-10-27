const express = require('express');
const router = express.Router();

const ProductsService = require('../services/product.services');
const service = new ProductsService();

const { validatorHandler } = require('./../middlewares/validator.handler');
const { getProductSchema, createProductSchema, updateProductSchema, queryProductSchema } = require('../schemas/product.schema');


// GET ALL
router.get('/', 
    validatorHandler(queryProductSchema, 'query'),
    async(req, res, next) => {
        try {
            const products = await service.find(req.query);
            res.json(products);
        } catch (error) {
            next(error);
        }
    }
);

// GET ONE PRODUCT
router.get('/:id', 
    validatorHandler(getProductSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const product = await service.findOne(id);
            res.json(product);
        } catch (error) {
            next(error)
        }
    }
);

// CREATE
router.post('/', 
    validatorHandler(createProductSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const newProduct = await service.create(body);
            res.status(201).json({
                message: 'create',
                data: newProduct
            });
        } catch (error) {
            next(error);
        }
    }
);

// UPDATE ONE ITEM
router.patch('/:id', 
    validatorHandler(getProductSchema, 'params'),
    validatorHandler(updateProductSchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const product = await service.update(id, body);
            res.json({
                message: 'update',
                data: product
            })
            
        } catch (error) {
            next(error)
        }
    }
);

// DELETE ONE ITEM
router.delete('/:id', 
    validatorHandler(getProductSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const response = await service.delete(id);
            res.status(201).json({
                message: 'delete',
                response
            });
            
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;