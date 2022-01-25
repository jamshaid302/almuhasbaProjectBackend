var purchaseOrder=require("../models/purchaseOrder");
var purchaseExpenses = require("../models/purchaseExpences");
var carriageRates = require("../models/carriageRate");
var mongoose=require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
var db=require("../utility/conn");
var moment=require("moment");
const commodityIssueForProduction = require("../models/commodityIssueForProduction");
var purchaseOrderDal={
    getAllPurchaseOrder:function (body,callback) {
            var col=body.order[0].column=="0"?"_id":col=body.order[0].column=="4"?"fixationStatus":body.order[0].column=="5"?"paidAmount":"_id";
            purchaseOrder.dataTables({
                limit: body.length,
                skip: body.start,
                sort: {
                    [col]: body.order[0].dir
                },
                populate:
                    [ { path: 'categoryId'},{ path: 'supplierId'}],

                search: {
                    value: body.search.value,
                    fields: ['invoiceIdManual']

                },

                formatter: function(user) {
                    return {
                        DbId:user._doc._id,
                        Invoice:user._doc.invoiceIdManual,
                        Product:user._doc.categoryId._doc.name,
                        Supplier:user._doc.supplierId._doc.firstName+" "+user._doc.supplierId._doc.lastName,
                        Fixation:user._doc.fixationStatus,
                        Status:user._doc.paidAmount==0?0:user._doc.paidAmount==user._doc.totalAmount?1:2,//0 for unpaid 1 for full paid 2 for partial paid
                        Date:moment(user._doc.purchaseDate).format('YYYY-MM-DD'),
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
    searchInvoice:function (search,callback) {
        purchaseOrder.aggregate([
            {
                // $match: { $text: { $search: search } }
                $match: {
                    $or: [
                        {invoiceIdManual :  { $regex: '.*' + search + '.*' }}    ,
                    ]
                }
            },
            { $limit : 10 },
            { $project: { invoiceIdManual: 1, _id: 1 } }
        ]).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err}
            callback(arr);
        })
    },
    getPurchaseOrderDetailById:function (id,callback) {
        purchaseOrder.aggregate([
            { $match: {
                isActive: true,_id:ObjectId(id)
            }},
            { $lookup:
                {
                    from: "categories",
                    localField: "categoryId",
                    foreignField: "_id",
                    as: "category"
                }
            },
            { $unwind : { path: "$category", preserveNullAndEmptyArrays: true } },
            { $lookup:
                {
                    from: "suppliers",
                    localField: "supplierId",
                    foreignField: "_id",
                    as: "supplier"
                }
            },
            { $unwind : { path: "$supplier", preserveNullAndEmptyArrays: true } },
            { $lookup:
                {
                    from: "stores",
                    localField: "storeId",
                    foreignField: "_id",
                    as: "store"
                }
            },
            { $unwind : { path: "$store", preserveNullAndEmptyArrays: true } },
            { $lookup:
                {
                    from: "carriagerates",
                    localField: "carriageRateId",
                    foreignField: "_id",
                    as: "farmCarriageRate"
                }

            },
            { $unwind : { path: "$farmCarriageRate", preserveNullAndEmptyArrays: true } },
            { $lookup:
                {
                    from: "farmaddresses",
                    localField: "farmCarriageRate.farmAddress",
                    foreignField: "_id",
                    as: "farmAddress"
                }
            },
            { $unwind : { path: "$farmAddress", preserveNullAndEmptyArrays: true } },

            { $lookup:
                {
                    from: "contractorrates",
                    localField: "uploaderRate",
                    foreignField: "_id",
                    as: "currentuploader"
                }
            },
            { $unwind : { path: "$currentuploader", preserveNullAndEmptyArrays: true } },
            { $lookup:
                {
                    from: "contractorrates",
                    localField: "currentuploader.contractorId",
                    foreignField: "contractorId",
                    as: "otheruploader"
                }
            },
            { $lookup:
                {
                    from: "contractorrates",
                    localField: "downloaderRate",
                    foreignField: "_id",
                    as: "currentdownloader"
                }
            },
            { $unwind : { path: "$currentdownloader", preserveNullAndEmptyArrays: true } },
            { $lookup:
                {
                    from: "contractorrates",
                    localField: "currentdownloader.contractorId",
                    foreignField: "contractorId",
                    as: "otherdownloader"
                }
            },
            { $lookup:
                {
                    from: "contractorrates",
                    localField: "downloaderRate",
                    foreignField: "_id",
                    as: "currentdownloader"
                }
            },
            { $unwind : { path: "$currentdownloader", preserveNullAndEmptyArrays: true } },
            { $lookup:
                {
                    from: "contractorrates",
                    localField: "currentdownloader.contractorId",
                    foreignField: "contractorId",
                    as: "otherdownloader"
                }
            },
            { $lookup:
                {
                    from: "contractorrates",
                    localField: "carriageRate",
                    foreignField: "_id",
                    as: "currentcarriage"
                }
            },
            { $unwind : { path: "$currentcarriage", preserveNullAndEmptyArrays: true } },
            { $lookup:
                {
                    from: "contractorrates",
                    localField: "currentcarriage.contractorId",
                    foreignField: "contractorId",
                    as: "othercarriage"
                }
            },
        ]).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err}
            callback(arr);
        })
    },
    getPurchaseOrderById:function (id,callback) {
        purchaseOrder.aggregate([
            { $match: {
                isActive: true,_id:ObjectId(id)
            }},
            { $lookup:
                {
                    from: "carriagerates",
                    localField: "carriageRateId",
                    foreignField: "_id",
                    as: "farmCarriageRate"
                }
            },
            { $unwind : { path: "$farmCarriageRate", preserveNullAndEmptyArrays: true } },
            { $lookup:
                {
                    from: "contractorrates",
                    localField: "uploaderRate",
                    foreignField: "_id",
                    as: "currentUploader"
                }
            },
            { $unwind : { path: "$currentUploader", preserveNullAndEmptyArrays: true } },
            { $lookup:
                {
                    from: "contractorrates",
                    localField: "downloaderRate",
                    foreignField: "_id",
                    as: "currentDownloader"
                }
            },
            { $unwind : { path: "$currentDownloader", preserveNullAndEmptyArrays: true } },
            { $lookup:
                {
                    from: "contractorrates",
                    localField: "carriageRate",
                    foreignField: "_id",
                    as: "currentCarriage"
                }
            },
            { $unwind : { path: "$currentCarriage", preserveNullAndEmptyArrays: true } },
        ]).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    },
    addPurchaseOrder:function (body,callback) {
        var pur=new purchaseOrder({
            categoryId:body.categoryId,
            supplierId:body.supplierId,
            carriageRateId:body.carriageRateId,
            storeId:body.storeId,
            uploaderRate:body.uploaderRate,
            uploaderBag:body.uploaderBag,
            downloaderRate:body.downloaderRate,
            downloaderBag:body.downloaderBag,
            carriageRate:body.carriageRate,
            carriageBag:body.carriageBag,
            fakeCarriageWeight:body.fakeCarriageWeight,
            invoiceIdManual:body.invoiceIdManual,
            vehicleNumber:body.vehicleNumber,
            gatePass:body.gatePass,
            driverName:body.driverName,
            purchaseDate:body.purchaseDate,
            conveyno:body.conveyno,
            storageSlipNo:body.storageSlipNo,
            purity:body.purity,
            uploaderClerk:body.uploaderClerk,
            downloaderClerk:body.downloaderClerk,
            note:body.note,
            farmGross:body.farmGross,
            farmTare:body.farmTare,
            factoryGross:body.factoryGross,
            factoryTare:body.factoryTare,
            bardana:body.bardana,
            kanta:body.kanta,
            sangli:body.sangli,
            moisture:body.moisture,
            other:body.other,
            rate:body.rate,
            premium:body.premium,
            pageRef:body.pageRef,
            fixType:body.fixType,
            rateType:body.rateType,
            fixationDate:body.fixationDate,
            fixationStatus:body.fixationStatus,
            status:body.status,
            suspect:body.suspect,
            totalAmount:body.totalAmount,
            tip:body.fixationtip,
            supplierAmount : body.supplierAmount
        });
        pur.save().then(function (savedData) {
            var data={message:"success",data:savedData};
            var id = savedData._doc._id;
            var downloaderBags = savedData._doc.downloaderBag;
            var uploaderBags = savedData._doc.uploaderBag;
            purchaseOrder.aggregate([
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
                var purExpenseDownload=new purchaseExpenses({
                    contractorRateId:data1[0].downloadId,
                    purchaseOrderId:id,
                    packingSize: data1[0].downloadSize ,
                    rate : data1[0].downloadRate,
                    farmId:data1[0].FarmId,
                    process:'Purchase',
                    processId : id,
                    amount :  data1[0].downloadRate * downloaderBags,
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
                    purchaseOrderId:id,
                    packingSize:data1[0].uploadSize,
                    rate : data1[0].uploadRate,
                    farmId:data1[0].FarmId,
                    process:'Purchase',
                    processId : id,
                    amount : data1[0].uploadRate * uploaderBags,
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

    addFixation:function (body,callback) {
        purchaseOrder.update({_id:body.id},{
            totalAmount:body.totalAmount,
            tip:body.fixationtip,
            fixationStatus:true,
            rate:body.rate,
            rateType:body.spotFixation["quantityType"],
            pageRef:body.spotFixation["pageref"],
            fixType:body.spotFixation["fixtype"],
            fixationDate:body.spotFixation["fixationDate"],
            premium:body.spotFixation["premium"]=="?"?null:body.spotFixation["premium"],
        }).then(function (updateDate) {
            var data={message:"success",data:updateDate};
            callback(data);
        }).catch(function (err) {
            var data={message:"error",data:err}
            callback(data);
        })
    },

    updatePurchaseOrder:function (body,callback) {

        var newinputId = body.id;
        var newCarriageRateId = body.carriageRateId;
        var newUploaderBags = body.uploaderBag;
        var newDownloaderBags = body.downloaderBag;
        var newDownloadId = body.downloaderRate;
        var newUploadId = body.uploaderRate;

        purchaseOrder.findOneAndUpdate(
            { "_id" : body.id },
            { $set: {
                categoryId:body.categoryId,
                supplierId:body.supplierId,
                carriageRateId:body.carriageRateId,
                storeId:body.storeId,
                uploaderRate:body.uploaderRate,
                uploaderBag:body.uploaderBag,
                downloaderRate:body.downloaderRate,
                downloaderBag:body.downloaderBag,
                carriageRate:body.carriageRate,
                carriageBag:body.carriageBag,
                fakeCarriageWeight:body.fakeCarriageWeight,
                invoiceIdManual:body.invoiceIdManual,
                vehicleNumber:body.vehicleNumber,
                gatePass:body.gatePass,
                driverName:body.driverName,
                purchaseDate:body.purchaseDate,
                conveyno:body.conveyno,
                storageSlipNo:body.storageSlipNo,
                purity:body.purity,
                uploaderClerk:body.uploaderClerk,
                downloaderClerk:body.downloaderClerk,
                note:body.note,
                farmGross:body.farmGross,
                farmTare:body.farmTare,
                factoryGross:body.factoryGross,
                factoryTare:body.factoryTare,
                bardana:body.bardana,
                kanta:body.kanta,
                sangli:body.sangli,
                moisture:body.moisture,
                other:body.other,
                suspect:body.suspect,
                totalAmount:body.totalAmount,
                supplierAmount : body.supplierAmount
            } },
            {runValidators: true}
        ).then(function (updateDate) {

            var data={message:"success",data:updateDate};
            // start here
            var purchaseId = updateDate._doc._id.toString();

            var oldDownloadId = updateDate._doc.downloaderRate.toString();
            var oldUploadId = updateDate._doc.uploaderRate.toString();
            var oldFarmId = updateDate._doc.farmId.toString();
            purchaseOrder.aggregate([
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

                var process = "Purchase";
                data1[0].process = process;
                purchaseExpenses.updateOne(
                    { $and: [ {process:data1[0].process }, { purchaseOrderId : purchaseId } ,
                            {contractorRateId: oldDownloadId},
                            {processId : newinputId},
                            {farmId : oldFarmId}
                        ] },
                    { $set: {
                            contractorRateId: newDownloadId,
                            purchaseOrderId:newinputId,
                            packingSize: data1[0].downloadSize ,
                            rate : data1[0].downloadRate,
                            farmId:data1[0].FarmId,
                            process:'Purchase',
                            amount :  data1[0].downloadRate * newDownloaderBags,

                        } },
                ).then(function (updateDate) {
                    var data={message:"success",data:updateDate};

                }).catch(function (err) {
                    var data={message:"error",data:err.message}
                });

                purchaseExpenses.updateOne(
                    {process:data1[0].process ,purchaseOrderId : purchaseId  , contractorRateId : oldUploadId,processId : newinputId,farmId : oldFarmId},
                    { $set: {
                            contractorRateId: newUploadId,
                            purchaseOrderId:newinputId,
                            packingSize:data1[0].uploadSize,
                            rate : data1[0].uploadRate,
                            farmId:data1[0].FarmId,
                            process:'Purchase',
                            amount : data1[0].uploadRate * newUploaderBags,
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
    updatePayment:function (body,callback) {
        purchaseOrder.updateOne(
            { "_id" : body.id },
            { $set: {
                paidAmount:body.paidAmount,
                status:body.status
            } },
        ).then(function (updateDate) {
            var data={message:"success",data:updateDate}
            callback(data)
        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);
        });

    },

    deletePurchaseOrder:function (id,callback) {
        purchaseOrder.updateOne(
            { "_id" : id },
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
module.exports=purchaseOrderDal;