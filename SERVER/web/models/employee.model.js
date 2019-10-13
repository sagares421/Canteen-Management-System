const RESPONSES = require('../../_constants/responses');
const jwt = require('../../_service/jwt');
const bcrypt = require('../../_service/bcrypt');
const EmployeeSchema = require('../../_model/employee.schema');
const teams = [
    {
        first_name: 'John',
        last_name: 'Doe',
        email: 'admin@test.com',
        phone: '+91 9999999999',
        role: 1,
        password: bcrypt.hashPassword('test')
    },
    {
        first_name: 'John',
        last_name: 'Doe',
        email: 'user@test.com',
        phone: '+91 9999999999',
        role: 0,
        password: bcrypt.hashPassword('test')
    }
];


class Employee {

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
        this.onload();
    };

    /**
     * @Todo: Insert Admin if no admin available
     * @param {*} req 
     * @param {*} res 
     */
    onload() {
        EmployeeSchema
            .find({})
            .exec((err, doc) => {
                if (err) {
                    console.log('Error: Unable to insert Admin');
                } else if (doc.length === 0) {
                    for (var i = 0; i < teams.length; i++) {
                        new EmployeeSchema(teams[i]).save((err, doc) => {
                            if (err) {
                                console.log('Error: Unable to insert Users', err);
                            }
                        });
                    }
                    console.log('Message: Users Added Succesfully, Use below schema to login & Check Your MongoDB with name "canteen"');
                    console.log('Object:', [{email: 'admin@test.com',password: 'test'},{email: 'user@test.com',password: 'test'}]);
                } else {
                    console.log('Message: Users Available');
                }
            });
    }

    /**
     * @Todo: Login Employee
     * @param {*} req 
     * @param {*} res 
     */
    loginEmployee(req, res) {
        EmployeeSchema.findOne({
            'email': req.body.email
        }, 'first_name last_name email role password', (err, doc) => {
            if (err) {
                res.status(400).json(RESPONSES.INTERNAL_ERROR(err));
            } else if (doc === null) {
                res.status(200).json({
                    success: false,
                    status: 400,
                    message: 'The email address you entered is incorrect. Please try again.'
                });
            } else {
                if (bcrypt.comparePassword(req.body.password, doc.password)) {
                    res.status(200).json(
                        {
                            success: true,
                            status: 200,
                            id: doc._id,
                            username: `${doc.first_name} ${doc.last_name}`,
                            firstName: doc.first_name,
                            lastName: doc.last_name,
                            role: doc.role,
                            token: `${jwt.signWebToken({
                                _id: doc._id,
                                first_name: doc.first_name,
                                last_name: doc.last_name,
                                email: doc.email,
                                role: doc.role,
                            })}`
                        });
                } else {
                    res.status(400).json({
                        success: false,
                        status: 400,
                        message: 'Password is incorrect. Please try again.'
                    });
                };
            };
        });
    };

    /**
     * @Todo: Add Employee
     * @param {*} req 
     * @param {*} res 
     */
    registrationEmployee(req, res) {
        new EmployeeSchema(req.body).save((err, doc) => {
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
     * @Todo: List all Users
     * @param {*} req 
     * @param {*} res 
     */
    getAllUsers(req, res) {
        EmployeeSchema.find({ role: 0 }).select('first_name last_name email role is_active').exec((err, doc) => {
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
     * @Todo: List all Admins
     * @param {*} req 
     * @param {*} res 
     */
    getAllAdmins(req, res) {
        EmployeeSchema.find({ role: 1 }).select('first_name last_name email role is_active').exec((err, doc) => {
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
     * @Todo: Get a User
     * @param {*} req 
     * @param {*} res 
     */
    getOneUser(req, res) {
        EmployeeSchema.findById({
            _id: req.params.id,
            role: 0
        }, 'first_name last_name email role is_active').exec((err, doc) => {
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
     * @Todo: Get a Admin
     * @param {*} req 
     * @param {*} res 
     */
    getOneAdmin(req, res) {
        EmployeeSchema.findById({
            _id: req.params.id,
            role: 1
        }, 'first_name last_name email role is_active').exec((err, doc) => {
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
     * @Todo: Update a Employee
     * @param {*} req 
     * @param {*} res 
     */
    updateEmployee(req, res) {
        EmployeeSchema.findByIdAndUpdate({
            _id: req.params.id
        }, {
            $set: {
                'first_name': req.body.first_name,
                'last_name': req.body.last_name,
                'email': req.body.email,
                'phone': req.body.phone,
                'updated_by': req.body.updated_by,
                'updated_at': new Date()
            }
        }).exec((err, doc) => {
            if (err) {
                res.status(400).json(RESPONSES.INTERNAL_ERROR(err));
            } else {
                res.status(200).json({
                    success: true,
                    status: 200,
                    message: 'Updated Successfully!',
                    id: doc.id
                });
            }
        });
    }

    /**
     * @Todo: Update a Employee Balance
     * @param {*} req 
     * @param {*} res 
     */
    updateEmployeeBalance(req, res) {
        EmployeeSchema.findByIdAndUpdate({
            _id: req.params.id
        }, {
            $set: {
                'balance': req.body.balance,
                'updated_by': req.body.updated_by,
                'updated_at': new Date()
            }
        }).exec((err, doc) => {
            if (err) {
                res.status(400).json(RESPONSES.INTERNAL_ERROR(err));
            } else {
                res.status(200).json({
                    success: true,
                    status: 200,
                    message: 'Updated Balance Successfully!',
                    id: doc.id
                });
            }
        });
    }

    /**
     * @Todo: Deactivate Employee
     * @param {*} req 
     * @param {*} res 
     */
    updateEmployeeActivate(req, res) {
        EmployeeSchema.findByIdAndUpdate({
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
                    success: true,
                    status: 200,
                    message: 'Updated Successfully!',
                    id: doc.id
                });
            }
        });
    }

    /**
     * @Todo: Deactivate Employee
     * @param {*} req 
     * @param {*} res 
     */
    softDeleteEmployee(req, res) {
        EmployeeSchema.findByIdAndUpdate({
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
                    success: true,
                    status: 200,
                    message: 'Updated Successfully!',
                    id: doc.id
                });
            }
        });
    }
    /**
     * @Todo: Delete a Employee
     * @param {*} req 
     * @param {*} res 
     */
    hardDeleteEmployee(req, res) {
        EmployeeSchema.findByIdAndRemove({
            _id: req.params.id
        }).exec((err, doc) => {
            if (err) {
                res.status(400).json(RESPONSES.INTERNAL_ERROR(err));
            } else if (doc === null) {
                res.status(200).json(RESPONSES.RECORDS_NOT_FOUND);
            } else {
                res.status(200).json({
                    success: true,
                    status: 200,
                    message: 'Deleted Successfully!',
                    id: doc.id
                });
            }
        });
    }

};

module.exports = Employee;