var saleofficerDal=require("../DAL/saleOfficer");
var saleofficerBal={
    getAllSaleOfficer:function (callback) {
        saleofficerDal.getAllSaleOfficer(function (data,err) {
            callback(data);
        });
    },
    getSaleOfficerWithDetail:function (callback) {
        saleofficerDal.getSaleOfficerWithDetail(function (data,err) {
            callback(data);
        });
    },
    getSaleOfficerById:function (id,callback) {
        saleofficerDal.getSaleOfficerById(id,function (data,err) {
            callback(data);
        });
    },
    addSaleOfficer:function (body,callback) {
        saleofficerDal.addSaleOfficer(body,function (data,err) {
            callback(data)
        })
    }
    ,
    updateSaleOfficer:function (body,callback) {
        saleofficerDal.updateSaleOfficer(body,function (data,err) {
            callback(data);
        })
    },
    deleteSaleOfficer:function (id,callback) {
        saleofficerDal.deleteSaleOfficer(id,function (data,err) {
            callback(data);
        })
    }

}

module.exports=saleofficerBal;