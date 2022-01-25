var wheatPurity=require("../models/wheatPurity");
var purchaseOrder=require("../models/purchaseOrder");
var db=require("../utility/conn");
var moment=require("moment");
const mongoose = require("mongoose");
const cottonBudTest = require("../models/cottonBudTest");
const ObjectId = mongoose.Types.ObjectId;
var wheatPurityDal={
    getAllWheatPurity:function (body,callback) {
        //var col=body.order[0].column=="0"?"_id":col=body.order[0].column=="4"?"fixationStatus":body.order[0].column=="5"?"paidAmount":"_id";
        wheatPurity.dataTables({
            find: { isActive: true},
            limit: body.length,
            skip: body.start,
            populate:
                [ { path: 'purchaseOrderId'}],

            search: {
                value: body.search.value,
                fields: ['invoiceIdManual']

            },

            formatter: function(user) {
                return {
                    DbId:user._doc._id,
                    pid:user._doc.purchaseOrderId._doc._id,
                    Invoice:user._doc.purchaseOrderId._doc.invoiceIdManual,
                    GrainWeight:user._doc.grainWeight,
                    Purity:user._doc.purity,
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
    getWheatPurityById:function (id,callback) {
        wheatPurity.find({_id : id,isActive:true}).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    },

    getWheatPurityByUserSearch:function (body,callback) {
        var savexx = body;
        var supId = '';
        supId = body.supplier;

        if(body.supplier != 'all'){
            supId = ObjectId(supId) ;

            ///   === ///
            purchaseOrder.aggregate([
                {
                    $match: {
                        supplierId :supId,
                    }
                },
                {
                    $lookup:{
                        from:"wheatpurities",
                        let:{pOdrId:"$_id"},
                        pipeline:[{$match: { $expr: { $eq: ["$purchaseOrderId", "$$pOdrId"]  } ,   } ,    },

                            {
                                $lookup:{
                                    from:"purchaseorders",
                                    let:{pOdrId:"$purchaseOrderId"},
                                    pipeline:[{$match: { $expr: { $eq: ["$_id", "$$pOdrId"]  } ,   } ,    },
                                        {
                                            $lookup:{
                                                from:"categories",
                                                let:{catId:"$categoryId"},
                                                pipeline:[{$match: { $expr: { $eq: ["$_id", "$$catId"] }}},
                                                ],
                                                as:"asCategories",
                                            }
                                        },
                                        { $unwind : { path: "$asCategories", preserveNullAndEmptyArrays: true } },

                                        {
                                            $lookup:{
                                                from:"suppliers",
                                                let:{supId:"$supplierId"},
                                                pipeline:[{$match: { $expr: { $eq: ["$_id", "$$supId"]}}},
                                                ],
                                                as:"asSuppliers",
                                            }
                                        },
                                        { $unwind : { path: "$asSuppliers", preserveNullAndEmptyArrays: true } },
                                    ],
                                    as:"AsPurchaseOrder",
                                },
                            },
                            { $unwind : { path: "$AsPurchaseOrder", preserveNullAndEmptyArrays: true } },
                        ],
                        as:"AsWheatPurities",
                    },
                },
                { $unwind : { path: "$AsWheatPurities", preserveNullAndEmptyArrays: true } },
                // {
                //     $group: {
                //         _id: "$llcId",
                //         grouptotal: {$sum: "$AsWheatPurities.AsPurchaseOrder.supplierAmount"},
                //     }
                //
                // },
                {
                    $project : {
                        // supplierAmount: 1,
                        supplierAmounts : "$AsWheatPurities.AsPurchaseOrder.supplierAmount",
                        wheatDate : "$AsWheatPurities.date",
                        category : "$AsWheatPurities.AsPurchaseOrder.asCategories.name",
                        // purity: 1,
                        beforepurity : "$AsWheatPurities.AsPurchaseOrder.purity",
                        afterPurity : "$AsWheatPurities.purity",
                        supplierName: {
                            $concat: [ "$AsWheatPurities.AsPurchaseOrder.asSuppliers.firstName", " - ", "$AsWheatPurities.AsPurchaseOrder.asSuppliers.lastName" ]
                        },
                        totalAmount: { $sum: "$AsWheatPurities.AsPurchaseOrder.supplierAmount" },
                        // grouptotal : 1,
                    }
                }
            ]).then(function (reportData) {

                let filterWheat = reportData.filter(function(number) {
                    return number.wheatDate != null && number.wheatDate != '' && number.afterPurity != null && number.afterPurity != ''
                });

                console.log(filterWheat);

                var data={message:"success",data:filterWheat}
                callback(data)
            }).catch(function (err) {
                var data={message:"error",data:err.message}
                callback(data);
            });
            ///   === ///

        }else{

            ///   === ///
            purchaseOrder.aggregate([

                {
                    $lookup:{
                        from:"wheatpurities",
                        let:{pOdrId:"$_id"},
                        pipeline:[{$match: { $expr: { $eq: ["$purchaseOrderId", "$$pOdrId"]  } ,   } ,    },

                            {
                                $lookup:{
                                    from:"purchaseorders",
                                    let:{pOdrId:"$purchaseOrderId"},
                                    pipeline:[{$match: { $expr: { $eq: ["$_id", "$$pOdrId"]  } ,   } ,    },
                                        {
                                            $lookup:{
                                                from:"categories",
                                                let:{catId:"$categoryId"},
                                                pipeline:[{$match: { $expr: { $eq: ["$_id", "$$catId"] }}},
                                                ],
                                                as:"asCategories",
                                            }
                                        },
                                        { $unwind : { path: "$asCategories", preserveNullAndEmptyArrays: true } },

                                        {
                                            $lookup:{
                                                from:"suppliers",
                                                let:{supId:"$supplierId"},
                                                pipeline:[{$match: { $expr: { $eq: ["$_id", "$$supId"]}}},
                                                ],
                                                as:"asSuppliers",
                                            }
                                        },
                                        { $unwind : { path: "$asSuppliers", preserveNullAndEmptyArrays: true } },
                                    ],
                                    as:"AsPurchaseOrder",
                                },
                            },
                            { $unwind : { path: "$AsPurchaseOrder", preserveNullAndEmptyArrays: true } },
                        ],
                        as:"AsWheatPurities",
                    },
                },
                { $unwind : { path: "$AsWheatPurities", preserveNullAndEmptyArrays: true } },
                // {
                //     $group: {
                //         _id: "$llcId",
                //         grouptotal: {$sum: "$AsWheatPurities.AsPurchaseOrder.supplierAmount"},
                //     }
                //
                // },
                {
                    $project : {
                        // supplierAmount: 1,
                        supplierAmounts : "$AsWheatPurities.AsPurchaseOrder.supplierAmount",
                        wheatDate : "$AsWheatPurities.date",
                        category : "$AsWheatPurities.AsPurchaseOrder.asCategories.name",
                        // purity: 1,
                        beforepurity : "$AsWheatPurities.AsPurchaseOrder.purity",
                        afterPurity : "$AsWheatPurities.purity",
                        supplierName: {
                            $concat: [ "$AsWheatPurities.AsPurchaseOrder.asSuppliers.firstName", " - ", "$AsWheatPurities.AsPurchaseOrder.asSuppliers.lastName" ]
                        },
                        // grouptotal : 1
                    }
                }
            ]).then(function (reportData) {

                let filterWheat = reportData.filter(function(number) {
                    return number.wheatDate != null && number.wheatDate != '' && number.afterPurity != null && number.afterPurity != ''
                });

                console.log(filterWheat);

                var data={message:"success",data:filterWheat}
                callback(data)
            }).catch(function (err) {
                var data={message:"error",data:err.message}
                callback(data);
            });
            ///   === ///

        }

    },

    addWheatPurity:function (body,callback) {
        var purity=new wheatPurity({
            purchaseOrderId:body.purchaseOrderId,
            grainWeight:body.grainWeight,
            purity:body.purity,
            date:body.date,
        });
        purity.save().then(function (savedData) {
            var data={message:"success",data:savedData}
            callback(data)

        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);

        })
    },
    updateWheatPurity:function (body,callback) {
        wheatPurity.updateOne(
            { "_id" : body.id },
            { $set: {
                purchaseOrderId:body.purchaseOrderId,
                grainWeight:body.grainWeight,
                purity:body.purity,
                date:body.date,
            } },
            {runValidators: true}
        ).then(function (updateDate) {
            var data={message:"success",data:updateDate}
            callback(data)
        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);
        });
    },
    deleteWheatPurity:function (id,callback) {
        wheatPurity.updateOne(
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
    }
}
module.exports=wheatPurityDal;