const Joi = require('joi');

module.exports = {

    createItem:{
        body: {
            name: Joi.string().required(),
            price: Joi.number().required(),
            type: Joi.number().required()
        }
    },
    updateItem: {
        body: {
            name: Joi.string().required(),
            price: Joi.number().required(),
            type: Joi.number().required()
        }
    },
    activate:{
        body: {
            is_active: Joi.boolean().required().default(true)
        }
    }
}