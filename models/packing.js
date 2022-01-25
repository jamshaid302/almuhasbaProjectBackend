var mongoose=require("mongoose");
var Schema=mongoose.Schema;
const schema=Schema({
    movedQty:{type: Number,required: true,default:0},
    packingsizeId:{type: mongoose.Schema.Types.ObjectId,ref:'packingsize',required: true},
    uploaderId:{type: mongoose.Schema.Types.ObjectId,ref:'contractor',required: true},
    downloaderId:{type: mongoose.Schema.Types.ObjectId,ref:'contractor',required: true},
    dryId:{type: mongoose.Schema.Types.ObjectId,ref:'dry',required: true},
    dryIdtxt:{type: String,required: true},
    productItemId:{type: mongoose.Schema.Types.ObjectId,ref:'productItem',required: true},
    prdOutputId:{type: mongoose.Schema.Types.ObjectId,ref:'productionoutputs',required: true},
    qty:{type: Number,required: true},
    date: { type: Date, default: Date.now,required: true },
    isActive: { type: Boolean, required: true ,default: 1}
});
module.exports=mongoose.model("packing",schema);