const coaDal = require("../DAL/coa");
const customerDal = require("../DAL/customer");

var coaBal={

    addCoa:function (body,callback) {
        coaDal.addCoa(body, function(data,err){
            callback(data);
        });
    },
    addCoaTransaction:function (body,callback) {
        coaDal.addCoaTransaction(body, function(data,err){
            callback(data);
        });
    },
    getAllCoa:function (id,callback) {
        coaDal.getAllCoa(id,function (data,err) {
            callback(data);
        });
    },
    getAllCoaForSheet:function (callback) {
        coaDal.getAllCoaForSheet(function (data,err) {
            callback(data);
        });
    },
    getCoaByTitle:function (id,callback) {
        coaDal.getCoaByTitle(id,function (data,err) {
            callback(data);
        });
    },
    addDefaultGl:function (body, callback){
        coaDal.addDefaultGl(body, function(data,err){
            callback(data);
        });
    }
}
module.exports = coaBal;