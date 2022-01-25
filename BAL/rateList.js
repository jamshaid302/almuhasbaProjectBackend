var ratelistDal=require("../DAL/rateList");
var ratelistBal={
    getAllRateList:function (callback) {
        ratelistDal.getAllRateList(function (data,err) {
            callback(data);
        });
    },
    getRateListWithDetail:function (callback) {
        ratelistDal.getRateListWithDetail(function (data,err) {
            callback(data);
        });
    },
    getRateListById:function (id,callback) {
        ratelistDal.getRateListById(id,function (data,err) {
            callback(data);
        });
    },
    addRateList:function (body,callback) {
        ratelistDal.addRateList(body,function (data,err) {
            callback(data)
        })
    }
    ,
    updateRateList:function (body,callback) {
        ratelistDal.updateRateList(body,function (data,err) {
            callback(data);
        })
    },
    deleteRateList:function (id,callback) {
        ratelistDal.deleteRateList(id,function (data,err) {
            callback(data);
        })
    }

}

module.exports=ratelistBal;