var warehouse=require("../models/warehouse");
var store = require('../models/store')
var db=require("../utility/conn");
var warehouseDal={

    getStoreWarehouse:function (callback) {
        warehouse.aggregate([
            {
                $match:{
                    "isActive": true,
                }
            },
            {
                $lookup:{
                    from:"stores",
                    localField:"_id",
                    foreignField:"warehouseId",
                    as:"storeList"
                }
            },
            { $unwind : { path: "$storeList", preserveNullAndEmptyArrays: true } },
            {
                $match:{
                    "storeList.isActive": true
                }
            },



        ]).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    },
    getAllWarehouse:function (callback) {
        warehouse.find({isActive:true}).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    },
    getWarehouseById:function (id,callback) {
        warehouse.find({_id : id,isActive:true}).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    },

    addWarehouse:function (body,callback) {
        var war=new warehouse({
            name:body.name,
            address:body.address,
        });
        war.save().then(function (savedData) {
            var data={message:"success",data:savedData}
            callback(data)

        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);

        })
    },
    updateWarehouse:function (body,callback) {
        warehouse.updateOne(
            { "_id" : body.id },
            { $set: {
                name:body.name,
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
    deleteWarehouse:function (id,callback) {
        warehouse.updateOne(
            { "_id" : id },
            { $set: {
                isActive:false
            } },

        ).then(function (updateDate) {

            store.updateMany(

                { "warehouseId" : ObjectId(id) },
                { $set: {
                        isActive:false
                    } },
            ).then(function (updateDate) {
                var data={message:"success",data:updateDate};
                callback(data);

                // store.updateMany(
                //     {'storeId':id},
                //     { $set: {
                //             isActive:false
                //         } },
                // ).then(function (updateDate) {
                //     var data={message:"success",data:updateDate};
                //     callback(data);
                // }).catch(function (err) {
                //     var data={message:"error",data:err.message}
                //     callback(data);
                // });

            }).catch(function (err) {
                var data={message:"error",data:err.message}
                callback(data);
            });
            // ==== ==== ==== ====

            // var data={message:"success",data:updateDate}
            // callback(data)
        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);
        });

    }
}
module.exports=warehouseDal;