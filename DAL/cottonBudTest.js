var cottonBudTest=require("../models/cottonBudTest");
var db=require("../utility/conn");
var moment=require("moment")
const productionOutput = require("../models/productionOutput");
const mongoose = require("mongoose");
const purchaseOrder = require("../models/purchaseOrder");
const ObjectId = mongoose.Types.ObjectId;
var cottonBudTestDal={
    getAllCottonBudTest:function (body,callback) {
        //var col=body.order[0].column=="0"?"_id":col=body.order[0].column=="4"?"fixationStatus":body.order[0].column=="5"?"paidAmount":"_id";
        cottonBudTest.dataTables({
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
                    fieldGermination:user._doc.fieldGermination,
                    beforeGinning:user._doc.beforeGinning,
                    afterGinning:user._doc.afterGinning,
                    resample1:user._doc.resample1,
                    resample2:user._doc.resample2?user._doc.resample2:"",
                    resample3:user._doc.resample3?user._doc.resample3:"",
                    beforeDry:user._doc.beforeDry,
                    afterDry:user._doc.afterDry,
                    beforePack:user._doc.beforePack,
                    afterPack:user._doc.afterPack,
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
    getCottonBudTestById:function (id,callback) {
        cottonBudTest.find({_id : id,isActive:true}).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    },

    getCottonBudTestByUserSearch:function (body,callback) {
        var b = body;
        var supId = '';

        if(body.supplier != 'all') {
            supId = ObjectId(body.supplier);

            purchaseOrder.aggregate([
                {
                    $match: {
                        supplierId :supId,
                    }
                },
                {
                    $lookup: {
                        from: "cottonbudtests",
                        let: {pOdrId: "$_id"},
                        pipeline: [{$match: {$expr: {$eq: ["$purchaseOrderId", "$$pOdrId"]},},},
                            {
                                $lookup: {
                                    from: "purchaseorders",
                                    let: {pOdrId: "$purchaseOrderId"},
                                    pipeline: [{$match: {$expr: {$eq: ["$_id", "$$pOdrId"]}}},
                                        {
                                            $lookup: {
                                                from: "categories",
                                                let: {catId: "$categoryId"},
                                                pipeline: [{$match: {$expr: {$eq: ["$_id", "$$catId"]}}},
                                                ],
                                                as: "asCategories",
                                            }
                                        },
                                        {$unwind: {path: "$asCategories", preserveNullAndEmptyArrays: true}},
                                        {
                                            $lookup: {
                                                from: "suppliers",
                                                let: {supId: "$supplierId"},
                                                pipeline: [{$match: {$expr: {$eq: ["$_id", "$$supId"]}}},
                                                ],
                                                as: "asSuppliers",
                                            }
                                        },
                                        {$unwind: {path: "$asSuppliers", preserveNullAndEmptyArrays: true}},
                                    ],
                                    as: "AsPurchaseOrder",
                                },
                            },
                            {$unwind: {path: "$AsPurchaseOrder", preserveNullAndEmptyArrays: true}},
                        ],
                        as: "asCottonBudTests",
                    }
                },
                {$unwind: {path: "$asCottonBudTests", preserveNullAndEmptyArrays: true}},
                {
                    $project : {
                        supplierAmounts : "$asCottonBudTests.AsPurchaseOrder.supplierAmount",
                        supplierName: {
                            $concat: [ "$asCottonBudTests.AsPurchaseOrder.asSuppliers.firstName", " - ", "$asCottonBudTests.AsPurchaseOrder.asSuppliers.lastName" ]
                        },
                        category : "$asCottonBudTests.AsPurchaseOrder.asCategories.name",
                        cottonDate : "$asCottonBudTests.date",
                        fieldGermination : "$asCottonBudTests.fieldGermination",
                        beforeGinning : "$asCottonBudTests.beforeGinning",
                        afterGinning : "$asCottonBudTests.afterGinning",
                        beforeDry : "$asCottonBudTests.beforeDry",
                        afterDry : "$asCottonBudTests.afterDry",
                        beforePack : "$asCottonBudTests.beforePack",
                        afterPack : "$asCottonBudTests.afterPack",
                    }
                }
            ]).then(function (data) {

                let filterCotton = data.filter(function(number) {
                    return number.supplierName != null && number.supplierName != '' && number.beforeDry != null && number.beforeDry != ''
                });

                console.log(filterCotton);

                var arr = {message: "success", data: filterCotton}
                callback(arr);
            }).catch(function (err) {
                var arr = {message: "error", data: err.message}
                callback(arr);
            })

        }
        else{

            purchaseOrder.aggregate([

                {
                    $lookup: {
                        from: "cottonbudtests",
                        let: {pOdrId: "$_id"},
                        pipeline: [{$match: {$expr: {$eq: ["$purchaseOrderId", "$$pOdrId"]},},},
                            {
                                $lookup: {
                                    from: "purchaseorders",
                                    let: {pOdrId: "$purchaseOrderId"},
                                    pipeline: [{$match: {$expr: {$eq: ["$_id", "$$pOdrId"]}}},
                                        {
                                            $lookup: {
                                                from: "categories",
                                                let: {catId: "$categoryId"},
                                                pipeline: [{$match: {$expr: {$eq: ["$_id", "$$catId"]}}},
                                                ],
                                                as: "asCategories",
                                            }
                                        },
                                        {$unwind: {path: "$asCategories", preserveNullAndEmptyArrays: true}},
                                        {
                                            $lookup: {
                                                from: "suppliers",
                                                let: {supId: "$supplierId"},
                                                pipeline: [{$match: {$expr: {$eq: ["$_id", "$$supId"]}}},
                                                ],
                                                as: "asSuppliers",
                                            }
                                        },
                                        {$unwind: {path: "$asSuppliers", preserveNullAndEmptyArrays: true}},
                                    ],
                                    as: "AsPurchaseOrder",
                                },
                            },
                            {$unwind: {path: "$AsPurchaseOrder", preserveNullAndEmptyArrays: true}},
                        ],
                        as: "asCottonBudTests",
                    }
                },
                {$unwind: {path: "$asCottonBudTests", preserveNullAndEmptyArrays: true}},
                {
                    $project : {
                        supplierAmounts : "$asCottonBudTests.AsPurchaseOrder.supplierAmount",
                        supplierName: {
                            $concat: [ "$asCottonBudTests.AsPurchaseOrder.asSuppliers.firstName", " - ", "$asCottonBudTests.AsPurchaseOrder.asSuppliers.lastName" ]
                        },
                        category : "$asCottonBudTests.AsPurchaseOrder.asCategories.name",
                        cottonDate : "$asCottonBudTests.date",
                        fieldGermination : "$asCottonBudTests.fieldGermination",
                        beforeGinning : "$asCottonBudTests.beforeGinning",
                        afterGinning : "$asCottonBudTests.afterGinning",
                        beforeDry : "$asCottonBudTests.beforeDry",
                        afterDry : "$asCottonBudTests.afterDry",
                        beforePack : "$asCottonBudTests.beforePack",
                        afterPack : "$asCottonBudTests.afterPack",
                    }
                }
            ]).then(function (data) {

                let filterCotton = data.filter(function(number) {
                    return number.supplierName != null && number.supplierName != '' && number.beforeDry != null && number.beforeDry != ''
                });

                console.log(filterCotton);

                var arr = {message: "success", data: filterCotton}
                callback(arr);
            }).catch(function (err) {
                var arr = {message: "error", data: err.message}
                callback(arr);
            })

        }

    },

    addCottonBudTest:function (body,callback) {
        var cot=new cottonBudTest({
            purchaseOrderId:body.purchaseOrderId,
            fieldGermination:body.fieldGermination,
            beforeGinning:body.beforeGinning,
            afterGinning:body.afterGinning,
            resample1:body.resample1,
            resample2:body.resample2,
            resample3:body.resample3,
            beforeDry:body.beforeDry,
            afterDry:body.afterDry,
            beforePack:body.beforePack,
            afterPack:body.afterPack,
            date:body.date,
        });
        cot.save().then(function (savedData) {
            var data={message:"success",data:savedData}
            callback(data)

        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);

        })
    },
    updateCottonBudTest:function (body,callback) {
        cottonBudTest.updateOne(
            { "_id" : body.id },
            { $set: {
                purchaseOrderId:body.purchaseOrderId,
                fieldGermination:body.fieldGermination,
                beforeGinning:body.beforeGinning,
                afterGinning:body.afterGinning,
                resample1:body.resample1,
                resample2:body.resample2,
                resample3:body.resample3,
                beforeDry:body.beforeDry,
                afterDry:body.afterDry,
                beforePack:body.beforePack,
                afterPack:body.afterPack,
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
    deleteCottonBudTest:function (id,callback) {
        cottonBudTest.updateOne(
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
module.exports=cottonBudTestDal;