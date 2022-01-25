var mongoose=require("mongoose");
var dataTables = require('mongoose-datatables')
var Schema=mongoose.Schema;
const schema=Schema({
    purchaseOrderId: {type: mongoose.Schema.Types.ObjectId, ref: 'purchaseOrder',required: true},
    grainWeight: { type: Number, required: true},
    purity: { type: Number, required: true},
    date: { type: Date, default: Date.now },
    isActive: { type: Boolean, required: true ,default: 1},
});
schema.plugin(dataTables)
module.exports=mongoose.model("wheatPurity",schema);