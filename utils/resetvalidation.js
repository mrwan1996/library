import Joi from "joi";

var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
export const resetvalidator ={
    body:Joi.object().required().keys({
        newpassword:Joi.string().required().pattern(mediumRegex).messages({"string.pattern.base":'password must contain'}),
        cpassword:Joi.string().valid(Joi.ref('newpassword')),
    })
}