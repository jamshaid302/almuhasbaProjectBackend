var saleofficer=require("../models/saleOfficer");
var mongoose=require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
var saleofficerDal={
    getAllSaleOfficer:function (callback) {
        saleofficer.find({isActive:true}).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    },
    getSaleOfficerWithDetail:function (callback) {
        saleofficer.aggregate([
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
    getSaleOfficerById:function (id,callback) {
        saleofficer.find({_id : id,isActive:true}).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    },

    addSaleOfficer:function (body,callback){
        var saleofficerObj = new saleofficer({
            firstName:body.firstName,
            lastName:body.lastName,
            address:body.address,
            area:body.area,
            phone:body.phone,
            email:body.email
        });
        saleofficerObj.save().then(function (savedData) {
            var data={message:"success",data:savedData}
            callback(data)
        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);

        })
    }
    ,
    updateSaleOfficer:function (body,callback){
        saleofficer.updateOne(
            {"_id":body.id},
            {
                $set: {
                    firstName:body.firstName,
                    lastName:body.lastName,
                    address:body.address,
                    area:body.area,
                    phone:body.phone,
                    email:body.email
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
    deleteSaleOfficer:function (id,callback) {
        saleofficer.updateOne(
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

module.exports=saleofficerDal;