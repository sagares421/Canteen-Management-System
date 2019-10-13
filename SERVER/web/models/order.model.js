const OrderSchema = require('../../_model/order.schema');
const RESPONSES = require('../../_constants/responses');

class Order {

    constructor() {
        this.defaults = {};
        this.ErrorHandler = (res, message = null, err = null, data = null) => {
            res.status(400).json({
                success: false,
                message: message,
                error: err,
                data: data
            });
        };
    };

    /**
     * @Todo: List all Orders
     * @param {*} req 
     * @param {*} res 
     */
    getAllOrders(req, res) {
        OrderSchema.find({}).select('order_id employee_id items_id status is_active created_at').exec((err, doc) => {
            if (err) {
                res.status(400).json(RESPONSES.INTERNAL_ERROR(err));
            } else if (doc === null) {
                res.status(200).json(RESPONSES.RECORDS_NOT_FOUND);
            } else {
                res.status(200).json({
                    success: true,
                    status: 200,
                    data: doc
                });
            }
        });
    };

    /**
     * @Todo: Get a Patient
     * @param {*} req 
     * @param {*} res 
     */
    getOneOrder(req, res) {
        OrderSchema.findById({
            _id: req.params.id
        }, 'order_id employee_id items_id status is_active created_at').exec( (err, doc) => {
            if (err) {
                res.status(400).json(RESPONSES.INTERNAL_ERROR(err));
            } else if (doc === null) {
                res.status(200).json(RESPONSES.RECORDS_NOT_FOUND);
            } else {
                res.status(200).json({
                    status: 200,
                    success: true,
                    data: doc
                });
            }
        });
    };

    /**
     * @Todo: List all Employee Orders
     * @param {*} req 
     * @param {*} res 
     */
    getAllEmployeeOrders(req, res) {
        OrderSchema.find({employee_id: req.session.id}).select('order_id employee_id items_id status is_active created_at').exec((err, doc) => {
            if (err) {
                res.status(400).json(RESPONSES.INTERNAL_ERROR(err));
            } else if (doc === null) {
                res.status(200).json(RESPONSES.RECORDS_NOT_FOUND);
            } else {
                res.status(200).json({
                    success: true,
                    status: 200,
                    data: doc
                });
            }
        });
    };

    /**
     * @Todo: Get one employee order
     * @param {*} req 
     * @param {*} res 
     */
    getOneEmployeeOrder(req, res) {
        OrderSchema.findById({
            _id: req.params.id,
            employee_id: req.session.id
        }, 'order_id employee_id items_id status is_active created_at').exec( (err, doc) => {
            if (err) {
                res.status(400).json(RESPONSES.INTERNAL_ERROR(err));
            } else if (doc === null) {
                res.status(200).json(RESPONSES.RECORDS_NOT_FOUND);
            } else {
                res.status(200).json({
                    status: 200,
                    success: true,
                    data: doc
                });
            }
        });
    };

    /**
     * @Todo: Add Order
     * @param {*} req 
     * @param {*} res 
     */
    addOrder(req, res) {
        new OrderSchema(req.body).save( (err, doc) => {
            if (err) {
                res.status(400).json(RESPONSES.INTERNAL_ERROR(err));
            } else {
                res.status(200).json({
                    success: true,
                    status: 200,
                    message: 'Added Successfully!'
                });
            }
        });
    };

    /**
     * @Todo: Activate a Order
     * @param {*} req 
     * @param {*} res 
     */
    updateOrderActivate(req, res) {
        OrderSchema.findByIdAndUpdate({
            _id: req.params.id
        }, {
            $set: {
                'is_active': true,
                'updated_by': req.body.updated_by,
                'updated_at': new Date()
            }
        }).exec((err, doc) => {
            if (err) {
                res.status(400).json(RESPONSES.INTERNAL_ERROR(err));
            } else {
                res.status(200).json({
                    status: 200,
                    success: true,
                    message: 'Activated Successfully!',
                    id: doc.id
                });
            }
        });
    }

    /**
     * @Todo: Soft Delete/ Deactivate Order
     * @param {*} req 
     * @param {*} res 
     */
    softDeleteOrder(req, res) {
        OrderSchema.findByIdAndUpdate({
            _id: req.params.id
        }, {
            $set: {
                'is_active': false,
                'updated_by': req.body.updated_by,
                'updated_at': new Date()
            }
        }).exec((err, doc) => {
            if (err) {
                res.status(400).json(RESPONSES.INTERNAL_ERROR(err));
            } else {
                res.status(200).json({
                    status: 200,
                    success: true,
                    message: 'Activated Successfully!',
                    id: doc.id
                });
            }
        });
    }

    /**
     * @Todo: Hard Delete a Order
     * @param {*} req 
     * @param {*} res 
     */
    hardDeleteOrder(req, res) {
        OrderSchema.findByIdAndRemove({
            _id: req.params.id
        }).exec((err, doc) => {
            if (err) {
                res.status(400).json(RESPONSES.INTERNAL_ERROR(err));
            } else if (doc === null) {
                res.status(200).json(RESPONSES.RECORDS_NOT_FOUND);
            } else {
                res.status(200).json({
                    status: 200,
                    success: true,
                    message: 'Deleted Successfully!',
                    id: doc.id
                });
            }
        });
    }
};

module.exports = Order;