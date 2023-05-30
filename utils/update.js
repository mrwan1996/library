import Joi from "joi";

export const updatevalidator ={
    body:Joi.object().required().keys({
        name:Joi.string().optional().alphanum(),
        number:Joi.string().optional()
    })
}