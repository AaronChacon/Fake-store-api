const express = require('express');
const router = express.Router();

// example: /categories/12/products/23
router.get('/:categoryId/products/:productId', (req, res) => {
    const {categoryId, productId} = req.params;
    res.json({
        categoryId,
        productId,
    })
});

module.exports = router;