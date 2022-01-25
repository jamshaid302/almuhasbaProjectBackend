var packing=require("../models/packing");
var mongoose=require("mongoose");
const stockSum = require("../models/stockSum");
const Dry = require("../models/dry");
var dryDal = require("../DAL/dry");
const purchaseExpenses = require("../models/purchaseExpences");
const {contractorRate} = require("../utility/conn");
const ObjectId = mongoose.Types.ObjectId;
var packingDal={
    getAllPacking:function (callback) {
        packing.find({isActive:true}).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    },
    getPackingWithDetail:function (callback) {
        packing.aggregate([
            { $match: { isActive:true} },
            // { $lookup: {
            //         from: 'salestores',
            //         localField: 'salestoreId',
            //         foreignField: '_id',
            //         as: 'storedata'
            //     }},
            // { $unwind : { path: "$storedata", preserveNullAndEmptyArrays: true } },
            // {
            //     $match:  { "storedata.isActive":true }
            // },
            { $lookup: {
                    from: 'packingsizes',
                    localField: 'packingsizeId',
                    foreignField: '_id',
                    as: 'packingsizedata'
                }},
            { $unwind : { path: "$packingsizedata", preserveNullAndEmptyArrays: true } },
            {
                $match:  { "packingsizedata.isActive":true }
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
                    from: 'productitems',
                    localField: 'productItemId',
                    foreignField: '_id',
                    as: 'productdata'
                }},
            { $unwind : { path: "$productdata", preserveNullAndEmptyArrays: true } },
            {
                $match:  { "productdata.isActive":true }
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
    getPackingById:function (id,callback) {
        packing.find({_id : id,isActive:true}).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    },

    addPacking:function (body,callback){
        var packingObj = new packing({
            //salestoreId:body.salestoreId,
            packingsizeId:body.packingsizeId,
            uploaderId:body.uploaderId,
            downloaderId:body.downloaderId,
            dryId:body.dryId,
            dryIdtxt : body.dryName,
            productItemId:body.productItemId,
            prdOutputId : body.prdoutputId,
            qty:parseInt(body.qty),
        });
        packingObj.save().then(function (savedData) {
            var data={message:"success",data:savedData};
            var id = savedData._doc._id;
            var qty = savedData._doc.qty;
            packing.aggregate([
                { $match: {
                        isActive: true,_id:ObjectId(id)
                    }},
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
                    $lookup:{
                        from:"dries",
                        let:{dryId:"$dryId"},
                        pipeline:[
                            {$match: { $expr: { $eq: ["$_id", "$$dryId"] }}},
                            {
                                $lookup:{
                                    from:"productionoutputs",
                                    let:{commodityId:"$commodityOutputId"},
                                    pipeline:[
                                        {$match: { $expr: { $eq: ["$_id", "$$commodityId"] }}},
                                    ],
                                    as:"asCommodity",
                                },
                            },
                            { $unwind : { path: "$asCommodity", preserveNullAndEmptyArrays: true } },
                        ],
                        as:"asDry",
                    },
                },
                { $unwind : { path: "$asDry", preserveNullAndEmptyArrays: true } },
                {
                    $project:{
                        prdOutputBag : "$asDry.asCommodity.quantityInBag",
                        purchaseOrderId : "$asDry.asCommodity.purchaseOrderId",
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
                    packingSize: data1[0].conDownloadSize,
                    rate :  data1[0].conDownloadRate ,
                    process:'Packing',
                    processId : id,
                    amount : data1[0].conDownloadRate *qty,
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
                    packingSize: data1[0].conUploadSize,
                    rate :  data1[0].conUploadRate ,
                    process:'Packing',
                    processId : id,
                    amount : data1[0].conUploadRate * qty,
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
    }
    ,

    getPackingQty:function (body,callback){
        packing.find({_id : body.id}).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })

    },

    getUploadRateId :async function (body,callback){
        await packing.findOne({_id: body.id}).then(function (partOne) {
            var data={message:"success",data:partOne._doc.uploaderId}
                 contractorRate.findOne({contractorId: partOne._doc.uploaderId}).then(function (insideOne) {
                    var data={message:"success",data:insideOne._doc._id,data2 : insideOne._doc.packingSize}
                    callback(data);
                }).catch(function (data) {
                    var data={message:"error",data:err.message}
                    callback(data);
                });
        }).catch(function (data) {
            var data={message:"error",data:err.message}
            callback(data);
        });
    },
    getDownloadRateId :async function (body,callback){
        packing.findOne({_id: body.id}).then(function (partTwo) {
            var data={message:"success",data:partTwo._doc.downloaderId}
            //
            contractorRate.findOne({contractorId: partTwo._doc.downloaderId}).then(function (insideTwo) {
                var data={message:"success",data:insideTwo._doc._id,data2 : insideTwo._doc.packingSize}
                callback(data);
            }).catch(function (data) {
                var data={message:"error",data:err.message}
                callback(data);
            });
            //
        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);
        });
    },

    updatePacking:function (body,callback){
        var body = body;
        var oldURateId = body.oldURateId;
        var oldDRateId = body.oldDRateId;
        var newUploaderId = body.uploaderId;
        var newDownloaderID = body.downloaderId;
        var newqty = body.qty;
        packing.findOneAndUpdate(
            {"_id":body.id},
            {
                $set: {
                    // salestoreId:ObjectId(body.salestoreId),
                    packingsizeId:ObjectId(body.packingsizeId),
                    uploaderId:ObjectId(body.uploaderId),
                    downloaderId:ObjectId(body.downloaderId),
                    dryId:ObjectId(body.dryId),
                    dryIdtxt : body.dryName,
                    productItemId:ObjectId(body.productItemId),
                    prdOutputId : body.prdoutputId,
                    qty:parseInt(body.qty),
                    movedQty:body.movedQty,
                }
            },
        ).then(function (updateData) {
            var process_Id = updateData._doc._id.toString();
            //==
            // purchase Expense - Start
            packing.aggregate([
                { $match: {
                        isActive: true,_id:ObjectId(updateData._doc._id)
                    }},
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
                    $lookup:{
                        from:"dries",
                        let:{dryId:"$dryId"},
                        pipeline:[
                            {$match: { $expr: { $eq: ["$_id", "$$dryId"] }}},
                            {
                                $lookup:{
                                    from:"productionoutputs",
                                    let:{commodityId:"$commodityOutputId"},
                                    pipeline:[
                                        {$match: { $expr: { $eq: ["$_id", "$$commodityId"] }}},
                                    ],
                                    as:"asCommodity",
                                },
                            },
                            { $unwind : { path: "$asCommodity", preserveNullAndEmptyArrays: true } },
                        ],
                        as:"asDry",
                    },
                },
                { $unwind : { path: "$asDry", preserveNullAndEmptyArrays: true } },
                {
                    $project:{
                        prdOutputBag : "$asDry.asCommodity.quantityInBag",
                        purchaseOrderId : "$asDry.asCommodity.purchaseOrderId",
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
                let finalUConRateId = 0; let finalDConRateId = 0;
                let finalUPackSize = 0;  let finalDPackSize = 0;
                let finalUPackRate = 0;  let finalDPackRate = 0;
                let finalUPO_id = 0; let finalDPO_id = 0;
                for(var loop=0; loop<data1.length;loop++){
                    if(body.oldUPackSize == data1[loop].conUploadSize) {
                        finalUConRateId = data1[loop].conUploadId.toString();
                        finalUPackSize = data1[loop].conUploadSize;
                        finalUPackRate = data1[loop].conUploadRate;
                        finalUPO_id = data1[loop].purchaseOrderId;
                    }
                }
                for(var index=0; index<data1.length;index++){
                    if(body.oldDPackSize == data1[index].conDownloadSize) {
                        finalDConRateId = data1[index].conDownloadId.toString();
                        finalDPackSize = data1[index].conDownloadSize;
                        finalDPackRate = data1[index].conDownloadRate;
                        finalDPO_id = data1[index].purchaseOrderId;
                    }
                }
                // for uploader
                purchaseExpenses.updateOne (
                    { $and: [ {process:"Packing" }, { purchaseOrderId : finalUPO_id } ,
                            { contractorRateId : ObjectId(body.oldURateId) },
                            {processId : process_Id}
                        ] },
                    { $set: {
                            contractorRateId:finalUConRateId,
                            purchaseOrderId:finalUPO_id,
                            packingSize: finalUPackSize,
                            rate :  finalUPackRate ,
                            process:'Packing',
                            amount : newqty * parseInt(finalUPackRate),
                        } },
                ).then(function (savedData) {
                    var data={message:"success",data:savedData}
                    //callback(data);
                }).catch(function (err) {
                    var data={message:"error",data:err.message}
                    //callback(data);
                });

                // for downloader
                purchaseExpenses.updateOne(
                    { $and: [ {process:"Packing" }, { purchaseOrderId : finalDPO_id } ,
                            { contractorRateId : ObjectId(body.oldDRateId) },
                            {processId : process_Id}
                        ] },
                    { $set: {
                            contractorRateId:finalDConRateId,
                            purchaseOrderId:finalDPO_id,
                            packingSize: finalDPackSize,
                            rate : finalDPackRate ,
                            process:'Packing',
                            amount : finalDPackRate * newqty,
                        } },
                ).then(function (savedData) {
                    var data={message:"success",data:savedData}
                    //callback(data);
                }).catch(function (err) {
                    var data={message:"error",data:err.message}
                    //callback(data);
                });



            }).catch(function (err) {
                var arr={message:"error",data:err.message}
            });
            // purchase Expense - Close
            //==
            var data={message:"success",data:updateData}
            callback(data);
        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);
        });
    }
    ,
    deletePacking:function (id,callback) {
        packing.updateOne(
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

    deleteExpenses:function (id,callback) {
        purchaseExpenses.updateMany(
            { "processId" : id.id},
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

    getCategoryByPackingId:function (id,callback){
        packing.aggregate([
            { $match: { _id:ObjectId(id)} },
            {
                $lookup:{
                    from:"dries",
                    let:{packId:"$dryId"},
                    pipeline:[{$match: { $expr: { $eq: ["$_id", "$$packId"] }}},
                        {
                            $lookup:{
                                from:"productionoutputs",
                                let:{commOutputId:"$commodityOutputId"},
                                pipeline:[{$match: { $expr: { $eq: ["$_id", "$$commOutputId"] }}},
                                    {
                                        $lookup: {
                                            from: "purchaseorders",
                                            let: {purchaseId: "$purchaseOrderId"},
                                            pipeline: [{$match: {$expr: {$eq: ["$_id", "$$purchaseId"]}}},
                                                {
                                                    $lookup: {
                                                        from: "categories",
                                                        let: {catId: "$categoryId"},
                                                        pipeline: [{$match: {$expr: {$eq: ["$_id", "$$catId"]}}},

                                                            {
                                                                $graphLookup: {
                                                                    from: "categories",
                                                                    startWith: "$categoryId",
                                                                    connectFromField: "categoryId",
                                                                    connectToField: "_id",
                                                                    maxDepth: 0,
                                                                    as: "cat",
                                                                    restrictSearchWithMatch: { "isActive" : true },
                                                                },
                                                            },
                                                            { $unwind : { path: "$cat", preserveNullAndEmptyArrays: true } },

                                                        ],
                                                        as:"subcat"
                                                    }
                                                },
                                                { $unwind : { path: "$subcat", preserveNullAndEmptyArrays: true } },
                                            ],
                                            as:"purchaseData"
                                        },

                                    },
                                    { $unwind : { path: "$purchaseData", preserveNullAndEmptyArrays: true } },

                                ],
                                as:"comOutput"
                            }
                        },
                        { $unwind : { path: "$comOutput", preserveNullAndEmptyArrays: true } },
                    ],
                    as:"dryData",
                },

            },
            { $unwind : { path: "$dryData", preserveNullAndEmptyArrays: true } },
            {
                $project:{
                    salestoreId : 1,
                    packingsizeId : 1,
                    productItemId : 1,
                    qty : 1,
                    subcategory:'$dryData.comOutput.purchaseData.subcat.name',
                    category:'$dryData.comOutput.purchaseData.subcat.cat.name',
                    date : 1,
                    isActive : 1,


                }
            }

        ]).then(function (data1){
            var data={message:"success",data:data1}
            callback(data)
        }).catch(function (err){
            var data={message:"error",data:err.message}
            callback(data);
        })
    },

    searchProduct:function (search,callback) {

        Dry.aggregate([
            {
                $match: {
                    $or: [
                        {lossNumber :  { $regex: '.*' + search + '.*' }}    ,
                    ]
                }
            },{$limit: 10},

            // {$project: {
            //         productItem: 1, packingsize:1,qty:1,subcategory:1,
            //         category:1, _id: 1, productItemId:1,salestoreId:1}
            // }

            // { $match: { $text: { $search: search } }},
            // {productItem :  { $regex: '.*' + search + '.*' }}    ,
            // {$limit: 10},
            // {$project: {productItem: 1, _id: 1,}}

        ]).then(function (data) {

            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err}
            callback(arr);
        })

    },
}



module.exports=packingDal;