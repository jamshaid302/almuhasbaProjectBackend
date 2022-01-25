var supplierDal=require("../DAL/supplier");
var supplierBal={
    getAllSupplier:function (callback) {
        supplierDal.getAllSupplier(function (data,err) {
            callback(data);
        });
    },
    getSupplierById:function (id,callback) {
        supplierDal.getSupplierById(id,function (data,err) {
            callback(data);
        });
    },


    addSupplier:function (body,callback) {
        supplierDal.addSupplier(body,function (data,err) {
            callback(data);
        })
    },
    updateSupplier:function (body,callback) {
        supplierDal.updateSupplier(body,function (data,err) {
            callback(data);
        })
    },
    deleteSupplier:function (id,callback) {
        supplierDal.deleteSupplier(id,function (data,err) {
            callback(data);
        })
    }

}
module.exports=supplierBal;