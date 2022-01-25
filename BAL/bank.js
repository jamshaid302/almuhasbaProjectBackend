const bankDal = require('../DAL/bank');
var bankBal={
    addUserAccount:function (body,callback) {
        bankDal.addUserAccount(body, function(data,err){
            callback(data);
        });
    },
    getUserAccount:function (body,callback) {
        bankDal.getUserAccount(body, function(data,err){
            callback(data);
        });
    },
    updateUserAccount:function (body,callback) {
        bankDal.updateUserAccount(body, function(data,err){
            callback(data);
        });
    },
    deleteUserAccount:function (id,callback) {
        bankDal.deleteUserAccount(id, function(data,err){
            callback(data);
        });
    },
}
module.exports = bankBal;