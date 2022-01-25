var farmAddressDal=require("../DAL/farmAddress");
const contractorDal = require("../DAL/contractor");
var farmAddressBal={

    getFarmGroup:function (callback) {
    farmAddressDal.getFarmGroup(function (data,err) {
        callback(data);
    });
},
    getAllFarmAddress:function (callback) {
        farmAddressDal.getAllFarmAddress(function (data,err) {
            callback(data);
        });
    },

    getFarmsExpensesByUserSearch:function (body,callback) {
        farmAddressDal.getFarmsExpensesByUserSearch(body,function (data,err) {
            callback(data);
        });
    },

    getFarmAddressById:function (id,callback) {
        farmAddressDal.getFarmAddressById(function (data,err) {
            callback(data);
        });
    },


    addFarmAddress:function (body,callback) {
        farmAddressDal.addFarmAddress(body,function (data,err) {
            callback(data);
        })
    },
    updateFarmAddress:function (body,callback) {
        farmAddressDal.updateFarmAddress(body,function (data,err) {
            callback(data);
        })
    },
    deleteFarmAddress:function (id,callback) {
        farmAddressDal.deleteFarmAddress(id,function (data,err) {
            callback(data);
        })
    }

}
module.exports=farmAddressBal;