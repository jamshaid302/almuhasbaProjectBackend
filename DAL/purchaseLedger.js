var purchaseLedger=require("../models/purchaseLedger");
var mongoose=require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
var purchaseLedgerDal={
    getAllPurchaseLedger:function (callback) {
        purchaseLedger.find({isActive:true}).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    },
    getPurchaseLedgerById:function (id,callback) {
        purchaseLedger.find({_id : id,isActive:true}).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    },
    getPurchaseLedgerByOrderId:function (id,callback) {
        purchaseLedger.find({purchaseOrderId : id,isActive:true,dc:'c'}).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    }
    ,
    getPurchaseLedgerDetailById:function (id,callback) {
        var lookupobj;
        var unwind;
        var match;
        if(id.person == 'd'){
            lookupobj = { from: 'contractors', localField:'downloaderId', foreignField: '_id', as: 'ducsData' };
            unwind =  { path: "$ducsData", preserveNullAndEmptyArrays: true }
            match =  { "ducsData.isActive":true}
        }
        else if(id.person == 'u'){
            lookupobj = { from: 'contractors', localField:'uploaderId', foreignField: '_id', as: 'ducsData' }
            unwind =  { path: "$ducsData", preserveNullAndEmptyArrays: true }
            match =  { "ducsData.isActive":true}
        }
        else if(id.person == 'c'){
            lookupobj = { from: 'contractors', localField:'carriageId', foreignField: '_id', as: 'ducsData' }
            unwind =  { path: "$ducsData", preserveNullAndEmptyArrays: true }
            match =  { "ducsData.isActive":true}
        }
        else if(id.person == 's'){
            lookupobj = { from: 'suppliers', localField:'supplierId', foreignField: '_id', as: 'ducsData' }
            unwind =  { path: "$ducsData", preserveNullAndEmptyArrays: true }
            match =  { "ducsData.isActive":true}
        }
        id.start = id.start+'T00:00:00';
        id.end = id.end+'T23:59:59';
        purchaseLedger.aggregate([
            { $match: {
                    isActive:true,
                    $or: [{downloaderId: {$eq: ObjectId(id.id)} }, {uploaderId: {$eq: ObjectId(id.id)}}, {carriageId: {$eq: ObjectId(id.id)}},{supplierId: {$eq: ObjectId(id.id)}} ],
                    date :  { $gte : new Date(id.start), $lte : new Date(id.end) }
            }
            },
            { $lookup: lookupobj },
            { $unwind: unwind },
            { $match:  match },
            { $lookup: {
                    from: 'purchaseorders',
                    localField: 'purchaseOrderId',
                    foreignField: '_id',
                    as: 'purchaseOrderData'
                }},
            { $unwind : { path: "$purchaseOrderData", preserveNullAndEmptyArrays: true } },
            {
                $match:  { "purchaseOrderData.isActive":true }
            }
        ]).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    },
    addPurchaseLedger:function (body,callback) {
        purchaseLedger.insertMany(body).then(function (savedData) {
            var data={message:"success",data:savedData}
            callback(data);
        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);
        })
    },

    updatePurchaseLedger:function (body,callback) {
        var promisearr = [];
        for(var i=0;i<body.arr.length;i++){
            promisearr.push(promisecustom({obj:body.arr[i],order:body.order}))
        }
        Promise.all(promisearr).
            then(function (resdata){
            var data={message:"success",data:resdata}
            callback(data)
        }).catch(function (err){
            var data={message:"error",data:err.message}
            callback(data);
        })
    },
    addSupplierLedger:function (body,callback){
        var sledger;
        if(body.invoiceId!=undefined){
            sledger=new purchaseLedger({ invoiceId:body.invoiceId,supplierId:body.supplier, purchaseOrderId: body.order, receiptNo:getRandomArbitrary(100000,999999), amount: body.amount, description:'By company ', narration:'By company ', paymentType:'', chequeNo:'', receiptFrom:'imran',dc:body.dc});
        }
        else{
            sledger=new purchaseLedger({ supplierId:body.supplier, purchaseOrderId: body.order, receiptNo:getRandomArbitrary(100000,999999), amount: body.amount, description:'By company ', narration:'By company ', paymentType:'', chequeNo:'', receiptFrom:'imran',dc:body.dc});
        }
        sledger.save().then(function (savedData) {
            var data={message:"success",data:savedData}
            callback(data)
        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);

        })
    }
    ,
    updateSupplierLedger:function (body,callback){
        purchaseLedger.updateOne(
            { "purchaseOrderId" : body.order,"supplierId":body.supplier },
            { $set: {
                    amount:body.amount
                } },
        ).then(function (updateDate) {
            var data={message:"success",data:updateDate}
            callback(data)
        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);
        });
    }
    ,
    deletePurchaseLedger:function (id,callback) {
        purchaseLedger.updateOne(
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
function getRandomArbitrary(min, max) {
    return  Math.round(Math.random() * (max - min) + min);
}
function promisecustom(config){
    var searchfilter;
    if(config.obj.supplierId!=undefined){
        searchfilter = { "purchaseOrderId" : ObjectId(config.order),"supplierId":config.obj.oldid,"dc":'c'}
    }
    else if(config.obj.downloaderId!=undefined){
        searchfilter = { "purchaseOrderId" : ObjectId(config.order),"downloaderId":config.obj.oldid,"dc":'c'}
    }
    else if(config.obj.uploaderId!=undefined){
        searchfilter = { "purchaseOrderId" : ObjectId(config.order),"uploaderId":config.obj.oldid,"dc":'c'}
    }
    else if(config.obj.carriageId!=undefined){
        searchfilter = { "purchaseOrderId" : ObjectId(config.order),"carriageId":config.obj.oldid,"dc":'c'}
    }
    delete config.obj.oldid;
    return new Promise(function(resolve, reject) {
        purchaseLedger.updateOne(
            searchfilter,
            { $set: config.obj },
        ).then(function (updateDate) {
            var data={message:"success",data:updateDate}
            resolve(data)
        }).catch(function (err) {
            var data={message:"error",data:err.message}
            reject(data);
        });
    })
}
module.exports=purchaseLedgerDal;