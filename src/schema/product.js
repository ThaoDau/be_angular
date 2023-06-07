import joi from 'joi';

export const productSchema = joi.object({
    name: joi.string().required(),
    price: joi.number().required(),
    description: joi.string(),
    image:joi.string(),
    size: joi.number(),
    calo: joi.number(),
    idCategory: joi.string(),
}) 