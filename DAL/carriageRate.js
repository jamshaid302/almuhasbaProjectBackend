var carriageRate=require("../models/carriageRate");
var db=require("../utility/conn");
var carriageRateDal={
    addCarriageRate:function (body,callback) {
        var car=new carriageRate({
            farmAddress:body.farmAddress,
            rate:parseFloat(body.rate),
        });
        car.save().then(function (savedData) {
            carriageRate.updateOne(
                { "_id" : body.carriageId },
                { $set: { "isActive" : false } }
            ).then(function (updateDate) {
                var data={message:"success",data:updateDate}
                callback(data)
            }).catch(function (err1) {
                var data={message:"error",data:err1.message}
                callback(data);
            })

        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);

        })
    }
}
module.exports=carriageRateDal;