var packingSize=require("../models/packingSize");
var mongoose=require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
var packingSizeDal={
    getAllPackingSize:function (callback) {
        packingSize.find({isActive:true}).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    },
    getPackingSizeById:function (id,callback) {
        packingSize.find({_id : id,isActive:true}).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    },

    addPackingSize:function (body,callback){
        var packingSizeObj = new packingSize({
            size:body.size,
            unit:body.unit
        });
        packingSizeObj.save().then(function (savedData) {
            var data={message:"success",data:savedData}
            callback(data)
        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);

        })
    }
    ,
    updatePackingSize:function (body,callback){
        packingSize.updateOne(
            {"_id":body.id},
            { $set: {
                size:body.size,
                unit:body.unit
                }},
        ).then(function (updateData) {
            var data={message:"success",data:updateData}
            callback(data)
        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);
        });
    }
    ,
    deletePackingSize:function (id,callback) {
        packingSize.updateOne(
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

module.exports=packingSizeDal;