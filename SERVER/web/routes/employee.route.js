const express = require('express');
const router = express.Router();

const validate = require('express-validation');

const auth = require('../../_middleware/auth');

const jwt = require('../../_service/jwt');

const EmployeeValidator = require('../../_validation/employee.validate');
const EmployeeProvider = require('../models/employee.model');
const Employee = new EmployeeProvider();

/**
 * @TODO: Employee Login
 */
router.post('/login', validate(EmployeeValidator.loginEmployee), Employee.loginEmployee);

/**
 * @TODO: Employee Registration
 */
router.post('/registration', validate(EmployeeValidator.registrationEmployee), Employee.registrationEmployee);

/**
 * @TODO: <---------------------------- AUTH ------------------------------>
 */
router.use(auth.isWebValid);

/**
 * @TODO: Get all Employee (!Admin)
 */
router.get('/user', Employee.getAllUsers);

/**
 * @TODO: Get all Admin (!Employee)
 */
router.get('/admin', Employee.getAllAdmins);

/**
 * @TODO: Get one Employee (!Admin)
 */
router.get('/user/:id', Employee.getOneUser);

/**
 * @TODO: Get one Admin (!Employee)
 */
router.get('/admin/:id', Employee.getOneAdmin);

/**
 * @TODO: Update Employee
 */
router.put('/:id', validate(EmployeeValidator.updateEmployee), Employee.updateEmployee);

/**
 * @TODO: Update Employee Balance
 */
router.put('/:id/balance', validate(EmployeeValidator.updateBalance), Employee.updateEmployeeBalance);

/**
 * @TODO: De-Activate Employee
 */
router.put('/:id/activate', validate(EmployeeValidator.activate), Employee.updateEmployeeActivate);

/**
 * @TODO: Soft Delete Employee
 */
router.delete('/:id', Employee.softDeleteEmployee);

/**
 * @TODO: Hard Delete Employee
 */
router.delete('/:id', Employee.hardDeleteEmployee);

module.exports = router;