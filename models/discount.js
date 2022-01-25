var mongoose=require("mongoose");
var Schema=mongoose.Schema;
const schema=Schema({
    name:{ type: String, required: true},
    amount:{ type: Number, required: true},

    isActive: { type: Boolean, required: true ,default: 1}
});
module.exports=mongoose.model("discount",schema);