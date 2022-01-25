var contractorDal=require("../DAL/contractor");
const wheatPurityDal = require("../DAL/wheatPurity");
var contractorBal={
    getAllContractor:function (callback) {
        contractorDal.getAllContractor(function (data,err) {
            callback(data);
        });
    },
    getContractorById:function (id,callback) {
        contractorDal.getContractorById(id,function (data,err) {
            callback(data);
        });
    },
    getContractorExpenseByUserSearch:function (body,callback) {
        contractorDal.getContractorExpenseByUserSearch(body,function (data,err) {
            callback(data);
        });
    },
    getContractorDetailById:function (id,callback) {
        contractorDal.getContractorDetailById(id,function (data,err) {
            callback(data);
        });
    },


    addContractor:function (body,callback) {
        contractorDal.addContractor(body,function (data,err) {
            callback(data);
        })
    },
    updateContractor:function (body,callback) {
        contractorDal.updateContractor(body,function (data,err) {
            callback(data);
        })
    },
    deleteContractor:function (id,callback) {
        contractorDal.deleteContractor(id,function (data,err) {
            callback(data);
        })
    },
    ExpensebyId:function (body,callback) {
        contractorDal.ExpensebyId(body,function (data,err) {
            callback(data);
        })
    },
    payContractor:function (paydata,callback) {
        contractorDal.payContractor(paydata,function (data,err) {
            callback(data);
        })
    },
    PaytoContractor:function (paydata,callback) {
        if (parseInt(paydata.connewpaid) > (parseInt(paydata.conamount) - parseInt(paydata.conpaid)) )
        {
            var data={message:"error",data:'amount not be greater than total amount'}
            callback(data);
        }
        contractorDal.PaytoContractor(paydata,function (data,err) {
            callback(data);
        })
    }

}
module.exports=contractorBal;