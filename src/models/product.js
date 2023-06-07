import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name:{type:String, required:true},
    description: {type:String, required: true},
    price:{type:Number, required:true},
    image:{type:String, required:true},
    size: {type:Number, required:true},
    calo: {type:String, required:true},
    idCategory: {type:String},
    
})
export default mongoose.model('Product', productSchema);