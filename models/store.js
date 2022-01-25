var mongoose=require("mongoose");
var Schema=mongoose.Schema;
const schema=Schema({
    name: { type: String, required: true,maxlength:20,minlength:2 ,trim: true },
    direction: { type: String, required: false,maxlength:10,minlength:1 ,trim: true },
    isOccupy: { type: Boolean, required: true ,default: 0},//0 mean vacant store
    storeId: {type: mongoose.Schema.Types.ObjectId, ref: 'store',required: false},
    warehouseId: {type: mongoose.Schema.Types.ObjectId, ref: 'warehouse',required: false},
    isActive: { type: Boolean, required: true ,default: 1},
});
module.exports=mongoose.model("store",schema);