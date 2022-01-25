var invoice=require("../models/invoice");
var purchaseOrder=require("../models/purchaseOrder");
var mongoose=require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
var db=require("../utility/conn");
var invoiceDal={
    getAllInvoice:function (callback) {
        invoice.find({isActive:true}).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err}
            callback(arr);
        })
    },
    getInvoiceById:function (id,callback) {
        invoice.find({_id : id,isActive:true}).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err}
            callback(arr);
        })
    },
    createInvoiceById:function (id,callback) {
        purchaseOrder.aggregate([
            { $match: {
            _id:ObjectId(id)
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
            {
                $graphLookup: {
                    from: "stores",
                    startWith: "$storeId",
                    connectFromField: "storeId",
                    connectToField: "_id",
                    maxDepth: 1,
                    as: "store"
                }
            },
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
                    from: "contractors",
                    localField: "currentuploader.contractorId",
                    foreignField: "_id",
                    as: "uploader"
                }
            },
            { $unwind : { path: "$uploader", preserveNullAndEmptyArrays: true } },

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
                    from: "contractors",
                    localField: "currentdownloader.contractorId",
                    foreignField: "_id",
                    as: "downloader"
                }
            },
            { $unwind : { path: "$downloader", preserveNullAndEmptyArrays: true } },



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
                    from: "contractors",
                    localField: "currentcarriage.contractorId",
                    foreignField: "_id",
                    as: "carriage"
                }
            },
            { $unwind : { path: "$carriage", preserveNullAndEmptyArrays: true } },
        ]).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err}
            callback(arr);
        })
    },
    getInvoiceByOrderId:function (id,callback) {
        invoice.find({purchaseOrderId : id,isActive:true}).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err}
            callback(arr);
        })
    },
    addInvoice:function (body,callback) {
        var inv=new invoice({
            purchaseOrderId:body.purchaseOrderId,
            amount:body.amount,
            date:body.date==""?new Date():body.date,
        });
        inv.save().then(function (savedData) {
            var data={message:"success",data:savedData}
            callback(data)

        }).catch(function (err) {
            var data={message:"error",data:err}
            callback(data);

        })
    },
    updateInvoice:function (body,callback) {
        invoice.update({_id:body.id},{
            purchaseOrderId:body.purchaseOrderId,
            amount:body.amount,
        }).then(function (updateDate) {
            var data={message:"success",data:updateDate}
            callback(data)
        }).catch(function (err) {
            var data={message:"error",data:err}
            callback(data);
        })
    },
    deleteInvoice:function (id,callback) {
        invoice.update({_id:id},{
            isActive:false
        }).then(function (updateDate) {
            var data={message:"success",data:updateDate}
            callback(data)
        }).catch(function (err) {
            var data={message:"error",data:err}
            callback(data);
        })
    }
}
module.exports=invoiceDal;