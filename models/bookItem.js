var mongoose=require("mongoose");
var Schema=mongoose.Schema;
const schema=Schema({
    // itemId:{ type: mongoose.Schema.Types.ObjectId,ref:'productItem', required: true},
    // qty:{ type: Number, required: true},
    // bookId:{ type: mongoose.Schema.Types.ObjectId,ref:'book', required: true},
    isActive: { type: Boolean, required: true ,default: 1},
    productId:{ type: mongoose.Schema.Types.ObjectId,ref:'productItem', required: true},
    productName : {type: String,required: true},
    category : {type: String,required: true},
    subcategory : {type: String,required: true},
    packingsize : {type: String,required: true},
    prdqty:{type: Number,required: true},
    prdprice:{type: Number,required: true},
    total:{type: Number,required: true},
    bookId:{ type: mongoose.Schema.Types.ObjectId,ref:'book', required: true},


});
module.exports=mongoose.model("bookitem",schema);