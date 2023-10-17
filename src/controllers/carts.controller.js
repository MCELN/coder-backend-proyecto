const { Router } = require('express');
const cartsService = require('../services/carts.service');

const router = Router();

router.get('/', async (req, res) => {
    try {
        const carts = await cartsService.getAll();
        res.json({ status: 'success', payload: carts });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'error', error: 'Internal error' });
    }
});

router.get('/:cid', async (req, res) => {
    try {
        const cart = await cartsService.getById(req.params.cid);
        res.json({ status: 'success', payload: cart });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'error', error: 'Internal error' });
    }
})

router.post('/', async (req, res) => {
    try {
        const response = await cartsService.create();
        res.status(201).json({ status: 'success', payload: response });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'error', error: 'Internal error' });
    }
})

router.put('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const qty = req.body.quantity;
        const response = await cartsService.insertOne(cid, pid, qty);
        if (response === 400) return res.status(400).json({ status: 'error', error: 'Bad request' });
        if (response === 'Out of stock') return res.status(404).json({ status: 'error', error: 'Out of stock' });
        res.status(201).json({ status: 'success', payload: response });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'error', error: 'Internal error' });
    }
})

router.delete('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const response = await cartsService.deleteOneProduct(cid, pid);
        res.json({ status: 'success', payload: `${response} ha sido eliminado del carrito` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'error', error: 'Internal error' });
    }
})

router.delete('/:cid/products', async (req, res) => {
    try {
        await cartsService.deleteAllProduct(req.params.cid);
        res.json({ status: 'success', payload: 'Su carrito está vacío.' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'error', error: 'Internal error' });
    }
})

module.exports = router;