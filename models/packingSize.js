var mongoose=require("mongoose");
var Schema=mongoose.Schema;
const schema=Schema({
    size:{type: Number,maxlength:70,required: true},
    unit:{type: String, required: true},
    date: { type: Date, default: Date.now,required: true },
    isActive: { type: Boolean, required: true ,default: 1}
});
module.exports=mongoose.model("packingsize",schema);