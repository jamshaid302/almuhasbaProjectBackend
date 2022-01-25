var mongoose=require("mongoose");
var Schema=mongoose.Schema;
const schema=Schema({
    firstName: { type: String, required: true,maxlength:50,minlength:2 ,trim: true },
    lastName: { type: String, required: true,maxlength:50,minlength:2 ,trim: true },
    phone: { type: String, required: true,maxlength:15,minlength:11 ,trim: true },
    address: { type: String, required: true,maxlength:50,minlength:3 ,trim: true },
    cnic: { type: String, required: true,maxlength:17,minlength:14 ,trim: true },
    area: { type: String, required: true,maxlength:20,minlength:3 ,trim: true },
    province: { type: String, required: true,maxlength:30,minlength:3 ,trim: true },
    date: { type: Date, default: Date.now },
    isActive: { type: Boolean, required: true ,default: 1},
});
module.exports=mongoose.model("supplier",schema);