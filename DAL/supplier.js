var supplier=require("../models/supplier");
var db=require("../utility/conn");
var defaultGl = require('../models/defaultGlCoa');
const coaDal = require("../DAL/coa");
var supplierDal={
    getAllSupplier:function (callback) {
        supplier.find({isActive:true}).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    },
    getSupplierById:function (id,callback) {
        supplier.find({_id : id,isActive:true}).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    },
    addSupplier:function (body,callback) {
        defaultGl.find({coatype:'Supplier'}).then(function (coaData){
            if(coaData.length>0){
        var sup=new supplier({
            firstName:body.firstName,
            lastName:body.lastName,
            phone:body.phone,
            address:body.address,
            cnic:body.cnic,
            area:body.area,
            province:body.province,
        });
        sup.save().then(function (savedData) {
            const coaBody = {
              'node': coaData[0].coaname,
                'accounttitle': body.firstName+" "+body.lastName,
                'behaviour':'Credit',
            };
            coaDal.addCoa(coaBody, function(data,err){
                if(data.message=="success"){
                    var data={message:"success",data:data}
                    callback(data);
                }else if(data.message=="error") {
                    var data={message:"Error in coa Creating in Supplier",data:data}
                    callback(data);
                }
            });
            var data={message:"success",data:savedData}
            callback(data)

        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);

        });
            }else{
                var data={message:"error",data:"Please Setup DefaultGl account of supplier in account section."}
                callback(data);
            }

        }).catch(function (err1){
            var data={message:"error",data:err1.message}
            callback(data);
        });
    },
    updateSupplier:function (body,callback) {
        supplier.updateOne(
            { "_id" : body.id },
            { $set: {
                firstName:body.firstName,
                lastName:body.lastName,
                phone:body.phone,
                address:body.address,
                cnic:body.cnic,
                area:body.area,
                province:body.province,
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
    deleteSupplier:function (id,callback) {
        supplier.updateOne(
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
module.exports=supplierDal;