const Joi = require('joi');

module.exports = {

    loginEmployee:{
        body: {
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
    },
    registrationEmployee:{
        body: {
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().email().required(),
            phone: Joi.string().email().required()
        }
    },
    updateEmployee: {
        body: {
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            phone: Joi.string().required(),
            email: Joi.string().email().required(),
        }
    },
    updateBalance: {
        body: {
            balance: Joi.number().required()
        }
    },
    activate: {
        body: {
            is_active: Joi.boolean().required().default(true)
        }
    }
}