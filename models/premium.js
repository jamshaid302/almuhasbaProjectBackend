var mongoose=require("mongoose");
var Schema=mongoose.Schema;
const schema=Schema({
    name: { type: String, required: true,maxlength:20,minlength:2 ,trim: true },
    value: { type: Number, required: true,max:100,min:0  },
    startDate: { type: Date, default: Date.now ,required:true },
    endDate: { type: Date, default: Date.now },
    isActive: { type: Boolean, required: true ,default: 1},
});
module.exports=mongoose.model("premium",schema);