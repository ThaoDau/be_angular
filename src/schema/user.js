import joi from 'joi';

export const signupSchema = joi.object({
    name: joi.string().required().messages({
        "string.empty": "Trường name không được bỏ trống",
        "any.required": "Trường name bắt buộc",
    }),
    email: joi.string().email().required().messages({
        "string.empty": "Trường email không được bỏ trống",
        "any.required": "Trường email bắt buộc",
        "string.email": "Email không đúng định dạng"
    }),
    password: joi.string().min(6).required().messages({
        "string.empty": "Trường password không được bỏ trống",
        "any.required": "Trường password bắt buộc",
        "string.min": "Cần lớn hơn 6 kí tự"
    }),
    confirmPassword: joi.string().valid(joi.ref("password")).required().messages({
        "string.empty": "Trường confirmPassword không được bỏ trống",
        "any.only": "Mật khẩu không khớp"
    }),
})
export const signinSchema = joi.object({
    email: joi.string().email().required().messages({
        "string.empty": "Trường email không được bỏ trống",
        "any.required": "Trường email bắt buộc",
        "string.email": "Email không đúng định dạng"
    }),
    password: joi.string().min(6).required().messages({
        "string.empty": "Trường password không được bỏ trống",
        "any.required": "Trường password bắt buộc",
        "string.min": "Cần lớn hơn 6 kí tự"
    }),
   
})