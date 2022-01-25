var productionOutput=require('../models/productionOutput');
var db=require("../utility/conn");
var moment=require("moment")
var mongoose=require("mongoose");
const contractorRate = require("../models/contractorRate");
const commodityIssueForProduction = require("../models/commodityIssueForProduction");
const purchaseExpenses = require("../models/purchaseExpences");
const ObjectId = mongoose.Types.ObjectId;
var productionOutputDal={
    getSimpleProductionOutput:function(callback){
        productionOutput.find({isActive:true}).then(function (data){
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        });
    },

    // getproductionOutputData:function (id,callback) {
    allProductionOutputData:function (callback) {
        // var iid = id;
        productionOutput.aggregate([
            // {
            //     $match: { commodityIssueForProductionId:ObjectId(id)  }
            // },
            { $lookup:
                    {
                        from: "commodityissueforproductions",
                        localField: "commodityIssueForProductionId",
                        foreignField: "_id",
                        as: "commodityIssueForProduction"
                    }
            },
            { $unwind : { path: "$commodityIssueForProduction", preserveNullAndEmptyArrays: true } },
            { $lookup:
                    {
                        from: "contractorrates",
                        localField: "uploaderRate",
                        foreignField: "_id",
                        as: "currentUploaderRate"
                    }
            },
            { $unwind : { path: "$currentUploaderRate", preserveNullAndEmptyArrays: true } },

            { $lookup:
                    {
                        from: "productitems",
                        localField: "productItemId",
                        foreignField: "_id",
                        as: "productName",
                    }
            },
            { $unwind : { path: "$productName", preserveNullAndEmptyArrays: true } },

            { $lookup:
                    {
                        from: "purchaseorders",
                        localField: "purchaseOrderId",
                        foreignField: "_id",
                        as: "invoice",
                    }
            },
            { $unwind : { path: "$invoice", preserveNullAndEmptyArrays: true } },

            { $lookup:
                    {
                        from: "contractorrates",
                        localField: "downloaderRate",
                        foreignField: "_id",
                        as: "currentDownloaderRate"
                    }
            },
            { $unwind : { path: "$currentDownloaderRate", preserveNullAndEmptyArrays: true } },
        ]).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    },

    getAllProductionOutput:function (body,callback) {
        //var col=body.order[0].column=="0"?"_id":col=body.order[0].column=="4"?"fixationStatus":body.order[0].column=="5"?"paidAmount":"_id";
        productionOutput.dataTables({
            find: { isActive: true},
            limit: body.length,
            skip: body.start,
            populate:
                [{ path: 'purchaseOrderId'}, { path: 'productItemId'},{ path: 'storeId'},{ path: 'uploaderRate',populate: {path: 'contractorId'} },{ path: 'downloaderRate',populate: {path: 'contractorId'}}],
            search: {
                value: body.search.value,
                fields: ['invoiceIdManual']

            },

            formatter: function(user) {
                return {
                    DbId:user._doc._id,
                    store:user._doc.storeId._doc.name,
                    lot:user._doc.lot,
                    uploaderRate:user._doc.uploaderRate,
                    downloaderRate:user._doc.downloaderRate,
                    Item:user._doc.productItemId._doc.name,
                    Invoice:user._doc.purchaseOrderId._doc.invoiceIdManual,
                    rawSlipNo:user._doc.rawSlipNo,
                    packingSize:user._doc.packingSize,
                    quantityInBag:user._doc.quantityInBag,
                    heap:user._doc.heap,
                    productNo:user._doc.productNo,
                    Date:moment(user._doc.date).format('YYYY-MM-DD'),
                    Actions:null,
                }
            },


        }).then(function (table) {
            table.draw=parseInt(body.draw);
            table.recordsTotal=table.total;
            table.recordsFiltered=table.total;
            callback({message:"success",data:table}); // table.total, table.data
        }).catch(function (err) {
            callback({message:"error",data:err})
        })
    },
    getProductionOutputById:function (id,callback) {
        productionOutput.aggregate([
            {
                $match: { _id:ObjectId(id)  }
            },
            { $lookup:
                    {
                        from: "commodityissueforproductions",
                        localField: "commodityIssueForProductionId",
                        foreignField: "_id",
                        as: "commodityIssueForProduction"
                    }
            },
            { $unwind : { path: "$commodityIssueForProduction", preserveNullAndEmptyArrays: true } },
            { $lookup:
                    {
                        from: "contractorrates",
                        localField: "uploaderRate",
                        foreignField: "_id",
                        as: "currentUploaderRate"
                    }
            },
            { $unwind : { path: "$currentUploaderRate", preserveNullAndEmptyArrays: true } },
            { $lookup:
                    {
                        from: "contractorrates",
                        localField: "downloaderRate",
                        foreignField: "_id",
                        as: "currentDownloaderRate"
                    }
            },
            { $unwind : { path: "$currentDownloaderRate", preserveNullAndEmptyArrays: true } },
        ]).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    },

    getProductionOutputData:function (id,callback) {
        var iid = id;
        productionOutput.aggregate([
            {
                $match: { commodityIssueForProductionId:ObjectId(id)  }
            },

            //pipeline to get uploader and downloader names from
            {
                $lookup:{
                    from:"contractorrates",
                    let:{uploaderRate1:"$uploaderRate"},
                    pipeline:[{$match: { $expr: { $eq: ["$_id", "$$uploaderRate1"] }}},
                        {
                            $lookup:{
                                from:"contractors",
                                let:{id:"$contractorId"},
                                pipeline:[{$match: { $expr: { $eq: ["$_id", "$$id"] }}},
                                ],
                                as:"uploaderData",
                            }
                        },
                        { $unwind : { path: "$uploaderData", preserveNullAndEmptyArrays: true } },
                    ],
                    as:"uploaderData",
                },
            },

            {
                $lookup:{
                    from:"contractorrates",
                    let:{downloaderRate1:"$downloaderRate"},
                    pipeline:[{$match: { $expr: { $eq: ["$_id", "$$downloaderRate1"] }}},
                        {
                            $lookup:{
                                from:"contractors",
                                let:{id:"$contractorId"},
                                pipeline:[{$match: { $expr: { $eq: ["$_id", "$$id"] }}},
                                ],
                                as:"downloaderData",
                            }
                        },
                        { $unwind : { path: "$downloaderData", preserveNullAndEmptyArrays: true } },
                    ],
                    as:"downloaderData",
                },
            },

            //end of pipelines

            { $lookup:
                    {
                        from: "commodityissueforproductions",
                        localField: "commodityIssueForProductionId",
                        foreignField: "_id",
                        as: "commodityIssueForProduction"
                    }
            },
            { $unwind : { path: "$commodityIssueForProduction", preserveNullAndEmptyArrays: true } },
            { $lookup:
                    {
                        from: "contractorrates",
                        localField: "uploaderRate",
                        foreignField: "_id",
                        as: "currentUploaderRate"
                    }
            },
            { $unwind : { path: "$currentUploaderRate", preserveNullAndEmptyArrays: true } },

            { $lookup:
                    {
                        from: "productitems",
                        localField: "productItemId",
                        foreignField: "_id",
                        as: "productName",
                    }
            },
            { $unwind : { path: "$productName", preserveNullAndEmptyArrays: true } },

            { $lookup:
                    {
                        from: "purchaseorders",
                        localField: "purchaseOrderId",
                        foreignField: "_id",
                        as: "invoice",
                    }
            },
            { $unwind : { path: "$invoice", preserveNullAndEmptyArrays: true } },

            { $lookup:
                    {
                        from: "contractorrates",
                        localField: "downloaderRate",
                        foreignField: "_id",
                        as: "currentDownloaderRate"
                    }
            },
            { $unwind : { path: "$currentDownloaderRate", preserveNullAndEmptyArrays: true } },
            { $lookup:
                    {
                        from: "stores",
                        localField: "storeId",
                        foreignField: "_id",
                        as: "storeName"
                    }
            },
            { $unwind : { path: "$storeName", preserveNullAndEmptyArrays: true } },

        ]).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    },

    addProductionOutput:function (body,callback) {
        const productArray = Object.values(body)
        productionOutput.insertMany(productArray).then(function (data) {
            var arr={message:"success",data:data};
            // start here
            for (let i=0; i<data.length; i++){
                var id = data[i]._doc._id;
                var purchaseId = data[i]._doc.purchaseOrderId;
                var quantityInBag = data[i]._doc.quantityInBag;
                productionOutput.aggregate([
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
                        process:'Output',
                        processId : id,
                        amount : data1[0].downloadRate * quantityInBag,
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
                        process:'Output',
                        processId : id,
                        amount : data1[0].uploadRate * quantityInBag,
                    });
                    purExpenseUpload.save().then(function (savedData) {
                        var data={message:"success",data:savedData}
                    }).catch(function (err) {
                        var data={message:"error",data:err.message}
                    });
                }).catch(function (err) {
                    var arr={message:"error",data:err.message}
                });
            }
            // close here
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    },
    updateProductionOutput:function (body,callback) {
        var newinputId = body.id;
        var newBag = body.quantityInBag;
        var newDownloadId = body.downloaderRate;
        var newUploadId = body.uploaderRate;
        productionOutput.findOneAndUpdate(
            { "_id" : body.id },
            { $set: {
                    purchaseOrderId:body.purchaseOrderId,
                    commodityIssueForProductionId:body.commodityIssueForProductionId,
                    rawSlipNo:body.rawSlipNo,
                    productItemId:body.productItemId,
                    lot:body.lot,
                    packingSize:body.packingSize,
                    quantityInBag:body.quantityInBag,
                    heap:body.heap,
                    productNo:body.productNo,
                    uploaderRate:body.uploaderRate,
                    downloaderRate:body.downloaderRate,
                    storeId:body.storeId,
                    date:body.date,
                } },
            {runValidators: true}
        ).then(function (updateDate) {
            var data={message:"success",data:updateDate};
            // start here
            var purchaseId = updateDate._doc.purchaseOrderId;
            var oldDownloadId = updateDate._doc.downloaderRate.toString();
            var oldUploadId = updateDate._doc.uploaderRate.toString();
            productionOutput.aggregate([
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
                var process = "Output";
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
                            process:'Output',
                            amount : data1[0].downloadRate * parseInt(newBag),
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
                            process:'Output',
                            amount : data1[0].uploadRate * parseInt(newBag),
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
    deleteProductionOutput:function (id,callback) {
        productionOutput.updateOne(
            { '_id' :id },
            { $set: {
                    isActive:false
                } }
        ).then(function (updateDate) {
            var data={message:"success",data:updateDate}
            callback(data);
        }).catch(function (err) {
            var data={message:'error',data:err.message}
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
module.exports=productionOutputDal;