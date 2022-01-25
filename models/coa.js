const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const schema = Schema({
    key1:{type: String, required: true},
    key2:{type: String},
    key3:{type: String},
    key4:{type: String},
    key5:{type: String},
    key6:{type: String},
    balance:{type: String, default: '-1'},
    isActive:{type: Boolean, default: true},
    accountname:{type:String, required: true},
    accounttitle:{type: String, required: true},
    behaviour:{type: String, required: true, default: 'Debit'},
    date:{type: Date, default: Date()},
});
module.exports=mongoose.model("coa",schema);