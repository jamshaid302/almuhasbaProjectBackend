var mongoose=require("mongoose");
var Schema=mongoose.Schema;
const schema=Schema({
    salestoreId:{type: mongoose.Schema.Types.ObjectId,ref:'salestore',required: true},
    productItemId:{type: mongoose.Schema.Types.ObjectId,ref:'productitems',required: true},
    packingsize:{type: Number,required: true},
    productItem:{type: String,required: true},
    qty:{type: Number,required: true},
    subcategory : {type: String,required: true},
    category : {type: String,required: true},
    date: { type: Date, default: Date.now,required: true },
    isActive: { type: Boolean, required: true ,default: 1}
});



module.exports=mongoose.model("stockSum",schema);