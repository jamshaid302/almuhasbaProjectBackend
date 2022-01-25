var mongoose=require("mongoose");
var Schema=mongoose.Schema;
const schema=Schema({
    firstName:{ type: String, required: true},
    lastName:{ type: String, required: true },
    address:{ type: String, required: true },
    area:{ type: String, required: true },
    phone:{ type: String, required: true },
    email:{ type: String, required: true },
    isActive: { type: Boolean, required: true ,default: 1}
});
module.exports=mongoose.model("saleofficer",schema);