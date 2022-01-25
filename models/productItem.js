var mongoose=require("mongoose");
var Schema=mongoose.Schema;
const schema=Schema({
    name: { type: String, required: true,maxlength:30,minlength:3 ,trim: true },
    date: { type: Date, default: Date.now },
    isActive: { type: Boolean, required: true ,default: 1},
});
module.exports=mongoose.model("productItem",schema);