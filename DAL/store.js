var store=require("../models/store");
var warehouse=require("../models/warehouse");
var db=require("../utility/conn");
var mongoose=require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
var storeDal={
    getStoreChatha:function (callback) {
        store.aggregate([
            { $match: {
                storeId: null,isActive:true
            }},
            {
                $graphLookup: {
                    from: "stores",
                    startWith: "$_id",
                    connectFromField: "_id",
                    connectToField: "storeId",
                    maxDepth: 0,
                    as: "chatha",
                    restrictSearchWithMatch: { "isActive" : true }
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

    getDetailStore:function (id,callback) {
        store.aggregate([
            { $match: {
                isActive:true,warehouseId:ObjectId(id)
            }},
            {
                $graphLookup: {
                    from: "stores",
                    startWith: "$_id",
                    connectFromField: "_id",
                    connectToField: "storeId",
                    maxDepth: 0,
                    as: "chatha",
                    restrictSearchWithMatch: { "isActive" : true }
                }
            },
            { $unwind : { path: "$chatha", preserveNullAndEmptyArrays: true } },
            { $lookup: {
                from: 'warehouses',
                localField: 'warehouseId',
                foreignField: '_id',
                as: 'warehouseData'
            }},
            { $unwind : { path: "$warehouseData", preserveNullAndEmptyArrays: true } },
            { $match: {
                "warehouseData.isActive": true,
            }}
        ]).then(function (data) {
            // var saveName = data[0].name;

            var arr={message:"success",data:data};
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err};
            callback(arr);
        })
    },

    getAllStore:function (callback) {
        store.find({isActive:true,storeId: { $exists: false}}).then(function (data) {
            var arr={message:"success",data:data};
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err};
            callback(arr);
        })
    },
    getStoreById:function (id,callback) {
        store.find({_id : id,isActive:true}).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err}
            callback(arr);
        })
    },
    addStore:function (body,callback) {
        var sto=new store({
            name:body.name,
            direction:body.direction,
            isOccupy:body.isOccupy,
            storeId:body.storeId,
            warehouseId:body.warehouseId
        });
        sto.save().then(function (savedData) {
            var data={message:"success",data:savedData}
            callback(data);
        }).catch(function (err) {
            var data={message:"error",data:err}
            callback(data);

        })
    },
    updateStore:function (body,callback) {
        var obj={};
        if(body.storeId == null || body.storeId == undefined || body.storeId == ""){
            obj={
                name:body.name,
                direction:body.direction,
                warehouseId:body.warehouseId,
                isOccupy:body.isOccupy=="1"?true:false
            }
        }else if(body.warehouseId == null || body.warehouseId == undefined || body.warehouseId == ""){
            obj={
                name:body.name,
                direction:body.direction,
                //warehouseId:body.warehouseId,
                storeId:body.storeId,
                isOccupy:body.isOccupy=="1"?true:false
            }
        }
        store.updateOne(
            { "_id" : body.id },
            { $set: obj },
            {runValidators: true}
        ).then(function (updateDate) {
            var data={message:"success",data:updateDate}
            callback(data)
        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);
        });
    },
    deleteStore:function (id,callback) {
        // store.updateMany(
        //     {$or:[{ "_id" : id },{'storeId':id}]},
        //     { $set: {
        //         isActive:false
        //     } },
        // ).then(function (updateDate) {
        //     var data={message:"success",data:updateDate};
        //     callback(data);
        // }).catch(function (err) {
        //     var data={message:"error",data:err.message}
        //     callback(data);
        // });

        store.updateMany(

            { "_id" : ObjectId(id) },
            { $set: {
                    isActive:false
                } },
        ).then(function (updateDate) {
            // var data={message:"success",data:updateDate};
            // callback(data);

            store.updateMany(
                {'storeId':id},
                { $set: {
                        isActive:false
                    } },
            ).then(function (updateDate) {
                var data={message:"success",data:updateDate};
                callback(data);
            }).catch(function (err) {
                var data={message:"error",data:err.message}
                callback(data);
            });

        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);
        });

    }
}
module.exports=storeDal;