const express = require('express');
const Product = require('../models/Product');
const router = express.Router();


router.get('/products', async (req, res) => {
    const products = await Product.findAll();
    res.json(products);
});

router.post('/products', async (req, res) => {
    const product = await Product.create(req.body);
    res.status(201).json(product);
});


router.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    await Product.update(req.body, { where: { id } });
    res.json({ message: 'Produto atualizado com sucesso' });
});

router.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    await Product.destroy({ where: { id } });
    res.json({ message: 'Produto deletado com sucesso' });
});

module.exports = router;
