var mongoose=require("mongoose");
var Schema=mongoose.Schema;
const schema=Schema({

    checkNo : {type : String, default: '0'},
    description:{ type: String, required: true, default : ''},
    bookId:{ type: mongoose.Schema.Types.ObjectId,ref:'book', required: true},
    isActive: { type: Boolean, required: true ,default: 1}
});
module.exports=mongoose.model("check",schema);