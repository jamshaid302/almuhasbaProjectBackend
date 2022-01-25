var payment=require("../models/payment");
var mongoose=require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
var paymentDal={
    getAllPayment:function (callback) {
        payment.find({isActive:true}).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    },
    getPaymentWithDetail:function (callback) {
        payment.aggregate([
            { $match: { isActive:true} },
            { $lookup: {
                    from: 'salestores',
                    localField: 'salestoreId',
                    foreignField: '_id',
                    as: 'storedata'
                }},
            { $unwind : { path: "$storedata", preserveNullAndEmptyArrays: true } },
            {
                $match:  { "storedata.isActive":true }
            },
            { $lookup: {
                    from: 'dries',
                    localField: 'dryId',
                    foreignField: '_id',
                    as: 'drydata'
                }},
            { $unwind : { path: "$drydata", preserveNullAndEmptyArrays: true } },
            {
                $match:  { "drydata.isActive":true }
            },
            { $lookup: {
                    from: 'contractors',
                    localField: 'uploaderId',
                    foreignField: '_id',
                    as: 'uploaderdata'
                }},
            { $unwind : { path: "$uploaderdata", preserveNullAndEmptyArrays: true } },
            {
                $match:  { "uploaderdata.isActive":true }
            },
            { $lookup: {
                    from: 'contractors',
                    localField: 'downloaderId',
                    foreignField: '_id',
                    as: 'downloaderdata'
                }},
            { $unwind : { path: "$downloaderdata", preserveNullAndEmptyArrays: true } },
            {
                $match:  { "downloaderdata.isActive":true }
            },
        ]).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    }
    ,
    getPaymentById:function (id,callback) {
        payment.find({_id : id,isActive:true}).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    },

    addPayment:function (body,callback){
        var paymentObj = new payment({
            name:body.name
        });
        paymentObj.save().then(function (savedData) {
            var data={message:"success",data:savedData}
            callback(data)
        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);

        })
    }
    ,
    updatePayment:function (body,callback){
        payment.updateOne(
            {"_id":body.id},
            {
                $set: {
                    name:body.name
                }
            },
        ).then(function (updateData) {
            var data={message:"success",data:updateData}
            callback(data)
        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);
        });
    }
    ,
    deletePayment:function (id,callback) {
        payment.updateOne(
            { "_id" : id.id},
            { $set: {
                    isActive:false
                } },
        ).then(function (updateDate) {
            var data={message:"success",data:updateDate}
            callback(data)
        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);
        });
    }
}

module.exports=paymentDal;