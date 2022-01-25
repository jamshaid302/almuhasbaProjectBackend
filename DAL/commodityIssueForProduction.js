var commodityIssueForProduction=require('../models/commodityIssueForProduction');
var db=require('../utility/conn');
var moment=require('moment');
var mongoose=require('mongoose');
var purchaseExpenses = require("../models/purchaseExpences");
const purchaseOrder = require("../models/purchaseOrder");
var ObjectId = mongoose.Types.ObjectId;
var commodityIssueForProductionDal={
    // getAllCommodityIssueForProduction:function (body,callback) {
    //     //var col=body.order[0].column=="0"?"_id":col=body.order[0].column=="4"?"fixationStatus":body.order[0].column=="5"?"paidAmount":"_id";
    //     var d = 10 * (parseInt(body.pagination.page) - 1);
    //     commodityIssueForProduction.dataTables({
    //         find: { isActive: true},
    //         //limit: body.pagination.perpage,
    //         limit : 10,
    //         //skip: parseInt(body.pagination.perpage) * (parseInt(body.pagination.page) - 1),
    //         skip : 10 * (parseInt(body.pagination.page) - 1),
    //         populate:
    //             [ { path: 'purchaseOrderId'},{ path: 'storeId'},{ path: 'uploaderRate',populate: {path: 'contractorId'} },{ path: 'downloaderRate',populate: {path: 'contractorId'}}],
    //
    //         search: {
    //             //value: body.search.value,
    //             value: body.query,
    //             fields: ['invoiceIdManual']
    //         },
    //
    //         formatter: function(user) {
    //             return {
    //                 DbId:user._doc._id,
    //                 pid:user._doc.purchaseOrderId._doc._id,
    //                 Invoice:user._doc.purchaseOrderId._doc.invoiceIdManual,
    //                 store:user._doc.storeId._doc.name,
    //                 storeId:user._doc.storeId._doc._id,
    //                 remainingBags:user._doc.remainingBags,
    //                 bagsForProduction:user._doc.bagsForProduction,
    //                 bagSize:user._doc.bagSize,
    //                 netWeight:user._doc.netWeight,
    //                 PlantNo:user._doc.PlantNo,
    //                 processNo:user._doc.processNo,
    //                 uploaderRate:user._doc.uploaderRate,
    //                 downloaderRate:user._doc.downloaderRate,
    //                 Date:moment(user._doc.date).format('YYYY-MM-DD'),
    //                 Actions:null,
    //             }
    //         },
    //     }).then(function (table) {
    //         table.draw=parseInt(body.draw);
    //         table.recordsTotal=table.total;
    //         table.recordsFiltered=table.total;
    //         callback({message:"success",data:table}); // table.total, table.data
    //     }).catch(function (err) {
    //         callback({message:"error",data:err})
    //     })
    // },
    // getCommodityIssueForProductionById:function (id,callback) {
    //     commodityIssueForProduction.find({_id : id,isActive:true}).then(function (data) {
    //         var arr={message:"success",data:data}
    //         callback(arr);
    //     }).catch(function (err) {
    //         var arr={message:"error",data:err.message}
    //         callback(arr);
    //     })
    // },
    // getCommodityIssueForProductionOne:function(search,callback){
    //     commodityIssueForProduction.find({purchaseOrderId : search,isActive:true}).then(function (data) {
    //         var arr={message:"success",data:data}
    //         callback(arr);
    //     }).catch(function (err) {
    //         var arr={message:"error",data:err.message}
    //         callback(arr);
    //     })
    // },



    getAllCommodityIssueForProduction:function (body,callback) {
        var b = body;
            //var col=body.order[0].column=="0"?"_id":col=body.order[0].column=="4"?"fixationStatus":body.order[0].column=="5"?"paidAmount":"_id";
            commodityIssueForProduction.dataTables({
                find: { isActive: true},
                limit: body.length,
                skip: body.start,
                populate:
                    [ { path: 'purchaseOrderId'},{ path: 'storeId'},{ path: 'uploaderRate',populate: {path: 'contractorId'} },{ path: 'downloaderRate',populate: {path: 'contractorId'}}],
                search: {
                    value: parseInt(body.search.value),
                    regex: 'true',
                    fields: ['processNo'],
                },
                formatter: function(user) {
                    var u = user._doc;
                    var id = user._doc._id;
                    return {
                        DbId:user._doc._id,
                        pid:user._doc.purchaseOrderId._doc._id,
                        Invoice:user._doc.purchaseOrderId._doc.invoiceIdManual,
                        store:user._doc.storeId._doc.name,
                        storeId:user._doc.storeId._doc._id,
                        remainingBags:user._doc.remainingBags,
                        bagsForProduction:user._doc.bagsForProduction,
                        bagSize:user._doc.bagSize,
                        netWeight:user._doc.netWeight,
                        rowId : 1,
                        PlantNo:user._doc.PlantNo,
                        processNo:user._doc.processNo,
                        uploaderRate:user._doc.uploaderRate,
                        downloaderRate:user._doc.downloaderRate,
                        Date:moment(user._doc.date).format('YYYY-MM-DD'),
                        Actions:null,
                    };
                },
            }).then(function (table) {
                table.draw=parseInt(body.draw);
                table.recordsTotal=table.total;
                table.recordsFiltered=table.total;
                callback({message:"success",data:table}); // table.total, table.data
            }).catch(function (err) {
                callback({message:"error",data:err});
            });
    },
    getCommodityIssueForProductionById:function (id,callback) {
        commodityIssueForProduction.find({_id : id,isActive:true}).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    },
    getCommodityIssueForProductionOne:function(search,callback){
        commodityIssueForProduction.find({purchaseOrderId : search,isActive:true}).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    },


    addCommodityIssueForProduction:function (body,callback) {
        var com=new commodityIssueForProduction({
            purchaseOrderId:body.purchaseOrderId,
            storeId:body.storeId,
            remainingBags:body.remainingBags,
            bagsForProduction:body.bagsForProduction,
            bagSize:body.bagSize,
            netWeight:body.netWeight,
            PlantNo:body.PlantNo,
            processNo:body.processNo,
            uploaderRate:body.uploaderRate,
            downloaderRate:body.downloaderRate,
            date:body.date,
        });
        com.save().then(function (savedData) {
            var data={message:"success",data:savedData};
            var id = savedData._doc._id;
            var purchaseId = savedData._doc.purchaseOrderId;
            var bagsForProduction = savedData._doc.bagsForProduction;
            commodityIssueForProduction.aggregate([
                { $match: {
                        isActive: true,_id:ObjectId(id)
                    }},
                {
                    $lookup:{
                        from:"contractorrates",
                        let:{uploadId:"$uploaderRate"},
                        pipeline:[
                            {$match: { $expr: { $eq: ["$_id", "$$uploadId"] }}},
                        ],
                        as:"asUploadRate",
                    },
                },
                { $unwind : { path: "$asUploadRate", preserveNullAndEmptyArrays: true } },
                {
                    $lookup:{
                        from:"contractorrates",
                        let:{downloadId:"$downloaderRate"},
                        pipeline:[
                            {$match: { $expr: { $eq: ["$_id", "$$downloadId"] }}},
                        ],
                        as:"asDownloadRate",
                    },
                },
                { $unwind : { path: "$asDownloadRate", preserveNullAndEmptyArrays: true } },
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
                        downloadSize : "$asDownloadRate.packingSize",
                        downloadRate : "$asDownloadRate.rate",
                        downloadId : "$asDownloadRate._id",
                        downloadTotal: { $multiply: [ "$asDownloadRate.packingSize", "$asDownloadRate.rate" ] },
                        uploadSize : "$asUploadRate.packingSize",
                        uploadRate : "$asUploadRate.rate",
                        uploadId : "$asUploadRate._id",
                        uploadTotal: { $multiply: [ "$asUploadRate.packingSize", "$asUploadRate.rate" ] },
                        carriageRateId : "$asCarrigeRate._id",
                        FarmId : "$asCarrigeRate.farmAddress",
                    }
                }
            ]).then(function (data1) {
                var d = data1;
                var purExpenseDownload=new purchaseExpenses({
                    contractorRateId:data1[0].downloadId,
                    purchaseOrderId:purchaseId,
                    packingSize: data1[0].downloadSize ,
                    rate :  data1[0].downloadRate ,
                    process:'Input',
                    processId : id,
                    amount : data1[0].downloadRate * bagsForProduction,
                });
                purExpenseDownload.save().then(function (savedData) {
                    var data={message:"success",data:savedData}
                    //callback(data);
                }).catch(function (err) {
                    var data={message:"error",data:err.message}
                    //callback(data);
                });
                var purExpenseUpload=new purchaseExpenses({
                    contractorRateId:data1[0].uploadId,
                    purchaseOrderId:purchaseId,
                    packingSize:data1[0].uploadSize,
                    rate : data1[0].uploadRate,
                    process:'Input',
                    processId : id,
                    amount : data1[0].uploadRate * bagsForProduction,
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

    updateCommodityIssueForProduction:function (body,callback) {
        var newinputId = body.id;
        var newBag = body.bagsForProduction;
        var newDownloadId = body.downloaderRate;
        var newUploadId = body.uploaderRate;
        commodityIssueForProduction.findOneAndUpdate(
            { "_id" : body.id },
            { $set: {
                purchaseOrderId:body.purchaseOrderId,
                storeId:body.storeId,
                remainingBags:body.remainingBags,
                bagsForProduction:body.bagsForProduction,
                bagSize:body.bagSize,
                netWeight:body.netWeight,
                PlantNo:body.PlantNo,
                processNo:body.processNo,
                uploaderRate:body.uploaderRate,
                downloaderRate:body.downloaderRate,
                date:body.date,
            } },
            {runValidators: true}
        ).then(function (updateDate) {
            var data={message:"success",data:updateDate};
            // start here
            var purchaseId = updateDate._doc.purchaseOrderId;
            var oldDownloadId = updateDate._doc.downloaderRate.toString();
            var oldUploadId = updateDate._doc.uploaderRate.toString();
            commodityIssueForProduction.aggregate([
                { $match: {
                        isActive: true,_id:ObjectId(newinputId),
                    }},
                {
                    $lookup:{
                        from:"contractorrates",
                        let:{uploadId:"$uploaderRate"},
                        pipeline:[
                            {$match: { $expr: { $eq: ["$_id", "$$uploadId"] }}},
                        ],
                        as:"asUploadRate",
                    },
                },
                { $unwind : { path: "$asUploadRate", preserveNullAndEmptyArrays: true } },
                {
                    $lookup:{
                        from:"contractorrates",
                        let:{downloadId: "$downloaderRate"},
                        pipeline:[
                            {$match: { $expr: { $eq: ["$_id", "$$downloadId"] }}},
                        ],
                        as:"asDownloadRate",
                    },
                },
                { $unwind : { path: "$asDownloadRate", preserveNullAndEmptyArrays: true } },
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
                        downloadSize : "$asDownloadRate.packingSize",
                        downloadRate : "$asDownloadRate.rate",
                        downloadId : "$asDownloadRate._id",
                        downloadTotal: { $multiply: [ "$asDownloadRate.packingSize", "$asDownloadRate.rate" ] },
                        uploadSize : "$asUploadRate.packingSize",
                        uploadRate : "$asUploadRate.rate",
                        uploadId : "$asUploadRate._id",
                        uploadTotal: { $multiply: [ "$asUploadRate.packingSize", "$asUploadRate.rate" ] },
                        carriageRateId : "$asCarrigeRate._id",
                        FarmId : "$asCarrigeRate.farmAddress",
                    }
                }
            ]).then(function (data1) {
                var process = "Input";
                data1[0].process = process;
                purchaseExpenses.updateOne(
                    { $and: [ {process:data1[0].process }, { purchaseOrderId : purchaseId } ,
                            {contractorRateId: oldDownloadId},
                            {processId:newinputId}
                        ] },
                    { $set: {
                            contractorRateId:newDownloadId,
                            purchaseOrderId:purchaseId,
                            packingSize:data1[0].downloadSize,
                            rate : data1[0].downloadRate,
                            process:'Input',
                            amount : data1[0].downloadRate * newBag,
                        } },
                ).then(function (updateDate) {
                     var data={message:"success",data:updateDate};

                }).catch(function (err) {
                    var data={message:"error",data:err.message}
                });

                purchaseExpenses.updateOne(
                    {"process":data1[0].process ,purchaseOrderId : purchaseId  , contractorRateId : oldUploadId,processId:newinputId},
                    { $set: {
                            contractorRateId:newUploadId,
                            purchaseOrderId:purchaseId,
                            packingSize:data1[0].uploadSize,
                            rate : data1[0].uploadRate,
                            process:'Input',
                            amount : data1[0].uploadRate * newBag,
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
    },
    deleteCommodityIssueForProduction:function (id,callback) {
        commodityIssueForProduction.updateOne(
            { "_id" :id },
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
module.exports=commodityIssueForProductionDal;