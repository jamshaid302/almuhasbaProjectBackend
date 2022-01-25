var mongoose=require("mongoose");
var Schema=mongoose.Schema;
const schema=Schema({
    contractorRateId:{ type: mongoose.Schema.Types.ObjectId,ref:'contractorrate', required: true},
    purchaseOrderId:{ type: mongoose.Schema.Types.ObjectId,ref:'purchaseorder', required: true},
    commodityOutputId:{ type: mongoose.Schema.Types.ObjectId,ref:'dry'},
    packingSize:{type: Number},
    rate:{type: Number},
    farmId:{ type: mongoose.Schema.Types.ObjectId,ref:'farmaddresss',default:null},
    process:{type: String},
    processId:{ type: mongoose.Schema.Types.ObjectId},
    amount:{type: Number},
    paid:{type: Number,default:0},
    date: { type: Date, default: Date.now },
    isActive: { type: Boolean, required: true ,default: 1},
});
module.exports=mongoose.model("purchaseExpenses",schema);