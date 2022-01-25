var mongoose=require("mongoose");
var Schema=mongoose.Schema;
const schema=Schema({
    firstName: { type: String, required: true,maxlength:30,minlength:3 ,trim: true },
    lastName: { type: String, required: true,maxlength:30,minlength:3 ,trim: true },
    address: { type: String, required: true,maxlength:70,minlength:3 ,trim: true },
    cnic: { type: String, required: true,maxlength:16,minlength:14 ,trim: true },
    phone: { type: String, required: true,maxlength:16,minlength:3 ,trim: true },
    date: { type: Date, default: Date.now },
    type: { type: Number, required: true, enum : [1,2,3], },// 1 for uploader 2 for carriage 3 for downloader
    isActive: { type: Boolean, required: true ,default: 1},
});
module.exports=mongoose.model("contractor",schema);