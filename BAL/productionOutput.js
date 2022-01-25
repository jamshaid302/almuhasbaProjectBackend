var productionOutputDal=require("../DAL/productionOutput");
const contractorRateDal = require("../DAL/contractorRate");
const dryDal = require("../DAL/dry");
var productionOutputBal={
    getSimpleProductionOutput:function (callback){
        productionOutputDal.getSimpleProductionOutput(function (data,err){
            callback(data)
        })
    },
    getAllproductionOutput:function (body,callback) {
        productionOutputDal.getAllProductionOutput(body,function (data,err) {
            callback(data);
        });
    },

    getproductionOutputById:function (id,callback) {
        productionOutputDal.getProductionOutputById(id,function (data,err) {
            callback(data);
        });
    },

    getProductionOutputData:function (id,callback) {
        productionOutputDal.getProductionOutputData(id,function (data,err) {
            callback(data);
        });
    },


    allProductionOutputData:function (body,callback) {
        productionOutputDal.allProductionOutputData(body, function (data, err) {
            callback(data);
        })
    },

    getProductionOutputDataToAddDry:function (callback) {
        productionOutputDal.getSimpleProductionOutput(function (data,err) {
            callback(data);
        });

    },

    addproductionOutput:function (body,callback) {
        productionOutputDal.addProductionOutput(body,function (data,err) {
            callback(data);
        })
    },
    updateproductionOutput:function (body,callback) {
        productionOutputDal.updateProductionOutput(body,function (data,err) {
            callback(data);
        })

    },
    deleteproductionOutput:function (id,callback) {
        productionOutputDal.deleteProductionOutput(id,function (data,err) {
            if (data.message == 'success'){
                productionOutputDal.deleteExpenses(id,function (data2,err){
                    callback(data);
                })
            }
        })
    }

}
module.exports=productionOutputBal;