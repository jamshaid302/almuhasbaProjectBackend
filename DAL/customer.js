var customer=require("../models/customer");
var mongoose=require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
var defaultGl = require('../models/defaultGlCoa');
const coaDal = require("../DAL/coa");
var customerDal={
    getAllCustomer:function (callback) {
        customer.find({isActive:true}).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    },
    getCustomerWithDetail:function (callback) {
        customer.aggregate([
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
    getCustomerById:function (id,callback) {
        customer.find({_id : id,isActive:true}).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    },

    addCustomer:function (body,callback){
        defaultGl.find({coatype:'Customer'}).then(function (coaData){
            if(coaData.length>0){
        var customerObj = new customer({
            firstName:body.firstName,
            lastName:body.lastName,
            address:body.address,
            area:body.area,
            phone:body.phone,
            email:body.email
        });
        customerObj.save().then(function (savedData) {
            const coaBody = {
                'node': coaData[0].coaname,
                'accounttitle': body.firstName+" "+body.lastName,
                'behaviour':'Credit',
            };
            coaDal.addCoa(coaBody, function(data,err){
                if(data.message=="success"){
                    var data={message:"success",data:data}
                    callback(data);
                }else if(data.message=="error") {
                    var data={message:"Error in coa Creating in Supplier",data:data}
                    callback(data);
                }
            });
            var data={message:"success",data:savedData}
            callback(data)
        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);

        });
            }else{
                var data={message:"error",data:"Please Setup DefaultGl account of customer in account section."}
                callback(data);
            }

        }).catch(function (err1){
            var data={message:"error",data:err1.message}
            callback(data);
        });
    }
    ,
    updateCustomer:function (body,callback){
        customer.updateOne(
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
    deleteCustomer:function (id,callback) {
        customer.updateOne(
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

module.exports=customerDal;