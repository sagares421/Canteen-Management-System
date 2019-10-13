const express = require('express');
const router = express.Router();
const validate = require('express-validation');

const auth = require('../../_middleware/auth');

const OrderValidator = require('../../_validation/order.validate');

const OrderClass = require('../models/order.model');
const Order = new OrderClass();


router.use(auth.isWebValid);

/**
 * @TODO: Get all Orders
 */
router.get('/', Order.getAllOrders);

/**
 * @TODO: Get one Order
 */
router.get('/:id', Order.getOneOrder);

/**
 * @TODO: Get all Employee Orders
 */
router.get('/employee', Order.getAllEmployeeOrders);

/**
 * @TODO: Get one Employee Order
 */
router.get('/employee/:id', Order.getOneEmployeeOrder);

/**
 * @TODO: Add one Order
 */
router.post('/', validate(OrderValidator.createOrder), Order.addOrder);

/**
 * @TODO: Update one Order Status
 */
// router.put('/:id/statue', validate(OrderValidator.updateOrderStatus), Order.updateOrder);

/**
 * @TODO: Activate Order
 */
router.put('/:id/activate', validate(OrderValidator.activate), Order.updateOrderActivate);

/**
 * @TODO: Soft Delete Order
 */
router.delete('/:id', Order.softDeleteOrder);

/**
 * @TODO: Hard Delete Order
 */
router.delete('/:id', Order.hardDeleteOrder);

module.exports = router;