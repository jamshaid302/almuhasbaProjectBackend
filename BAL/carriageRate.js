var carriageRateDal=require("../DAL/carriageRate");
var carriageRateBal={

    addCarriageRate:function (body,callback) {
        carriageRateDal.addCarriageRate(body,function (data,err) {
            callback(data);
        })
    },

    deleteCarriageRate:function (id,callback) {
        carriageRateDal.deleteCarriageRate(id,function (data,err) {
            callback(data);
        })
    }

}
module.exports=carriageRateBal;