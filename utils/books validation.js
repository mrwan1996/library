import Joi from "joi";

export const booksvalidator ={
    body:Joi.object().required().keys({
        name:Joi.string().required(),
        section:Joi.string().required()
    })
}