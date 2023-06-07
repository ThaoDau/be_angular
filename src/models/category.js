import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
    name:{type:String, required:true},
    products: {type: String},
    
})
export default mongoose.model('Categories', productSchema);