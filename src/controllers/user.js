import User from "../models/user";
import { signupSchema,signinSchema } from "../schema/user";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

export const signup =async (req,res)=>{
    try {
        const {error} = await signupSchema.validate(req.body,{abortEarly: false})
        if(error){
            return res.status(404).json({message: error.details.map(err => err.message)})
        }
        const userExist = await User.findOne({email:req.body.email})
        if(userExist){
            return res.status(404).json({
                message: "Tài khoản đã tồn tại"
            })
        }
        const hashed = await bcrypt.hash(req.body.password,10);
        const user = await User.create({
            name:req.body.name,
            email:req.body.email,
            password:hashed
        })
        return res.status(200).json({
            message: "Tạo tài khoản thành công",
            user,
        })
    } catch (error) {
        return res.status(404).json({message: error.message})
    }
}
export const signin =async (req,res)=>{
    try {
        const {error} = await signinSchema.validate(req.body,{abortEarly: false})
        if(error){
            return res.status(404).json({message: error.details.map(err => err.message)})
        }
        const user = await User.findOne({email:req.body.email})
        if(!user){
            return res.status(404).json({
                message: "Tài khoản chưa có "
            })
        }
        const isMatch = await bcrypt.compare(req.body.password,user.password);
        if(!isMatch){
            return res.status(404).json({message: 'Mật khẩu không đúng'})
        }
        const token = await jwt.sign({id: user._id},"thaodpph22185",{expiresIn: '1d'});
        
        return res.status(200).json({
            message: "Đăng nhập thành công ",
            accessToken: token,
            user,
        })
    } catch (error) {
        return res.status(404).json({message: error.message})
    }
}