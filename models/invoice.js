var mongoose=require("mongoose");
var Schema=mongoose.Schema;
const schema=Schema({
    purchaseOrderId: {type: mongoose.Schema.Types.ObjectId, ref: 'purchaseOrder',required: true},
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now,required: true },
    isActive: { type: Boolean, required: true ,default: 1},
});
module.exports=mongoose.model("invoice",schema);