const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const schema = Schema({
    userAccountBankName:{type: String, required: true},
    userAccountBalance:{type: String, required: true},
    userAccountName:{type: String, required: true},
    createdAt:{type: Date, default: Date()},
});
module.exports=mongoose.model("bank",schema);