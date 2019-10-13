const ItemSchema = require('../../_model/item.schema');
const RESPONSES = require('../../_constants/responses');

class Item {

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
     * @Todo: List all Items
     * @param {*} req 
     * @param {*} res 
     */
    getAllItems(req, res) {
        ItemSchema.find({}).select('name price type is_active created_at').exec((err, doc) => {
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
     * @Todo: Get a Item
     * @param {*} req 
     * @param {*} res 
     */
    getOneItem(req, res) {
        ItemSchema.findById({
            _id: req.params.id
        }, 'name price type, is_active created_at').exec((err, doc) => {
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
     * @Todo: Add Item
     * @param {*} req 
     * @param {*} res 
     */
    addItem(req, res) {
        new ItemSchema(req.body).save((err, doc) => {
            if (err) {
                res.status(400).json(RESPONSES.INTERNAL_ERROR(err));
            } else {
                res.status(200).json({
                    status: 200,
                    success: true,
                    message: 'Added Successfully!'
                });
            }
        });
    };

    /**
     * @Todo: Update a Item
     * @param {*} req 
     * @param {*} res 
     */
    updateItem(req, res) {
        ItemSchema.findByIdAndUpdate({
            _id: req.params.id
        }, {
            $set: {
                'name': req.body.name,
                'price': req.body.price,
                'type': req.body.type,
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
                    message: 'Updated Successfully!',
                    id: doc.id
                });
            }
        });
    }

    /**
     * @Todo: Activate a Item
     * @param {*} req 
     * @param {*} res 
     */
    updateItemActivate(req, res) {
        ItemSchema.findByIdAndUpdate({
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
     * @Todo: Soft Delete/ Deactivate Item
     * @param {*} req 
     * @param {*} res 
     */
    softDeleteItem(req, res) {
        ItemSchema.findByIdAndUpdate({
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
     * @Todo: Hard Delete a Item
     * @param {*} req 
     * @param {*} res 
     */
    hardDeleteItem(req, res) {
        ItemSchema.findByIdAndRemove({
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

module.exports = Item;