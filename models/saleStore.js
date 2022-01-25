var mongoose=require("mongoose");
var Schema=mongoose.Schema;
const schema=Schema({
    direction:{type: String,maxlength:20,required: true},
    category:{type: String, required: true},
    name:{type: String,maxlength:50, required: true},
    date: { type: Date, default: Date.now,required: true },
    isActive: { type: Boolean, required: true ,default: 1}
});
module.exports=mongoose.model("salestore",schema);