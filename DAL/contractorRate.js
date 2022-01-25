var contractorRate=require("../models/contractorRate");
var db=require("../utility/conn");
var contractorRateDal={
    getContractorByIdById:function (id,callback) {
        contractorRate.find({contractorId : id,isActive:true}).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        });
    },
    getAllContractorRate:function (callback) {
        contractorRate.find({isActive:true}).then(function (data) {
            var arr={message:"success",data:data};
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message};
            callback(arr);
        });
    },
    getContractorRateMultipleId:function (id,callback) {
        contractorRate.find({_id : id}).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    },
    addContractorRate:function (body,callback) {
        var conRate=[];
        Object.values(body).forEach(function (item,index) {
            if(typeof(item)=="object"){
                conRate.push({contractorId:body.contractorId,packingSize:item.packingSize,rate:item.rate})
            }
        })
        contractorRate.insertMany(conRate).then(function (data1) {
            var data={message:"success",data:data1}
            callback(data)
        }).catch(function (err1) {
            var data={message:"error",data:err1}
            callback(data);
        })
    },
    deleteContractorRate:function (id,callback) {
        contractorRate.updateOne(
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
module.exports=contractorRateDal;