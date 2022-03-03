const { Router } = require('express');
const { getProduct, getSingleProduct, sortByCategory, sortByType, addProductToStore, editProduct, deleteProduct } = require('../src/controllers/store.controller');

const router = Router();

router.get('/', getProduct)
router.get('/:id', getSingleProduct)
router.post('/category', sortByCategory)
router.post('/type', sortByType)
router.post('/', addProductToStore)
router.put('/:id', editProduct)
router.delete('/:id', deleteProduct)

module.exports.storeRoute = router