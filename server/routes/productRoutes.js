const express = require('express');
const router = express.Router();
const { Product } = require('../models/Product');

// POST /api/products: Adicionar um novo produto
router.post('/', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET /api/products: Listar todos os produtos
router.get('/', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT /api/products/:id: Atualizar as informações de um produto
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await Product.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedProduct = await Product.findOne({ where: { id: req.params.id } });
            res.json(updatedProduct);
        } else {
            res.status(404).json({ error: 'Produto não encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE /api/products/:id: Excluir um produto
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Product.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Produto não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
