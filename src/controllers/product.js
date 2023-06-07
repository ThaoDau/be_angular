import Product from '../models/product';
import { productSchema } from '../schema/product';

export const getAll = async(req,res)=>{
    try {
        const products = await Product.find();
        return res.status(200).json(
            products
        )
    } catch (error) {
        return res.status(404).json({message: error.message});
    }
}
export const get = async(req,res)=>{
    try {
        const products = await Product.findById(req.params.id);
        if(products){
            return res.status(200).json({
                message: 'Lấy sản phẩm thành công',
                products
            })
        }else{
            return res.status(404).json({
                message: 'Sản phẩm đã được xóa hoặc không tồn tại'
            })
        }
        
    } catch (error) {
        return res.status(404).json({message: error.message});
    }
}
export const create = async(req,res)=>{
    try {
        const {error} = await productSchema.validate(req.body,{abortEarly: false})
        if(error){
            return res.status(404).json({message: error.details.map(err => err.message)})
        }
        const product = await Product.create(req.body);
        return res.status(200).json({
            message: 'Thêm sản phẩm thành công',
            product
        })
    } catch (error) {
        return res.status(404).json({message: error.message});
    }
}
export const remove = async(req,res)=>{
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if(!product){
            return res.status(404).json({
                message: 'Không tồn tại hoặc đã bị xóa',
            })
        }
        return res.status(200).json({
            message: 'Xóa sản phẩm thành công',
            product
        })
    } catch (error) {
        return res.status(404).json({message: error.message});
    }
}
export const update = async(req,res)=>{
    try {
        const {error} = await productSchema.validate(req.body,{abortEarly: false})
        if(error){
            return res.status(404).json({message: error.details.map(err => err.message)})
        }
        const product = await Product.findByIdAndUpdate(req.params.id,req.body,{new: true});
        return res.status(200).json({
            message: 'Update sản phẩm  thành công',
            product
        })
    } catch (error) {
        return res.status(404).json({message: error.message});
    }
}