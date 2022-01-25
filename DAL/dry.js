var dry=require("../models/dry");
var mongoose=require("mongoose");
const commodityIssueForProduction = require("../models/commodityIssueForProduction");
const purchaseExpenses = require("../models/purchaseExpences");
const productionOutput = require("../models/productionOutput");
const contractorRate = require("../models/contractorRate");
var ObjectId = mongoose.Types.ObjectId;
var dryDal={
    getAllDry:function (callback) {
        dry.find({isActive:true}).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    },
    getDryById:function (id,callback) {
        dry.find({commodityOutputId : ObjectId(id),isActive:true}).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    },

    getDryDetailById:function (id,callback) {
        dry.aggregate([
            { $match: { isActive:true, "_id":ObjectId(id)} },
            { $lookup: {
                    from: 'productionoutputs',
                    localField: 'commodityOutputId',
                    foreignField: '_id',
                    as: 'commodityOutPutData'
                }},
            { $unwind : { path: "$commodityOutPutData", preserveNullAndEmptyArrays: true } },
            {
                $match:  { "commodityOutPutData.isActive":true }
            },
        ]).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    },

    addDry:function (body,callback){
        var dryObj = new dry(body);
        dryObj.save().then(function (savedData) {
            var data={message:"success",data:savedData};
            var id = savedData._doc._id;
            dry.aggregate([
                { $match: {
                        isActive: true,_id:ObjectId(id)
                    }},
                {
                    $lookup:{
                        from:"productionoutputs",
                        let:{comodityId:"$commodityOutputId"},
                        pipeline:[
                            {$match: { $expr: { $eq: ["$_id", "$$comodityId"] }}},
                        ],
                        as:"asPrdOutput",
                    },
                },
                { $unwind : { path: "$asPrdOutput", preserveNullAndEmptyArrays: true } },
                {
                    $lookup:{
                        from:"contractors",
                        let:{uploadId:"$uploaderId"},
                        pipeline:[
                            {$match: { $expr: { $eq: ["$_id", "$$uploadId"] }}},
                            {
                                $lookup:{
                                    from:"contractorrates",
                                    let:{conid:"$_id"},
                                    pipeline:[
                                        {$match: { $expr: { $eq: ["$contractorId", "$$conid"] }}},
                                    ],
                                    as:"asContractorRates",
                                },
                            },
                            { $unwind : { path: "$asContractorRates", preserveNullAndEmptyArrays: true } },
                        ],
                        as:"asContractorsUpload",
                    },
                },
                { $unwind : { path: "$asContractorsUpload", preserveNullAndEmptyArrays: true } },
                {
                    $lookup:{
                        from:"contractors",
                        let:{downloadId:"$downloaderId"},
                        pipeline:[
                            {$match: { $expr: { $eq: ["$_id", "$$downloadId"] }}},
                            {
                                $lookup:{
                                    from:"contractorrates",
                                    let:{conid:"$_id"},
                                    pipeline:[
                                        {$match: { $expr: { $eq: ["$contractorId", "$$conid"] }}},
                                    ],
                                    as:"asContractorRates",
                                },
                            },
                            { $unwind : { path: "$asContractorRates", preserveNullAndEmptyArrays: true } },
                        ],
                        as:"asContractorsDownload",
                    },
                },
                { $unwind : { path: "$asContractorsDownload", preserveNullAndEmptyArrays: true } },
                {
                    $project:{
                        prdOutputBag : "$asPrdOutput.quantityInBag",
                        prdOutputId  : "$asPrdOutput._id",
                        purchaseOrderId : "$asPrdOutput.purchaseOrderId",
                        conUploadRate : "$asContractorsUpload.asContractorRates.rate",
                        conUploadSize : "$asContractorsUpload.asContractorRates.packingSize",
                        conUploadId : "$asContractorsUpload.asContractorRates._id",
                        conDownloadRate : "$asContractorsDownload.asContractorRates.rate",
                        conDownloadSize : "$asContractorsDownload.asContractorRates.packingSize",
                        conDownloadId : "$asContractorsDownload.asContractorRates._id",
                    }
                }
            ]).then(function (data1) {
                var d = data1;
                var purExpenseDownload=new purchaseExpenses({
                    contractorRateId:data1[0].conDownloadId,
                    purchaseOrderId:data1[0].purchaseOrderId,
                    commodityOutputId:data1[0].prdOutputId,
                    packingSize: data1[0].conDownloadSize,
                    rate :  data1[0].conDownloadRate ,
                    process:'Dry',
                    processId : id,
                    amount : data1[0].conDownloadRate * data1[0].prdOutputBag,
                });
                purExpenseDownload.save().then(function (savedData) {
                    var data={message:"success",data:savedData}
                    //callback(data);
                }).catch(function (err) {
                    var data={message:"error",data:err.message}
                    //callback(data);
                });
                var purExpenseUpload=new purchaseExpenses({
                    contractorRateId:data1[0].conUploadId,
                    purchaseOrderId:data1[0].purchaseOrderId,
                    commodityOutputId:data1[0].prdOutputId,
                    packingSize: data1[0].conUploadSize,
                    rate :  data1[0].conUploadRate ,
                    process:'Dry',
                    processId : id,
                    amount : data1[0].conUploadRate * data1[0].prdOutputBag,
                });
                purExpenseUpload.save().then(function (savedData) {
                    var data={message:"success",data:savedData}
                }).catch(function (err) {
                    var data={message:"error",data:err.message}
                });
            }).catch(function (err) {
                var arr={message:"error",data:err.message}
            });
            callback(data);
        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);
        })
    },
    getOldDryData:function (data,callback) {
        var dryId = data.id;
        dry.findOne({isActive:true,_id : dryId}).then(function (data) {
            var arr={message:"success",data:data};
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message};
            callback(arr);
        });
    },

    getDownloaderRateID:function (id,callback) {
        var downloaderId = id;
        contractorRate.find({contractorId : downloaderId}).then(function (data) {
            var arr={message:"success",data:data};
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message};
            callback(arr);
        });
    },

    getUploaderRateID:function (id,callback) {
        var uploaderId = id;
        contractorRate.find({contractorId : uploaderId}).then(function (data) {
            var arr={message:"success",data:data};
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message};
            callback(arr);
        });
    },

    updateDry:function (body,callback){
        var newOutputId = body.id;
        var uploaderRateId = body.setObj.uploaderRateId;
        var downloaderRateId = body.setObj.downloaderRateId;
        dry.findOneAndUpdate(
            {"_id":body.id},
            { $set: body.setObj },
        ).then(function (updateData) {
            var data={message:"success",data:updateData};
            // start here
            var commodityOutputId = updateData._doc.commodityOutputId.toString();
            dry.aggregate([
                { $match: {
                        isActive: true,_id:ObjectId(newOutputId),
                    }},
                {
                    $lookup:{
                        from:"productionoutputs",
                        let:{comOutputId:"$commodityOutputId"},
                        pipeline:[
                            {$match: { $expr: { $eq: ["$_id", "$$comOutputId"] }}},
                        ],
                        as:"asProductionOutput",
                    },
                },
                { $unwind : { path: "$asProductionOutput", preserveNullAndEmptyArrays: true } },
                {
                    $lookup:{
                        from:"contractors",
                        let:{uploadId:"$uploaderId"},
                        pipeline:[
                            {$match: { $expr: { $eq: ["$_id", "$$uploadId"] }}},
                            {
                                $lookup:{
                                    from:"contractorrates",
                                    let:{con_id:"$_id"},
                                    pipeline:[
                                        {$match: { $expr: { $eq: ["$contractorId", "$$con_id"] }}},
                                    ],
                                    as:"asContractorrates",
                                },
                            },
                            { $unwind : { path: "$asContractorrates", preserveNullAndEmptyArrays: true } },

                        ],
                        as:"asUpload",
                    },
                },
                { $unwind : { path: "$asUpload", preserveNullAndEmptyArrays: true } },
                {
                    $lookup:{
                        from:"contractors",
                        let:{uploadId:"$downloaderId"},
                        pipeline:[
                            {$match: { $expr: { $eq: ["$_id", "$$uploadId"] }}},
                            {
                                $lookup:{
                                    from:"contractorrates",
                                    let:{con_id:"$_id"},
                                    pipeline:[
                                        {$match: { $expr: { $eq: ["$contractorId", "$$con_id"] }}},
                                    ],
                                    as:"asContractorrates",
                                },
                            },
                            { $unwind : { path: "$asContractorrates", preserveNullAndEmptyArrays: true } },
                        ],
                        as:"asDownload",
                    },
                },
                { $unwind : { path: "$asDownload", preserveNullAndEmptyArrays: true } },
                {
                    $lookup:{
                        from:"carriagerates",
                        let:{carRateId:"$carriageRateId"},
                        pipeline:[
                            {$match: { $expr: { $eq: ["$_id", "$$carRateId"] }}},
                        ],
                        as:"asCarrigeRate",
                    },
                },
                { $unwind : { path: "$asCarrigeRate", preserveNullAndEmptyArrays: true } },
                {
                    $project:{
                        uploaderId : "$asUpload._id",
                        uploaderRate : "$asUpload.asContractorrates.rate",
                        uploaderRateId : "$asUpload.asContractorrates._id",
                        uploaderPackingSize : "$asUpload.asContractorrates.packingSize",
                        downloaderId : "$asDownload._id",
                        downloaderRate : "$asDownload.asContractorrates.rate",
                        downloaderRateId : "$asDownload.asContractorrates._id",
                        downloaderPackingSize : "$asUpload.asContractorrates.packingSize",
                        PO_bag : "$asProductionOutput.quantityInBag",
                        PO_id : "$asProductionOutput.purchaseOrderId",
                        carriageRateId : "$asCarrigeRate._id",
                        FarmId : "$asCarrigeRate.farmAddress",

                    }
                }
            ]).then(function (data1) {
                var process = "Dry";
                data1[0].process = process;
                purchaseExpenses.updateOne(
                    { $and: [ {process:data1[0].process }, { commodityOutputId : commodityOutputId },
                            {contractorRateId : downloaderRateId}  ,
                            {processId : newOutputId}
                        ] },
                    { $set: {
                            commodityOutputId : body.setObj.commodityOutputId,
                            contractorRateId:data1[0].downloaderRateId,
                            purchaseOrderId:data1[0].PO_id,
                            packingSize:data1[0].downloaderPackingSize,
                            rate : data1[0].downloaderRate,
                            process:'Dry',
                            amount : data1[0].downloaderRate * data1[0].PO_bag,
                        } },
                ).then(function (updateDate) {
                    var data={message:"success",data:updateDate};
                }).catch(function (err) {
                    var data={message:"error",data:err.message}
                });
                purchaseExpenses.updateOne(
                    { $and: [ {process:data1[0].process }, { commodityOutputId : commodityOutputId },
                            {contractorRateId : uploaderRateId}  ,
                            {processId : newOutputId}
                        ] },
                    { $set: {
                            commodityOutputId : body.setObj.commodityOutputId,
                            contractorRateId:data1[0].uploaderRateId,
                            purchaseOrderId:data1[0].PO_id,
                            packingSize:data1[0].uploaderPackingSize,
                            rate : data1[0].uploaderRate,
                            process:'Dry',
                            amount : data1[0].uploaderRate * data1[0].PO_bag,
                        } },
                ).then(function (updateData1) {
                    var data={message:"success",data:updateData1};
                }).catch(function (err) {
                    var data={message:"error",data:err.message}
                });
            }).catch(function (err) {
                var arr={message:"error",data:err.message}
            });
            // close here
            callback(data);
        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);
        });
    }
    ,
    deleteDry:function (id,callback) {
        dry.updateOne(
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
    },
    deleteExpenses:function (id,callback){
        purchaseExpenses.updateMany(
            { "processId" : id.id },
            { $set: {
                    isActive:false
                } },

        ).then(function (updateDate2) {
            var data={message:"success",data:updateDate2}
            callback(data)
        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);
        });
    }
}
function getRandomArbitrary(min, max) {
    return  Math.round(Math.random() * (max - min) + min);
}
function promisecustom(config){
    var searchfilter;
    if(config.obj.supplierId!=undefined){
        searchfilter = { "purchaseOrderId" : ObjectId(config.order),"supplierId":config.obj.oldid,"dc":'c'}
    }
    else if(config.obj.downloaderId!=undefined){
        searchfilter = { "purchaseOrderId" : ObjectId(config.order),"downloaderId":config.obj.oldid,"dc":'c'}
    }
    else if(config.obj.uploaderId!=undefined){
        searchfilter = { "purchaseOrderId" : ObjectId(config.order),"uploaderId":config.obj.oldid,"dc":'c'}
    }
    else if(config.obj.carriageId!=undefined){
        searchfilter = { "purchaseOrderId" : ObjectId(config.order),"carriageId":config.obj.oldid,"dc":'c'}
    }
    delete config.obj.oldid;
    return new Promise(function(resolve, reject) {
        purchaseLedger.updateOne(
            searchfilter,
            { $set: config.obj },
        ).then(function (updateDate) {
            var data={message:"success",data:updateDate}
            resolve(data)
        }).catch(function (err) {
            var data={message:"error",data:err.message}
            reject(data);
        });
    })
}
module.exports=dryDal;