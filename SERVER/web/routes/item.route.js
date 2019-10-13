const express = require('express');
const router = express.Router();
const validate = require('express-validation');

const auth = require('../../_middleware/auth');

const ItemValidator = require('../../_validation/item.validate');

const ItemClass = require('../models/item.model');
const Item = new ItemClass();


router.use(auth.isWebValid);

/**
 * @TODO: Get all Items
 */
router.get('/', Item.getAllItems);

/**
 * @TODO: Get one Item
 */
router.get('/:id', Item.getOneItem);

/**
 * @TODO: Add one Item
 */
router.post('/', validate(ItemValidator.createItem), Item.addItem);

/**
 * @TODO: Update one Item
 */
router.put('/:id', validate(ItemValidator.updateItem), Item.updateItem);

/**
 * @TODO: De-Activate Item
 */
router.put('/:id/activate', validate(ItemValidator.activate), Item.updateItemActivate);

/**
 * @TODO: Soft Delete Item
 */
router.delete('/:id', Item.softDeleteItem);

/**
 * @TODO: Hard Delete Item
 */
router.delete('/:id', Item.hardDeleteItem);

module.exports = router;