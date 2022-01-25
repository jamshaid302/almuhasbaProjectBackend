var mongoose=require("mongoose");
var Schema=mongoose.Schema;
const schema=Schema({
    invoiceId:{type: mongoose.Schema.Types.ObjectId, ref: 'invoice',required: false},
    supplierId:{type: mongoose.Schema.Types.ObjectId, ref: 'supplier',required: false},
    downloaderId:{type: mongoose.Schema.Types.ObjectId, ref: 'contractor',required: false},
    uploaderId:{type: mongoose.Schema.Types.ObjectId, ref: 'contractor',required: false},
    carriageId:{type: mongoose.Schema.Types.ObjectId, ref: 'contractor',required: false},
    purchaseOrderId: {type: mongoose.Schema.Types.ObjectId, ref: 'purchaseOrder',required: false},
    receiptNo:{type: String, required: true},
    amount: { type: Number, required: true },
    description:{type: String, required: true},
    narration:{type: String, required: true},
    paymentType:{type: String, required: false},
    chequeNo:{type: String, required: false},
    receiptFrom:{type: String, required: true},
    status:{type: String,default:'pending',enum:['pending','paid'],required: true},
    date: { type: Date, default: Date.now,required: true },
    createdAt: { type: Date, default: Date.now,required: true },
    dc:{type: String,default:'c',enum:['d','c'],required: true},
    isActive: { type: Boolean, required: true ,default: 1}
});
module.exports=mongoose.model("purchaseledger",schema);