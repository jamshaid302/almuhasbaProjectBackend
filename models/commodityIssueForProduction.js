var mongoose=require("mongoose");
var dataTables = require('mongoose-datatables')
var Schema=mongoose.Schema;
const schema=Schema({
    purchaseOrderId: {type: mongoose.Schema.Types.ObjectId, ref: 'purchaseOrder',required: true},
    storeId: {type: mongoose.Schema.Types.ObjectId, ref: 'store',required: true},
    remainingBags: { type: Number, required: true},
    bagsForProduction: { type: Number, required: true},
    bagSize: { type: Number, required: true},
    netWeight: { type: Number, required: true},
    PlantNo: { type: Number, required: false},
    processNo: { type: String, required: false},
    uploaderRate: {type: mongoose.Schema.Types.ObjectId, ref: 'contractorRate',required: true},
    downloaderRate: {type: mongoose.Schema.Types.ObjectId, ref: 'contractorRate',required: true},
    date: { type: Date, default: Date.now },
    isActive: { type: Boolean, required: true ,default: 1},
});
schema.plugin(dataTables)
module.exports=mongoose.model("commodityIssueForProduction",schema);