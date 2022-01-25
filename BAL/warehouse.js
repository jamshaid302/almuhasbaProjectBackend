var warehouseDal=require("../DAL/warehouse");
var warehouseBal={

    getStoreWarehouse:function (callback) {
    warehouseDal.getStoreWarehouse(function (data,err) {
        callback(data);
    });
    },
    getAllWarehouse:function (callback) {
        warehouseDal.getAllWarehouse(function (data,err) {
            callback(data);
        });
    },
    getWarehouseById:function (id,callback) {
        warehouseDal.getWarehouseById(id,function (data,err) {
            callback(data);
        });
    },

    addWarehouse:function (body,callback) {
        warehouseDal.addWarehouse(body,function (data,err) {
            callback(data);
        })
    },
    updateWarehouse:function (body,callback) {
        warehouseDal.updateWarehouse(body,function (data,err) {
            callback(data);
        })
    },
    deleteWarehouse:function (id,callback) {
        warehouseDal.deleteWarehouse(id,function (data,err) {
            callback(data);
        })
    }

}
module.exports=warehouseBal;