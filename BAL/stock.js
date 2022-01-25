var stockDal=require("../DAL/stock");
var packingDal=require("../DAL/packing");
var packingSizeDal=require("../DAL/packingSize");
var productItemDal=require("../DAL/productItem");

var stockBal={
    getAllStock:function (callback) {
        stockDal.getAllStock(function (data,err) {

            callback(data);
        });
    },

    getAllStockSum:function (callback) {
        stockDal.getAllStockSum(function (data,err) {

            callback(data);
        });
    },

    getStockById:function (id,callback) {
        stockDal.getStockById(id,function (data,err) {
            callback(data);
        });
    },
    addStock:function (body,callback) {
        packingDal.getCategoryByPackingId(body.id,function (ret,err){
            body.category=ret.data[0].category;
            body.subcategory=ret.data[0].subcategory;
            packingSizeDal.getPackingSizeById(ret.data[0].packingsizeId,function (pack,err){
                body.packingsize=pack.data[0]._doc.size;
                productItemDal.getProductItemById(ret.data[0].productItemId,function (prod,err){

                    body.productItemID=prod.data[0]._doc._id
                    body.productItem=prod.data[0]._doc.name;
                    body.productItemId=prod.data[0]._doc._id;


                    stockDal.addStock(body,function (data,err) {
                    packingDal.getPackingQty(body,function (packData,err){
                        var packObj={
                            id:packData.data[0]._id,
                            movedQty:parseInt(packData.data[0]._doc.movedQty)+parseInt(body.qty),
                            qty:parseInt(packData.data[0]._doc.qty)-parseInt(body.qty),
                            packingsizeId:packData.data[0]._doc.packingsizeId,
                            uploaderId:packData.data[0]._doc.uploaderId,
                            downloaderId:packData.data[0]._doc.downloaderId,
                            dryId:packData.data[0]._doc.dryId,
                        }
                        packingDal.updatePacking(packObj,function (finalPack,err){
                            callback(data);
                        })

                    })

                    })
                })

            })

        })

    }
    ,

    updateQtyStock:function (body,callback) {
        stockDal.updateQtyStock(body,function (data,err) {
            callback(data);
        })
    },

    detailQtyStock:function (body,callback) {
        stockDal.detailQtyStock(body,function (data,err) {
            callback(data);
        })
    },


    updateStock:function (body,callback) {
        stockDal.updateStock(body,function (data,err) {
            callback(data);
        })
    },
    deleteStock:function (id,callback) {
        stockDal.deleteStock(id,function (data,err) {
            callback(data);
        })
    },
    getStockWithDetail_withID:function (data,callback) {
        stockDal.getStockWithDetail_withID(data,function (data1,err) {
            callback(data1);
        });
    },

}

module.exports=stockBal;