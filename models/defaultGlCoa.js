const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const schema = new Schema({
    coaname:{type: String, required: true},
    coatype: {type: String, required: true},
    isactive:{type: Boolean, required: true, default: true},
});
module.exports=mongoose.model('defaultgl',schema);