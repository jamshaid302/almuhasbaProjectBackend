var mongoose=require("mongoose");
var Schema=mongoose.Schema;
const schema=Schema({
    date:{ type: Date, required: true},
    bookNo:{ type: String, required: true},
    customerId:{ type: mongoose.Schema.Types.ObjectId,ref:'customer', required: true},
    saleOfficerId:{ type: mongoose.Schema.Types.ObjectId,ref:'saleOfficer', required: true},
    paymentId:{ type: mongoose.Schema.Types.ObjectId,ref:'payment', required: true},
    checkNo : {type : String, default: '0'},
    destination:{ type: String, required: true},
    area:{ type: String, required: true},
    // type:{ type: String, required: true},
    // category:{ type: String, required: true},
    //bookAmount:{ type: Number, required: true},
    isShipped: { type: Boolean, required: true ,default: 0},
    isActive: { type: Boolean, required: true ,default: 1}
});
module.exports=mongoose.model("book",schema);