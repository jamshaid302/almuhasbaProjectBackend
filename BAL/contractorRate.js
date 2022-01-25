var contractorRateDal=require("../DAL/contractorRate");
var contractorRateBal={


    getContractorRateById:function (id,callback) {
        contractorRateDal.getContractorByIdById(id,function (data,err) {
            callback(data);
        });
    },

    getAllContractorRate:function (callback) {
        contractorRateDal.getAllContractorRate(function (data,err) {
            callback(data);
        });
    },

    getContractorRateMultipleId:function (id,callback) {
        contractorRateDal.getContractorRateMultipleId(id,function (data,err) {
            callback(data);
        });
    },
    addContractorRate:function (body,callback) {
        contractorRateDal.addContractorRate(body,function (data,err) {
            callback(data);
        })
    },

    deleteContractorRate:function (id,callback) {
        contractorRateDal.deleteContractorRate(id,function (data,err) {
            callback(data);
        })
    }

}
module.exports=contractorRateBal;