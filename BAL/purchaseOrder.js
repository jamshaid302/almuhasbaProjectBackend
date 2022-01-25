var purchaseOrderDal=require("../DAL/purchaseOrder");
var contractorRateDal=require("../DAL/contractorRate");
var premiumDal=require("../DAL/premium");
var purchaseLedgerBal=require("../BAL/purchaseLedger");
const productionOutputDal = require("../DAL/productionOutput");
var purchaseOrderBal={
    getAllPurchaseOrder:function (body,callback) {
        purchaseOrderDal.getAllPurchaseOrder(body,function (data,err) {
            callback(data);
        });
    },
    getPurchaseOrderById:function (id,callback) {
        purchaseOrderDal.getPurchaseOrderById(id,function (data,err) {
            callback(data);
        });
    },
    getPurchaseOrderDetailById:function (id,callback) {
        purchaseOrderDal.getPurchaseOrderDetailById(id,function (data,err) {
            callback(data);
        });
    },
    searchInvoice:function (search,callback) {
      purchaseOrderDal.searchInvoice(search,function (data,err) {
          callback(data);
      })
    },
    addPurchaseOrder:function (body,callback) {
        if(body.farmGross==""||body.farmTare==""||parseInt(body.farmGross)<parseInt(body.farmTare)){
            callback({message:"error",data:"Farm gross is less than farm tare!"})
        }
        if(body.factoryGross==""||body.factoryTare==""||parseInt(body.factoryGross)<parseInt(body.factoryTare)){
            callback({message:"error",data:"Factory gross is less than factory tare!"})
        }
        contractorRateDal.getContractorRateMultipleId([body.uploaderRate,body.downloaderRate,body.carriageRate],function (data1,err1) {
            if(data1.message=="success"){
                var rates=data1.data;
                if(rates[0]._doc.packingSize==rates[1]._doc.packingSize&& rates[0]._doc.packingSize==rates[2]._doc.packingSize){
                    if(body.uploaderBag==body.downloaderBag && body.uploaderBag==body.carriageBag)
                    {
                        body.suspect=false;
                    }else {
                        body.suspect=true;
                    }
                    if(body.fix=="on"){
                        var weight=0;
                        body.fixType=body.spotFixation["fixtype"];
                        body.pageRef=body.spotFixation["pageref"]==""?null:body.spotFixation["pageref"];
                        body.fixationDate=body.spotFixation["fixationDate"];
                        body.premium=body.spotFixation["premium"]==""?null:body.spotFixation["premium"];
                        body.rateType=body.spotFixation["quantityType"];
                        if(body.spotFixation["fixtype"]=="factory"){
                            weight=parseInt(body.factoryGross) -parseInt(body.factoryTare)-[(body.bardana==""?0:parseInt(body.bardana))+(body.kanta==""?0:parseInt(body.kanta))+(body.sangli==""?0:parseInt(body.sangli))+(body.moisture==""?0:parseInt(body.moisture))+(body.other==""?0:parseInt(body.other))];
                        }else if(body.spotFixation["fixtype"]=="farm"){
                            weight=parseInt(body.farmGross) -parseInt(body.farmTare)-[(body.bardana==""?0:parseInt(body.bardana))+(body.kanta==""?0:parseInt(body.kanta))+(body.sangli==""?0:parseInt(body.sangli))+(body.moisture==""?0:parseInt(body.moisture))+(body.other==""?0:parseInt(body.other))];
                        }
                        if(weight>0){
                            if(body.spotFixation["quantityType"]=="mund")
                            {

                                body.totalAmount=(weight *(parseInt(body.spotFixation["quantityRate"])/40)).toFixed(0) ;
                                body.fixationStatus=1;
                                body.rate=body.spotFixation["quantityRate"];

                            }
                            else if(body.spotFixation["quantityType"]=="kg"){
                                body.totalAmount=(weight *parseInt(body.spotFixation["quantityRate"])).toFixed(0) ;
                                body.fixationStatus=1;
                                body.rate=body.spotFixation["quantityRate"];
                            }
                        }else{
                            callback({message:"error",data:"Invalid Weight"});
                        }
                        if(body.spotFixation["premium"]!=="?" && body.spotFixation["premium"]!==""){
                            premiumDal.getPremiumById(body.spotFixation["premium"],function (data2,err2) {
                                if(data2.message=="success"){
                                    var premiumPrice=((data2.data[0]._doc.value)/40)*weight;
                                    body.totalAmount=(parseFloat(body.totalAmount)+premiumPrice).toFixed(0);
                                    body.fixationtip = parseInt(body.fixationtip);
                                    body.totalAmount = parseInt(body.totalAmount);
                                    body.totalAmount+=body.fixationtip;
                                    purchaseOrderDal.addPurchaseOrder(body,function (data,err) {
                                        if(data.message=="success"){
                                            purchaseLedgerBal.addPurchaseLedger({body:body,order:data},function (ledgedata,err){
                                                callback(ledgedata)
                                            })
                                        }
                                        else{
                                            callback({message:"error",data:"Issue in adding order"});
                                        }
                                    })
                                }else {
                                    callback({message:"error",data:"Issue in premium"});
                                }

                            })
                        }else{
                            body.fixationtip = parseInt(body.fixationtip);
                            body.totalAmount = parseInt(body.totalAmount);
                            body.totalAmount+=body.fixationtip;
                            purchaseOrderDal.addPurchaseOrder(body,function (data,err) {
                                if(data.message=="success"){
                                    purchaseLedgerBal.addPurchaseLedger({body:body,order:data},function (ledgedata,err){
                                        callback(ledgedata)
                                    })
                                }
                                else{
                                    callback({message:"error",data:"Issue in adding order"});
                                }
                            })
                        }

                    }
                    else {
                        purchaseOrderDal.addPurchaseOrder(body,function (data,err) {
                            if(data.message=="success"){
                                purchaseLedgerBal.addPurchaseLedger({body:body,order:data},function (ledgedata,err){
                                    callback(ledgedata)
                                })
                            }
                            else{
                                callback({message:"error",data:"Issue in adding order"});
                            }
                        })
                    }


                }else {
                    callback({message:"error",data:"Packing size is not same"});
                }

            }
            else{
                callback({message:"error",data:"Error Adding Contractor Details"});
            }

        })

    },
    addFixation:function (body,callback) {
        purchaseOrderDal.getPurchaseOrderById(body.id,function (data,err) {
            var entry=data.data[0];
            var net=0;
            if( body.spotFixation["quantityType"]=="mund" && body.spotFixation["fixtype"]=="farm")
            {
                 net=entry.farmGross-entry.farmTare-entry.bardana-entry.kanta-entry.sangli-entry.moisture-entry.other;
                net=net/40.0;
                body.totalAmount=net*parseInt(body.spotFixation["quantityRate"]);
            }else if(body.spotFixation["quantityType"]=="kg" && body.spotFixation["fixtype"]=="farm"){
                net=entry.farmGross-entry.farmTare-entry.bardana-entry.kanta-entry.sangli-entry.moisture-entry.other;
                body.totalAmount=net*parseInt(body.spotFixation["quantityRate"]);

            }
            if( body.spotFixation["quantityType"]=="mund" && body.spotFixation["fixtype"]=="factory")
            {
                 net=entry.factoryGross-entry.factoryTare-entry.bardana-entry.kanta-entry.sangli-entry.moisture-entry.other;
                net=net/40.0;
                body.totalAmount=net*parseInt(body.spotFixation["quantityRate"]);
            }else if(body.spotFixation["quantityType"]=="kg" && body.spotFixation["fixtype"]=="factory"){
                 net=entry.factoryGross-entry.factoryTare-entry.bardana-entry.kanta-entry.sangli-entry.moisture-entry.other;
                body.totalAmount=net*parseInt(body.spotFixation["quantityRate"]);

            }
            body.fixationStatus=1;
            body.rate=body.spotFixation["quantityRate"];
            if(body.spotFixation["premium"]!=="?" &&body.spotFixation["premium"]!==""){
                premiumDal.getPremiumById(body.spotFixation["premium"],function (data3,err3) {
                    if(data3.message=="success"){
                        var premiumPrice=((data3.data[0]._doc.value))*net;
                        body.totalAmount=(body.totalAmount+premiumPrice).toFixed(0);
                        body.fixationtip = parseInt(body.fixationtip);
                        body.totalAmount = parseInt(body.totalAmount);
                        body.totalAmount+=body.fixationtip;
                        purchaseOrderDal.addFixation(body,function (data,err) {
                            if(data.message=="success"){
                                if(body.status == 'fixed'){
                                    purchaseLedgerBal.updateSupplierLedger({order:entry._id,supplier:entry.supplierId,amount:body.totalAmount},function (ledgedata,err){
                                        callback(ledgedata)
                                    })
                                }
                                else{
                                    purchaseLedgerBal.addSupplierLedger({order:entry._id,supplier:entry.supplierId,amount:body.totalAmount,dc:'c'},function (ledgedata,err){
                                        callback(ledgedata)
                                    })
                                }
                            }
                            else{
                                callback({message:"error",data:"Issue in updating order"});
                            }
                        })
                    }else {
                        callback({message:"error",data:"This order has premium which has issue"});
                    }

                })
            }else {
                body.fixationtip = parseInt(body.fixationtip);
                body.totalAmount = parseInt(body.totalAmount);
                body.totalAmount+=body.fixationtip;
                purchaseOrderDal.addFixation(body,function (data,err) {
                    if(data.message=="success"){
                        if(body.status == 'fixed'){
                            purchaseLedgerBal.updateSupplierLedger({order:entry._id,supplier:entry.supplierId,amount:body.totalAmount},function (ledgedata,err){
                                callback(ledgedata)
                            })
                        }
                        else{
                            purchaseLedgerBal.addSupplierLedger({order:entry._id,supplier:entry.supplierId,amount:body.totalAmount,dc:'c'},function (ledgedata,err){
                                callback(ledgedata)
                            })
                        }
                    }
                    else{
                        callback({message:"error",data:"Issue in updating order"});
                    }
                })
            }

        });
    },
    updatePurchaseOrder:function (body,callback) {
        if(body.farmGross==""||body.farmTare==""||parseInt(body.farmGross)<parseInt(body.farmTare)){
            callback({message:"error",data:"Farm gross is less than farm tare!"})
        }
        if(body.factoryGross==""||body.factoryTare==""||parseInt(body.factoryGross)<parseInt(body.factoryTare)){
            callback({message:"error",data:"Factory gross is less than factory tare!"})
        }
        contractorRateDal.getContractorRateMultipleId([body.uploaderRate,body.downloaderRate,body.carriageRate],function (data1,err1) {
            if(data1.message=="success"){
                var rates=data1.data;
                if(rates[0]._doc.packingSize==rates[1]._doc.packingSize&& rates[0]._doc.packingSize==rates[2]._doc.packingSize){
                    if(body.uploaderBag==body.downloaderBag && body.uploaderBag==body.carriageBag)
                    {
                        body.suspect=false;
                    }else {
                        body.suspect=true;
                    }
                    //getting purchase order for fixation check
                    purchaseOrderDal.getPurchaseOrderById(body.id,function (data2,err2) {
                        var obj=data2.data[0];
                        if(obj.fixationStatus==true){
                            var weight=0;
                            if(obj.fixType=="factory"){
                                weight=parseInt(body.factoryGross) -parseInt(body.factoryTare)-[(body.bardana==""?0:parseInt(body.bardana))+(body.kanta==""?0:parseInt(body.kanta))+(body.sangli==""?0:parseInt(body.sangli))+(body.moisture==""?0:parseInt(body.moisture))+(body.other==""?0:parseInt(body.other))];
                            }else if(obj.fixType=="farm"){
                                weight=parseInt(body.farmGross) -parseInt(body.farmTare)-[(body.bardana==""?0:parseInt(body.bardana))+(body.kanta==""?0:parseInt(body.kanta))+(body.sangli==""?0:parseInt(body.sangli))+(body.moisture==""?0:parseInt(body.moisture))+(body.other==""?0:parseInt(body.other))];
                            }
                            if(weight>0){
                                if(obj.rateType=="mund")
                                {
                                    body.totalAmount=(weight *(parseInt(obj.rate)/40)).toFixed(0);
                                }
                                else if(obj.rateType=="kg"){
                                    body.totalAmount=(weight *parseInt(obj.rate)).toFixed(0);
                                }

                            }else{
                                callback({message:"error",data:"Invalid Weight"});
                            }
                            if(obj.premium){
                                premiumDal.getPremiumById(obj.premium,function (data3,err3) {
                                    if(data3.message=="success"){
                                        var premiumPrice=((data3.data[0]._doc.value)/40)*weight;
                                        var newsum = parseInt(body.totalAmount) + premiumPrice;
                                        body.totalAmount = newsum.toFixed(0);
                                        // body.totalAmount=parseFloat(parseInt(body.totalAmount) + parseFloat(premiumPrice)).toFixed(0);
                                        purchaseOrderDal.updatePurchaseOrder(body,function (data,err) {
                                            if(data.message=="success"){
                                                purchaseLedgerBal.updatePurchaseLedger({body:body,order:body.id},function (ledgedata,err){
                                                    callback(ledgedata)
                                                })
                                            }
                                            else{
                                                callback({message:"error",data:"Issue in updating order"});
                                            }
                                        })
                                    }else {
                                        callback({message:"error",data:"This order has premium which has issue"});
                                    }

                                })
                            }

                        }else{
                            purchaseOrderDal.updatePurchaseOrder(body,function (data3,err3) {
                                if(data3.message=="success"){
                                    purchaseLedgerBal.updatePurchaseLedger({body:body,order:body.id},function (ledgedata,err){
                                        callback(ledgedata)
                                    })
                                }
                                else{
                                    callback({message:"error",data:"Issue in updating order"});
                                }
                            })
                        }
                        
                    });

                }else {
                    callback({message:"error",data:"Packing size is not same"});
                }

            }

        })
    },
    deletePurchaseOrder:function (id,callback) {
        purchaseOrderDal.deletePurchaseOrder(id,function (data,err) {
            if (data.message == 'success'){
                purchaseOrderDal.deleteExpenses(id,function (data2,err){
                    callback(data);
                })
            }
        })
    }

}
module.exports=purchaseOrderBal;