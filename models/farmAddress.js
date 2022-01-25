var mongoose=require("mongoose");
var Schema=mongoose.Schema;
const schema=Schema({
    tehsil: { type: String, required: true,maxlength:50,minlength:3 ,trim: true },
    district: { type: String, required: true,maxlength:50,minlength:3 ,trim: true },
    address: { type: String, required: true,maxlength:50,minlength:4 ,trim: true },
    isActive: { type: Boolean, required: true ,default: 1},
});
module.exports=mongoose.model("farmAddress",schema);