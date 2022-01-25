var mongoose=require("mongoose");
var Schema=mongoose.Schema;
const schema=Schema({
    date:{ type: Date, required: true, default: '12/10/1990'},
    bookId:{ type: mongoose.Schema.Types.ObjectId,ref:'book', required: true},
    rateList:{ type: mongoose.Schema.Types.ObjectId,ref:'ratelists', required: true},
    amount:{ type: 'String', required: true},
    isActive: { type: Boolean, required: true ,default: 1}
});
module.exports=mongoose.model("shipped",schema);