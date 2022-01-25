var mongoose=require("mongoose");
var Schema=mongoose.Schema;
const schema=Schema({
    contractorId: {type: mongoose.Schema.Types.ObjectId, ref: 'contractor',required: true},
    packingSize: { type: Number, required: true,min:1 },
    rate: { type: Number, required: true,min:1 },
    date: { type: Date, default: Date.now },
    isActive: { type: Boolean, required: true ,default: 1},
});
module.exports=mongoose.model("contractorRate",schema);