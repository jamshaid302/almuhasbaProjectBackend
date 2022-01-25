const userBankAccountModel = require('../models/bank');
var bankDal={
 addUserAccount:function(body,callback) {
     new userBankAccountModel({
         userAccountBankName:body.userAccountBankName,
         userAccountBalance:body.userAccountBalance,
         userAccountName:body.userAccountName,
         }).save().then(function(data){
         var data={message:"success",data:data}
         callback(data)
     }).catch(function (err) {
         var data={message:"error",data:err.message}
         callback(data);
     });
 },
    getUserAccount:function(body,callback) {
        userBankAccountModel.find().then(function(data){
            var data={message:"success",data:data}
            callback(data)
        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);
        });
    },
    updateUserAccount:function(body,callback) {
        userBankAccountModel.updateOne(
            { '_id' : body.id },
            { $set: {
                    userAccountBankName:body.userAccountBankName,
                    userAccountBalance:body.userAccountBalance,
                    userAccountName:body.userAccountName,
                },
            },
        ).then(function(data){
            var data={message:"success",data:data}
            callback(data)
        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);
        });
    },
    deleteUserAccount:function(id,callback) {
     console.log('USER ID:',id);
        userBankAccountModel.deleteOne(
            { "_id" : id },
        ).then(function(data){
            var data={message:"success",data:data}
            callback(data)
        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);
        });
    },
}
module.exports = bankDal;