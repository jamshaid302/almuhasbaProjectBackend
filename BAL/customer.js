var customerDal=require("../DAL/customer");
var customerBal={
    getAllCustomer:function (callback) {
        customerDal.getAllCustomer(function (data,err) {
            callback(data);
        });
    },
    getCustomerWithDetail:function (callback) {
        customerDal.getCustomerWithDetail(function (data,err) {
            callback(data);
        });
    },
    getCustomerById:function (id,callback) {
        customerDal.getCustomerById(id,function (data,err) {
            callback(data);
        });
    },
    addCustomer:function (body,callback) {
        customerDal.addCustomer(body,function (data,err) {
                callback(data)
        })
    }
    ,
    updateCustomer:function (body,callback) {
        customerDal.updateCustomer(body,function (data,err) {
            callback(data);
        })
    },
    deleteCustomer:function (id,callback) {
        customerDal.deleteCustomer(id,function (data,err) {
            callback(data);
        })
    }

}

module.exports=customerBal;