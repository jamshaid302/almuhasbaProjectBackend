var storeDal=require("../DAL/store");
var storeBal={
    getStoreChatha:function (callback) {
        storeDal.getStoreChatha(function (data,err) {
            callback(data);
        });
    },
    getDetailStore:function (id,callback) {
        storeDal.getDetailStore(id,function (data,err) {

            callback(data);
        });
    },
    getAllStore:function (callback) {
        storeDal.getAllStore(function (data,err) {
            callback(data);
        });
    },
    getStoreById:function (id,callback) {
        storeDal.getStoreById(function (data,err) {
            callback(data);
        });
    },


    addStore:function (body,callback) {
        storeDal.addStore(body,function (data,err) {
            callback(data);
        })
    },
    updateStore:function (body,callback) {
        storeDal.updateStore(body,function (data,err) {
            callback(data);
        })
    },
    deleteStore:function (id,callback) {
        storeDal.deleteStore(id,function (data,err) {
            callback(data);
        })
    }

}
module.exports=storeBal;