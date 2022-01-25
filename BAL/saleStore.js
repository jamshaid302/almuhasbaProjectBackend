var saleStoreDal=require("../DAL/saleStore");
var saleStoreBal={
    getAllSaleStore:function (callback) {
        saleStoreDal.getAllSaleStore(function (data,err) {
            callback(data);
        });
    },
    getSaleStoreById:function (id,callback) {
        saleStoreDal.getSaleStoreById(id,function (data,err) {
            callback(data);
        });
    },
    addSaleStore:function (body,callback) {
        saleStoreDal.addSaleStore(body,function (data,err) {
            callback(data);
        })
    }
    ,
    updateSaleStore:function (body,callback) {
        saleStoreDal.updateSaleStore(body,function (data,err) {
            callback(data);
        })
    },
    deleteSaleStore:function (id,callback) {
        saleStoreDal.deleteSaleStore(id,function (data,err) {
            callback(data);
        })
    }

}

module.exports=saleStoreBal;