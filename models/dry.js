var mongoose=require("mongoose");
var Schema=mongoose.Schema;
const schema=Schema({
    commodityOutputId:{type: mongoose.Schema.Types.ObjectId, ref: 'productionOutput',required: true},
    uploaderId:{type: mongoose.Schema.Types.ObjectId, ref: 'contractor',required: true},
    downloaderId:{type: mongoose.Schema.Types.ObjectId, ref: 'contractor',required: true},
    storeId:{type: mongoose.Schema.Types.ObjectId, ref: 'store',required: false},
    lossNumber:{type: String,maxlength:70,required: true},
    grossStore:{type: Number, required: true},
    tareStore:{type: Number, required: true},
    grossDry:{type: Number, required: true},
    tareDry:{type: Number, required: true},
    date: { type: Date, default: Date.now,required: true },
    isActive: { type: Boolean, required: true ,default: 1}
});
module.exports=mongoose.model("dry",schema);