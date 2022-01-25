var saleStore=require("../models/saleStore");
var mongoose=require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
var saleStoreDal={
    getAllSaleStore:function (callback) {
        saleStore.find({isActive:true}).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    },
    getSaleStoreById:function (id,callback) {
        saleStore.find({_id : id,isActive:true}).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    },

    addSaleStore:function (body,callback){
        var saleStoreObj = new saleStore({
            direction:body.direction,
            category:body.category,
            name:body.name
        });
        saleStoreObj.save().then(function (savedData) {
            var data={message:"success",data:savedData}
            callback(data)
        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);

        })
    }
    ,
    updateSaleStore:function (body,callback){
        saleStore.updateOne(
            {"_id":body.id},
            {
                $set: {
                    direction:body.direction,
                    category:body.category,
                    name:body.name
                }
            },
        ).then(function (updateData) {
            var data={message:"success",data:updateData}
            callback(data)
        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);
        });
    }
    ,
    deleteSaleStore:function (id,callback) {
        saleStore.updateOne(
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
    }
}

module.exports=saleStoreDal;