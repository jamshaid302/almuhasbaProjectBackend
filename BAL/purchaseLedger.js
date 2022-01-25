var purchaseLedgerDal=require("../DAL/purchaseLedger");
var mongoose=require("mongoose");
const Objectmongo = mongoose.Types.ObjectId;
var purchaseLedgerBal={
    getAllPurchaseLedger:function (callback) {
        purchaseLedgerDal.getAllPurchaseLedger(function (data,err) {
            callback(data);
        });
    },
    getPurchaseLedgerById:function (id,callback) {
        purchaseLedgerDal.getPurchaseLedgerById(id,function (data,err) {
            callback(data);
        });
    },
    getPurchaseLedgerByOrderId:function (id,callback) {
        purchaseLedgerDal.getPurchaseLedgerByOrderId(id,function (data,err) {
            callback(data);
        });
    }
    ,
    getPurchaseLedgerDetailById:function (id,callback) {
        purchaseLedgerDal.getPurchaseLedgerDetailById(id,function (data,err) {
            callback(data);
        });
    },


    addPurchaseLedger:function (body,callback) {

        var arr=[];
        var obj1 ={ supplierId:body.body.supplierId, purchaseOrderId: body.order.data._doc._id, receiptNo:getRandomArbitrary(100000,999999), amount: body.body.totalAmount, description:'By company ', narration:'By company ', paymentType:'', chequeNo:'', receiptFrom:'imran',};
        var obj2 ={ downloaderId:body.body.downloader, purchaseOrderId: body.order.data._doc._id, receiptNo:getRandomArbitrary(100000,999999), amount: body.body.downloadexpense, description:'By company ', narration:'By company ', paymentType:'', chequeNo:'', receiptFrom:'imran',};
        var obj3 ={ uploaderId:body.body.uploader, purchaseOrderId: body.order.data._doc._id, receiptNo:getRandomArbitrary(100000,999999), amount: body.body.uploadexpense, description:'By company ', narration:'By company ', paymentType:'', chequeNo:'', receiptFrom:'imran',};
        var obj4 ={ carriageId:body.body.carriage, purchaseOrderId: body.order.data._doc._id, receiptNo:getRandomArbitrary(100000,999999), amount: body.body.carriageexpense, description:'By company ', narration:'By company ', paymentType:'', chequeNo:'', receiptFrom:'imran',};
        if(body.body.totalAmount!=undefined){
            arr.push(obj1,obj2,obj3,obj4);
        }
        else{
            arr.push(obj2,obj3,obj4);
        }

        purchaseLedgerDal.addPurchaseLedger(arr,function (data,err) {
            callback(data);
        })
    },
    updatePurchaseLedger:function (body,callback) {
        purchaseLedgerBal.getPurchaseLedgerByOrderId(body.order,function (data,err){
            var obj1 ={ supplierId:body.body.supplierId,amount: body.body.totalAmount};
            var obj2 ={ downloaderId:body.body.downloader,amount: body.body.downloadexpense};
            var obj3 ={ uploaderId:body.body.uploader,amount: body.body.uploadexpense};
            var obj4 ={ carriageId:body.body.carriage,amount: body.body.carriageexpense};
            var arr=[];
            for(var i = 0 ;i<data.data.length;i++){
                if(data.data[i].supplierId!=undefined){
                    obj1.oldid = data.data[i].supplierId
                }
                else if(data.data[i].downloaderId!=undefined){
                    obj2.oldid = data.data[i].downloaderId
                }
                else if(data.data[i].uploaderId!=undefined){
                    obj3.oldid = data.data[i].uploaderId
                }
                else if(data.data[i].carriageId!=undefined){
                    obj4.oldid = data.data[i].carriageId
                }
            }
            if(body.body.totalAmount!=undefined){
                arr.push(obj1,obj2,obj3,obj4);
            }
            else{
                arr.push(obj2,obj3,obj4);
            }
            purchaseLedgerDal.updatePurchaseLedger({arr:arr,order:body.order},function (data,err) {
                callback(data);
            })
        })
    },
    addSupplierLedger:function (body,callback) {
        purchaseLedgerDal.addSupplierLedger(body,function (data,err) {
            callback(data);
        })
    }
    ,
    updateSupplierLedger:function (body,callback) {
        purchaseLedgerDal.updateSupplierLedger(body,function (data,err) {
                callback(data);
        })
    },
    deletePurchaseLedger:function (id,callback) {
        purchaseLedgerDal.deletePurchaseLedger(id,function (data,err) {
            callback(data);
        })
    }

}
function getRandomArbitrary(min, max) {
    return  Math.round(Math.random() * (max - min) + min);
}
module.exports=purchaseLedgerBal;