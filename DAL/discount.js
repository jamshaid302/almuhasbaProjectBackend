var discount=require("../models/discount");
var mongoose=require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
var discountDal={
    getAllDiscountList:function (callback) {
        discount.find({isActive:true}).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    },
    getDiscountById:function (id,callback) {
        discount.find({_id : id,isActive:true}).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    },

    addDiscount:function (body,callback){
        var discountObj = new discount({
            name:body.name,
            amount:body.amount,

        });
        discountObj.save().then(function (savedData) {
            var data={message:"success",data:savedData}
            callback(data)
        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);

        })
    },
    updateDiscount:function (body,callback){
        discount.updateOne(
            {"_id":body.id},
            {
                $set: {
                    name:body.name,
                    amount:body.amount,
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
    deleteDiscount:function (id,callback) {
        discount.updateOne(
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

module.exports=discountDal;