var paymentDal=require("../DAL/payment");
var paymentBal={
    getAllPayment:function (callback) {
        paymentDal.getAllPayment(function (data,err) {
            callback(data);
        });
    },
    getPaymentWithDetail:function (callback) {
        paymentDal.getPaymentWithDetail(function (data,err) {
            callback(data);
        });
    },
    getPaymentById:function (id,callback) {
        paymentDal.getPaymentById(id,function (data,err) {
            callback(data);
        });
    },
    addPayment:function (body,callback) {
        paymentDal.addPayment(body,function (data,err) {
            callback(data)
        })
    }
    ,
    updatePayment:function (body,callback) {
        paymentDal.updatePayment(body,function (data,err) {
            callback(data);
        })
    },
    deletePayment:function (id,callback) {
        paymentDal.deletePayment(id,function (data,err) {
            callback(data);
        })
    }

}

module.exports=paymentBal;