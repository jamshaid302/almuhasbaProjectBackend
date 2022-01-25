var mongoose=require("mongoose");
var Schema=mongoose.Schema;
const schema=Schema({
    name: { type: String, required: true,maxlength:50 },
    categoryId: {type: mongoose.Schema.Types.ObjectId, ref: 'category',required: false},
    isActive: { type: Boolean, required: true ,default: 1},
});
module.exports=mongoose.model("category",schema);