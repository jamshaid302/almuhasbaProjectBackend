var commodityIssueForProductionDal=require("../DAL/commodityIssueForProduction");
var purchaseOrderDal=require("../DAL/purchaseOrder");
const productionOutputDal = require("../DAL/productionOutput");
var commodityIssueForProductionBal={
    getAllCommodityIssueForProduction:function (body,callback) {
        commodityIssueForProductionDal.getAllCommodityIssueForProduction(body,function (data,err) {
            callback(data);
        });
    },
    getCommodityIssueForProductionById:function (id,callback) {
        commodityIssueForProductionDal.getCommodityIssueForProductionById(id,function (data,err) {
            callback(data);
        });
    },
    getCommodityIssueForProductionOne:function (id,callback) {
        commodityIssueForProductionDal.getCommodityIssueForProductionOne(id,function (data,err) {
            callback(data);
        });
    },

    addCommodityIssueForProduction:function (body,callback) {
        purchaseOrderDal.getPurchaseOrderById(body.purchaseOrderId,function (data,err) {
            if(parseInt(data.data[0].downloaderBag)-parseInt(body.bagsForProduction)<0)
            {
                var data={message:"error",data:"Bags are not valid quantity for this invoice number"}
                callback(data);
            }else {
                body.remainingBags=parseInt(data.data[0].downloaderBag)-parseInt(body.bagsForProduction);
                body.bagSize=data.data[0].currentDownloader.packingSize;
                body.netWeight=parseInt(data.data[0].factoryGross) -parseInt(data.data[0].factoryTare)-[(data.data[0].bardana==null?0:parseInt(data.data[0].bardana))+(data.data[0].kanta==null?0:parseInt(data.data[0].kanta))+(data.data[0].sangli==null?0:parseInt(data.data[0].sangli))+(data.data[0].moisture==null?0:parseInt(data.data[0].moisture))+(data.data[0].other==null?0:parseInt(data.data[0].other))];
                commodityIssueForProductionDal.addCommodityIssueForProduction(body,function (data,err) {
                    callback(data);
                })
            }


        })

    },
    updateCommodityIssueForProduction:function (body,callback) {
        purchaseOrderDal.getPurchaseOrderById(body.purchaseOrderId,function (data,err) {
            if(parseInt(data.data[0].downloaderBag)-parseInt(body.bagsForProduction)<0)
            {
                var data={message:"error",data:"Bags are not valid quantity for this invoice number"}
                callback(data);
            }else {
                body.remainingBags=parseInt(data.data[0].downloaderBag)-parseInt(body.bagsForProduction);
                body.bagSize=data.data[0].currentDownloader.packingSize;
                body.netWeight=parseInt(data.data[0].factoryGross) -parseInt(data.data[0].factoryTare)-[(data.data[0].bardana==null?0:parseInt(data.data[0].bardana))+(data.data[0].kanta==null?0:parseInt(data.data[0].kanta))+(data.data[0].sangli==null?0:parseInt(data.data[0].sangli))+(data.data[0].moisture==null?0:parseInt(data.data[0].moisture))+(data.data[0].other==null?0:parseInt(data.data[0].other))];

                commodityIssueForProductionDal.updateCommodityIssueForProduction(body,function (data,err) {
                    callback(data);
                })
            }


        })

    },
    deleteCommodityIssueForProduction:function (id,callback) {
        commodityIssueForProductionDal.deleteCommodityIssueForProduction(id,function (data,err) {
            if (data.message == 'success'){
                commodityIssueForProductionDal.deleteExpenses(id,function (data2,err){
                    callback(data);
                })
            }
        })
    }

}
module.exports=commodityIssueForProductionBal;