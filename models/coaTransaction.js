const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const schema = Schema({
    coaid:{type: mongoose.Schema.Types.ObjectId,ref: 'coa', required: true},
    invoiceid:{type: String, required: true},
    d_c:{type: String, required: true},
    amount:{type: Number, required: true},
    date:{type: Date, default: Date.now(), required: true},
    description:{type:String, required: true},
    createdat:{type: Date, default: Date.now(), required: true},
    createdby:{type: String, required: true},
});
module.exports=mongoose.model("coatransactions",schema);