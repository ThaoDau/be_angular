import Categories from '../models/category';
import { categorySchema } from '../schema/product';

export const getAll = async(req,res)=>{
    try {
        const categories = await Categories.find();
        return res.status(200).json(
            categories
        )
    } catch (error) {
        return res.status(404).json({message: error.message});
    }
}
export const get = async(req,res)=>{
    try {
        const categories = await Categories.findById(req.params.id);
        if(categories){
            return res.status(200).json({
                message: 'Lấy danh muc thành công',
                categories
            })
        }else{
            return res.status(404).json({
                message: 'danh muc đã được xóa hoặc không tồn tại'
            })
        }
        
    } catch (error) {
        return res.status(404).json({message: error.message});
    }
}
export const create = async(req,res)=>{
    try {
        const {error} = await categorySchema.validate(req.body,{abortEarly: false})
        if(error){
            return res.status(404).json({message: error.details.map(err => err.message)})
        }
        const categories = await Categories.create(req.body);
        return res.status(200).json({
            message: 'Thêm danh muc thành công',
            categories
        })
    } catch (error) {
        return res.status(404).json({message: error.message});
    }
}
export const remove = async(req,res)=>{
    try {
        const categories = await Categories.findByIdAndDelete(req.params.id);
        if(!categories){
            return res.status(404).json({
                message: 'Không tồn tại hoặc đã bị xóa',
            })
        }
        return res.status(200).json({
            message: 'Xóa danh muc thành công',
            categories
        })
    } catch (error) {
        return res.status(404).json({message: error.message});
    }
}
export const update = async(req,res)=>{
    try {
        const {error} = await categorySchema.validate(req.body,{abortEarly: false})
        if(error){
            return res.status(404).json({message: error.details.map(err => err.message)})
        }
        const categories = await Categories.findByIdAndUpdate(req.params.id,req.body,{new: true});
        return res.status(200).json({
            message: 'Update danh muc  thành công',
            categories
        })
    } catch (error) {
        return res.status(404).json({message: error.message});
    }
}