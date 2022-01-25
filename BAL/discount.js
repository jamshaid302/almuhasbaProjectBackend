var discountDal=require("../DAL/discount");
var discountBal={
    getDiscount:function (callback) {
        discountDal.getAllDiscountList(function (data,err) {
            callback(data);
        });
    },
    getDiscountById:function (id,callback) {
        discountDal.getDiscountById(id,function (data,err) {
            callback(data);
        });
    },
    addDiscount:function (body,callback) {
        discountDal.addDiscount(body,function (data,err) {
            callback(data)
        })
    }
    ,
    updateDiscount:function (body,callback) {
        discountDal.updateDiscount(body,function (data,err) {
            callback(data);
        })
    },
    deleteDiscount:function (id,callback) {
        discountDal.deleteDiscount(id,function (data,err) {
            callback(data);
        })
    }

}

module.exports=discountBal;