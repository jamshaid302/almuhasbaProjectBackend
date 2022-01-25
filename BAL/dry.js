var dryDal=require("../DAL/dry");
var contractorRates=require("../models/contractorRate");
const purchaseExpenses = require("../models/purchaseExpences");
var dryBal={
    getAllDry:function (callback) {
        dryDal.getAllDry(function (data,err) {
            callback(data);
        });
    },
    getDryById:function (id,callback) {
        dryDal.getDryById(id,function (data,err) {
            callback(data);
        });
    },
    getDryDetailById:function (id,callback) {
        dryDal.getDryDetailById(id,function (data,err) {
            callback(data);
        });
    },
    addDry:function (body,callback) {
        var dryObj;
        if(body.storeId !="") {
            dryObj = {
                commodityOutputId:body.productionOutput,
                uploaderId:body.uploaderId,
                downloaderId:body.downloaderId,
                storeId:body.storeId,
                lossNumber:body.lossNum,
                grossStore:body.gStore,
                tareStore:body.tStore,
                grossDry:body.gDry,
                tareDry:body.tDry
            };
        }else{
            dryObj = {
                commodityOutputId:body.productionOutput,
                uploaderId:body.uploaderId,
                downloaderId:body.downloaderId,
                lossNumber:body.lossNum,
                grossStore:body.gStore,
                tareStore:body.tStore,
                grossDry:body.gDry,
                tareDry:body.tDry
            };
        }
        dryDal.addDry(dryObj,function (data,err) {
            callback(data);
        })
    }
    ,
    updateDry:function (body,callback) {
        var downloaderRateId;
        var uploaderRateId;
        dryDal.getOldDryData(body,async function (data1,err){
            var d = data1;
            var oldDownloaderId = data1.data._doc.downloaderId;
            var oldUploaderId = data1.data._doc.uploaderId;
            dryDal.getDownloaderRateID(oldDownloaderId,async function (data2,err){
                var d = data2;
                downloaderRateId = data2.data[0]._doc._id.toString();
                dryDal.getUploaderRateID(oldUploaderId,async function (data2,err){
                    var d = data2;
                    uploaderRateId = data2.data[0]._doc._id.toString();
                    var setObj;
                    if(body.storeId !="") {
                        setObj = {
                            commodityOutputId:body.productionOutput,
                            uploaderId:body.uploaderId,
                            downloaderId:body.downloaderId,
                            uploaderRateId : uploaderRateId,
                            downloaderRateId : downloaderRateId,
                            storeId:body.storeId,
                            lossNumber:body.lossNum,
                            grossStore:body.gStore,
                            tareStore:body.tStore,
                            grossDry:body.gDry,
                            tareDry:body.tDry
                        };
                    }else{
                        setObj = {
                            commodityOutputId:body.productionOutput,
                            uploaderId:body.uploaderId,
                            downloaderId:body.downloaderId,
                            uploaderRateId : uploaderRateId,
                            downloaderRateId : downloaderRateId,
                            lossNumber:body.lossNum,
                            grossStore:body.gStore,
                            tareStore:body.tStore,
                            grossDry:body.gDry,
                            tareDry:body.tDry
                        };
                    }
                    dryDal.updateDry({setObj:setObj,id:body.id},  function (data,err) {
                        callback(data);
                    });
                });
            });
        });
    },
    deleteDry:function (id,callback) {
        dryDal.deleteDry(id,function (data,err) {
            if (data.message == 'success'){
                dryDal.deleteExpenses(id,function (data2,err){
                    callback(data);
                })
            }

        })
    }

}
function getRandomArbitrary(min, max) {
    return  Math.round(Math.random() * (max - min) + min);
}
module.exports=dryBal;