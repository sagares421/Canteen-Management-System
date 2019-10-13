const Joi = require('joi');

module.exports = {

    createOrder:{
        body: {
            items_id: Joi.array().required(),
            type: Joi.string().optional()
        }
    },
    activate:{
        body: {
            is_active: Joi.boolean().required().default(true)
        }
    }
}