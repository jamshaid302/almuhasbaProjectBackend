var mongoose=require("mongoose");
var Schema=mongoose.Schema;
const schema=Schema({
    name: { type: String, required: true,maxlength:20,minlength:3 ,trim: true},
    email: { type: String, required: true,maxlength:30,unique: true,minlength:3 ,trim: true },
    password: { type: String, required: true,maxlength:400},
    photo: { type: String, required: true,maxlength:70 ,minlength:3,trim: true},
    phone: { type: String, required: true,trim: true,minlength: 3,maxlength:15},
    designation: { type: String, required: true,maxlength:30,minlength:3},
    role: { type: String, required: true,enum : ['guest','admin',"supervisor"],},
    address: { type: String, required: true,maxlength:100,minlength:3 },
    isActive: { type: Boolean, required: true ,default: 1},
});
module.exports=mongoose.model("user",schema);