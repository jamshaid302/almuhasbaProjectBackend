var packingDal=require("../DAL/packing");
var stockDal = require("../DAL/stock");
var dryDal = require("../DAL/dry");
const bookDal = require("../DAL/book");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
var packingBal={
    getPackingWithDetail:function (callback) {
        packingDal.getPackingWithDetail(function (data,err) {
            callback(data);
        });
    },
    getPackingById:function (id,callback) {
        packingDal.getPackingById(id,function (data,err) {
            callback(data);
        });
    },
    addPacking:function (body,callback) {
        dryDal.getDryDetailById(body.dryId,function (data1){
            if(data1.message=="success"){
                body.productItemId = data1.data[0].commodityOutPutData.productItemId;
                packingDal.addPacking(body,function (data2,err) {
                    // if(data2.message=="success"){
                    //     stockDal.addStock(body,function (data3,err){
                    //         callback(data3);
                    //     })
                    // }else {
                    //     callback(data2)
                    // }
                    callback(data2);
                })
            }else {
                callback(data1)
            }
        })
    },
    updatePacking:function (body,callback) {

        packingDal.getPackingQty(body,function (data3,err) {
            callback(data3);
        })
        dryDal.getDryDetailById(body.dryId,function (data1){
            if(data1.message=="success"){
                body.productItemId = data1.data[0].commodityOutPutData.productItemId;

                //01
                packingDal.getUploadRateId(body,async function (data01,err) {
                    var fncURateId = ObjectId(data01.data.id);
                    body.oldURateId = fncURateId.toString();
                    body.oldUPackSize = data01.data2;
                    if(data1.message=="success"){
                        packingDal.getDownloadRateId(body,async function (data2,err) {
                            var fncDRateId = ObjectId(data2.data.id);
                            body.oldDRateId = fncDRateId.toString();
                            body.oldDPackSize = data2.data2;
                            if(data2.message=="success"){
                                packingDal.updatePacking(body,function (data,err) {
                                    callback(data);
                                })
                            }
                        });
                    }
                });
                //01

                // packingDal.updatePacking(body,function (data,err) {
                //     callback(data);
                // })
            }else {
                callback(data1)
            }
        })

        // packingDal.updatePacking(body,function (data,err) {
        //     callback(data);
        // })
    },
    deletePacking:function (id,callback) {

        //01
        // packingDal.getUploadRateId(body,async function (data01,err) {
        //     var fncURateId = ObjectId(data01.data.id);
        //     body.oldURateId = fncURateId.toString();
        //     body.oldUPackSize = data01.data2;
        //     if(data1.message=="success"){
        //         packingDal.getDownloadRateId(body,async function (data2,err) {
        //             var fncDRateId = ObjectId(data2.data.id);
        //             body.oldDRateId = fncDRateId.toString();
        //             body.oldDPackSize = data2.data2;
        //             if(data2.message=="success"){
        //                 packingDal.updatePacking(body,function (data,err) {
        //                     callback(data);
        //                 })
        //             }
        //         });
        //     }
        // });
        //01

        packingDal.deletePacking(id,function (data,err) {
                if(data.message=="success"){
                    packingDal.deleteExpenses(id,function (data2,err) {

                        callback(data);
                    })
                }
            // callback(data);
        })
    },

    searchProduct:function (search,callback) {
        packingDal.searchProduct(search,function (data,err) {
            callback(data);
        })
    },

}

module.exports=packingBal;