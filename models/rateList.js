var mongoose=require("mongoose");
var Schema=mongoose.Schema;
const schema=Schema({
    name:{ type: String, required: true},
    category:{type: mongoose.Schema.Types.ObjectId,ref:'category',required: true},
    subcategory:{type: mongoose.Schema.Types.ObjectId,ref:'subcategory',required: true},
    packingsize:{type: mongoose.Schema.Types.ObjectId,ref:'packingsize',required: true},
    discount:{type: mongoose.Schema.Types.ObjectId,ref:'discount',required: true},
    rate:{ type: Number, required: true},
    isActive: { type: Boolean, required: true ,default: 1}
});
module.exports=mongoose.model("ratelist",schema);