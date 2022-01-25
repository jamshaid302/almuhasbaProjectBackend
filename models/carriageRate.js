var mongoose=require("mongoose");
var Schema=mongoose.Schema;
const schema=Schema({
    farmAddress: {type: mongoose.Schema.Types.ObjectId, ref: 'farmAddress',required: true},
    rate: { type: Number, required: true,min:1 },
    date: { type: Date, default: Date.now },
    isActive: { type: Boolean, required: true ,default: 1},
});
module.exports=mongoose.model("carriageRate",schema);