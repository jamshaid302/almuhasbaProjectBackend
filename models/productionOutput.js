var mongoose=require("mongoose");
var dataTables = require('mongoose-datatables')
var Schema=mongoose.Schema;
const schema=Schema({
    purchaseOrderId: {type: mongoose.Schema.Types.ObjectId, ref: 'purchaseOrder',required: true},
    commodityIssueForProductionId: {type: mongoose.Schema.Types.ObjectId, ref: 'commodityIssueForProduction',required: true},
    rawSlipNo: { type: String, required: true,maxlength:20,minlength:2 ,trim: true},
    productItemId: {type: mongoose.Schema.Types.ObjectId, ref: 'productItem',required: true},
    lot: { type: String, required: true,maxlength:10,minlength:2 ,trim: true},
    packingSize: {type: Number, required: true},
    quantityInBag: { type: Number, required: true},
    heap: { type: Number, required: false},
    productNo: { type: String, required: true,maxlength:10,minlength:2 ,trim: true},
    uploaderRate: {type: mongoose.Schema.Types.ObjectId, ref: 'contractorRate',required: true},
    downloaderRate: {type: mongoose.Schema.Types.ObjectId, ref: 'contractorRate',required: true},
    storeId: {type: mongoose.Schema.Types.ObjectId, ref: 'store',required: false},
    date: { type: Date, default: Date.now },
    isActive: { type: Boolean, required: true ,default: 1},
});
schema.plugin(dataTables)
module.exports=mongoose.model("productionOutput",schema);