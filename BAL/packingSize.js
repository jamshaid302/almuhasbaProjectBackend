var packingSizeDal=require("../DAL/packingSize");
var packingSizeBal={
    getAllPackingSize:function (callback) {
        packingSizeDal.getAllPackingSize(function (data,err) {
            callback(data);
        });
    },
    getPackingSizeById:function (id,callback) {
        packingSizeDal.getPackingSizeById(id,function (data,err) {
            callback(data);
        });
    },
    addPackingSize:function (body,callback) {
        packingSizeDal.addPackingSize(body,function (data,err) {
            callback(data);
        })
    }
    ,
    updatePackingSize:function (body,callback) {
        packingSizeDal.updatePackingSize(body,function (data,err) {
            callback(data);
        })
    },
    deletePackingSize:function (id,callback) {
        packingSizeDal.deletePackingSize(id,function (data,err) {
            callback(data);
        })
    }

}

module.exports=packingSizeBal;