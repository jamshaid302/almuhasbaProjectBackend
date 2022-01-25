var mongoose=require("mongoose");
var dataTables = require('mongoose-datatables')
var Schema=mongoose.Schema;
const schema=Schema({
    purchaseOrderId: {type: mongoose.Schema.Types.ObjectId, ref: 'purchaseOrder',required: true},
    fieldGermination: { type: Number, required: true},
    beforeGinning: { type: Number, required: true},
    afterGinning: { type: Number, required: true},
    resample1: { type: Number, required: true},
    resample2: { type: Number, required: false},
    resample3: { type: Number, required: false},
    beforeDry: { type: Number, required: true},
    afterDry: { type: Number, required: true},
    beforePack: { type: Number, required: true},
    afterPack: { type: Number, required: true},
    date: { type: Date, default: Date.now },
    isActive: { type: Boolean, required: true ,default: 1},
});
schema.plugin(dataTables)
module.exports=mongoose.model("cottonBudTest",schema);