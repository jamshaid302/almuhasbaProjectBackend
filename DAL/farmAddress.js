var farmAddress=require("../models/farmAddress");
var carriageRate=require("../models/carriageRate");
var db=require("../utility/conn");
const contractor = require("../models/contractor");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
var farmAddressDal={
    getFarmGroup:function (callback) {
        farmAddress.aggregate([
            {
                $lookup:{
                    from:"carriagerates",
                    localField:"_id",
                    foreignField:"farmAddress",
                    as:"carriageRateList"
                }
            },
            { $unwind : { path: "$carriageRateList", preserveNullAndEmptyArrays: true } },
            {
                $match:{
                    "carriageRateList.isActive": true
                }
            },
            {
                $group:
                    {
                        _id : "$tehsil",
                        cityList: { $push : "$$ROOT" }
                    }
            }


        ]).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err}
            callback(arr);
        })
    },

    getFarmsExpensesByUserSearch:function (body,callback) {
        // var supId = '';
        // if(body.supplier !== ''){
        //     supId = ObjectId(body.supplier);
        // }else{
        //     supId = "$$supId";
        // }
        var d = body;
        if(body.farmId != 'all'){
            farmAddress.aggregate([
                {
                    $match: {"_id":ObjectId(body.farmId),
                        //date:{$gte:new Date(body.startDate),$lt:new Date(body.endDate)}
                    }
                },
                {
                    $lookup:{
                        from:"carriagerates",
                        let:{farmId:"$_id"},
                        // pipeline:[{$match: { $expr: { $eq: ["$farmAddress", "$$farmId"] }}},
                        pipeline:[{$match: { $expr: { $eq: ["$farmAddress", "$$farmId"] } },  },
                            {
                                $lookup:{
                                    from:"purchaseorders",
                                    let:{carRateId:"$_id"},
                                    pipeline:[
                                        {$match: { $expr: { $eq: ["$carriageRateId", "$$carRateId"] }  , purchaseDate:{$gte:new Date(body.startDate),$lt:new Date(body.endDate)} },},
                                        {
                                            $lookup:{
                                                from:"categories",
                                                let:{pCatId:"$categoryId"},
                                                pipeline:[{$match: { $expr: { $eq: ["$_id", "$$pCatId"] }  },}, ],
                                                as:"asCategory",
                                            }
                                        },
                                        { $unwind : { path: "$asCategory", preserveNullAndEmptyArrays: true } },
                                        {
                                            $lookup:{
                                                from:"suppliers",
                                                let:{pSupId:"$supplierId"},
                                                pipeline:[{$match: { $expr: { $eq: ["$_id", "$$pSupId"] }   },}, ],
                                                as:"asSupplier",
                                            }
                                        },
                                        { $unwind : { path: "$asSupplier", preserveNullAndEmptyArrays: true } },
                                    ],
                                    as:"asPurchaseOrder",
                                }
                            },
                            { $unwind : { path: "$asPurchaseOrder", preserveNullAndEmptyArrays: true } },
                        ],
                        as:"asCarriageRate",
                    },
                },
                { $unwind : { path: "$asCarriageRate", preserveNullAndEmptyArrays: true } },
                {
                    $project:{
                        PO_date: { $dateToString: { format: "%d-%m-%Y", date: "$asCarriageRate.asPurchaseOrder.purchaseDate" } },
                        PO_dates2: "$asCarriageRate.asPurchaseOrder.purchaseDate"  ,
                        PO_driver : "$asCarriageRate.asPurchaseOrder.driverName",
                        subcategory:'$asCarriageRate.asPurchaseOrder.asCategory.name',
                        PO_Id:'$asCarriageRate.asPurchaseOrder._id',
                        PO_supplierAmount:'$asCarriageRate.asPurchaseOrder.supplierAmount',
                        supplierName: {
                            $concat: [ "$asCarriageRate.asPurchaseOrder.asSupplier.firstName", " - ", "$asCarriageRate.asPurchaseOrder.asSupplier.lastName" ]
                        },

                        carriageRate:'$asCarriageRate.rate',
                        tehsil:1,
                        district:1,
                        address:1,
                    }
                }
            ]).then(function (reportData) {
                var data={message:"success",data:reportData}
                callback(data)
            }).catch(function (err) {
                var data={message:"error",data:err.message}
                callback(data);
            });

        }else{

            farmAddress.aggregate([

                {
                    $lookup:{
                        from:"carriagerates",
                        let:{farmId:"$_id"},
                        pipeline:[{$match: { $expr: { $eq: ["$farmAddress", "$$farmId"] } },  },

                            {
                                $lookup:{
                                    from:"purchaseorders",
                                    let:{carRateId:"$_id"},
                                    pipeline:[
                                        {$match: { $expr: { $eq: ["$carriageRateId", "$$carRateId"] }  , purchaseDate:{$gte:new Date(body.startDate),$lt:new Date(body.endDate)} },},
                                        {
                                            $lookup:{
                                                from:"categories",
                                                let:{pCatId:"$categoryId"},
                                                pipeline:[{$match: { $expr: { $eq: ["$_id", "$$pCatId"] }  },}, ],
                                                as:"asCategory",
                                            }
                                        },
                                        { $unwind : { path: "$asCategory", preserveNullAndEmptyArrays: true } },
                                        {
                                            $lookup:{
                                                from:"suppliers",
                                                let:{pSupId:"$supplierId"},
                                                pipeline:[{$match: { $expr: { $eq: ["$_id", "$$pSupId"] }   },}, ],
                                                as:"asSupplier",
                                            }
                                        },
                                        { $unwind : { path: "$asSupplier", preserveNullAndEmptyArrays: true } },
                                    ],
                                    as:"asPurchaseOrder",
                                }
                            },
                            { $unwind : { path: "$asPurchaseOrder", preserveNullAndEmptyArrays: true } },
                        ],
                        as:"asCarriageRate",
                    },
                },
                { $unwind : { path: "$asCarriageRate", preserveNullAndEmptyArrays: true } },
                {
                    $project:{
                        PO_date: { $dateToString: { format: "%d-%m-%Y", date: "$asCarriageRate.asPurchaseOrder.purchaseDate" } },
                        PO_driver : "$asCarriageRate.asPurchaseOrder.driverName",
                        subcategory:'$asCarriageRate.asPurchaseOrder.asCategory.name',
                        PO_Id:'$asCarriageRate.asPurchaseOrder._id',
                        PO_supplierAmount:'$asCarriageRate.asPurchaseOrder.supplierAmount',
                        supplierName: {
                            $concat: [ "$asCarriageRate.asPurchaseOrder.asSupplier.firstName", " - ", "$asCarriageRate.asPurchaseOrder.asSupplier.lastName" ]
                        },
                        carriageRate:'$asCarriageRate.rate',
                        tehsil:1,
                        district:1,
                        address:1,
                        supplierName: {
                            $concat: [ "$asCarriageRate.asPurchaseOrder.asSupplier.firstName", " - ", "$asCarriageRate.asPurchaseOrder.asSupplier.lastName" ]
                        },

                    }
                }
            ]).then(function (reportData) {
                var data={message:"success",data:reportData}
                callback(data)
            }).catch(function (err) {
                var data={message:"error",data:err.message}
                callback(data);
            });
        }
    },

    getAllFarmAddress:function (callback) {
        farmAddress.aggregate([
            {
                $lookup:{
                    from:"carriagerates",
                    localField:"_id",
                    foreignField:"farmAddress",
                    as:"carriageRateList"
                }
            },
            { $unwind : { path: "$carriageRateList", preserveNullAndEmptyArrays: true } },
            {
                $match:{
                    "carriageRateList.isActive": true
                }
            }
        ]).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err}
            callback(arr);
        })
    },
    getFarmAddressById:function (id,callback) {
        farmAddress.find({_id : id,isActive:true}).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err}
            callback(arr);
        })
    },
    addFarmAddress:function (body,callback) {
        var far=new farmAddress({
            tehsil:body.tehsil,
            district:body.district,
            address:body.address,
        });
        far.save().then(function (savedData) {
            var car=new carriageRate({
                farmAddress:savedData._doc._id,
                rate:body.rate,
            });
            car.save().then(function (savedData1) {
                var data={message:"success",data:savedData1}
                callback(data)

            }).catch(function (err1) {
                var data={message:"error",data:err1.message}
                callback(data);

            })

        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);

        })
    },
    updateFarmAddress:function (body,callback) {
        farmAddress.updateOne(
            { "_id" :body.id },
            { $set: {
                tehsil:body.tehsil,
                district:body.district,
                address:body.address,
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
    deleteFarmAddress:function (id,callback) {
        farmAddress.updateOne(
            { "_id" : id },
            { $set: { "isActive" : false } }
        ).then(function (updateDate) {
            carriageRate.bulkWrite([
                { updateMany : {
                    "filter" : { "farmAddress" : id },
                    "update" : { $set : { "isActive" : false } }
                } },
            ]).then(function (data1) {
                var data={message:"success",data:data1}
                callback(data)
            }).catch(function (err1) {
                var data={message:"error",data:err1.message}
                callback(data);
            })

        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);
        });

    }
}
module.exports=farmAddressDal;