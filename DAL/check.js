var check=require("../models/check");
var mongoose=require("mongoose");
const bookItem = require("../models/bookItem");
const ObjectId = mongoose.Types.ObjectId;
var checkDal={
    getAllcheck:function (callback) {
        check.find({isActive:true}).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    },

    getCheckId:function (id,callback) {
        check.find({bookId : id.bookId,isActive:true}).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    },

    addcheck:function (body,callback){
        check.deleteMany({bookId:body.bookId}).then(function (data1){

            var checkObj = new check({
                checkNo:body.checkNo,
                description:body.description,
                bookId:body.bookId,

            });
            checkObj.save().then(function (savedData) {
                var data={message:"success",data:savedData}
                callback(data);
            }).catch(function (err) {
                var data={message:"error",data:err.message}
                callback(data);

            })

        }).catch(function (err){
            var arr={message:"error", data:err.message};
            callback(arr);
        })


    }
    ,
    updatecheck:function (body,callback){
        check.deleteMany({bookId:body.id}).then(function (data1){
            check.insertMany(body.bookitems).then(function (data2){
                var data={message:"success",data:data2};
                callback(data);
            }).catch(function (err){
                var arr={message:"error", data:err.message};
                callback(arr);
            })
        }).catch(function (err){
            var arr={message:"error", data:err.message};
            callback(arr);
        })

    },

    deletecheck:function (id,callback) {

        check.deleteMany(
            { "bookId" : id.id},

        ).then(function (delData) {
            var data={message:"success",data:delData}
            callback(data)
        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);
        });
    }
}

module.exports=checkDal;