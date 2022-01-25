var premium=require("../models/premium");
var db=require("../utility/conn");
var premiumDal={

    getAllPremium:function (callback) {
        premium.find({
            isActive:true,
            $and: [
                {'startDate': {$lte: new Date()}},
                //{'endDate': {$gt: new Date()}}
            ]
        }).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    },
    getPremiumById:function (id,callback) {
        premium.find({_id : id,isActive:true}).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    },

    addPremium:function (body,callback) {
        var war=new premium({
            name:body.name,
            value:body.value,
            startDate:body.startDate,
            endDate:body.endDate,
        });
        war.save().then(function (savedData) {
            var data={message:"success",data:savedData}
            callback(data)

        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);

        })
    },
    updatePremium:function (body,callback) {
        premium.updateOne(
            { "_id" : body.id },
            { $set: {
                name:body.name,
                value:body.value,
                startDate:body.startDate,
                endtDate:body.endtDate,
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
    deletePremium:function (id,callback) {
        premium.updateOne(
            { "_id" : id },
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
module.exports=premiumDal;