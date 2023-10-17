const { Router } = require('express');
const productsService = require('../services/products.service');

const router = Router();

router.get('/', async (req, res) => {
    try {
        const products = await productsService.getAll();
        res.json({ status: 'success', payload: products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'Error', error: 'Internal error' });
    }
})

router.get('/:pid', async (req, res) => {
    try {
        const product = await productsService.getById(req.params.pid);
        if (!product) return res.status(400).json({ status: 'Error', error: 'Producto no encontrado.' });
        res.json({ status: 'success', payload: product });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'Error', error: 'Internal error' });
    }
})

router.post('/', async (req, res) => {
    try {
        const newProduct = await productsService.create(req.body);
        if (newProduct === 400) return res.status(400).json({ status: 'error', Error: 'Bad Request' });
        res.json({ status: 'success', payload: newProduct });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'Error', error: 'Internal error' });
    }
})

router.put('/:pid', async (req, res) => {
    try {
        const productUpdate = await productsService.updateOne(req.params.pid, req.body);
        if (productUpdate === 400) return res.status(400).json({ status: 'Error', error: 'Bad request' });
        res.json({ status: 'success', payload: productUpdate });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'Error', error: 'Internal error' });
    }
})

router.delete('/:pid', async (req, res) => {
    try {
        await productsService.deleteOne(req.params.pid);
        res.json({ status: 'success' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'Error', error: 'Internal error' });
    }
})

module.exports = router;