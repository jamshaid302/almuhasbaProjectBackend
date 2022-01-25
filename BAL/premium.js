var premiumDal=require("../DAL/premium");
var premiumBal={
    getAllPremium:function (callback) {
        premiumDal.getAllPremium(function (data,err) {
            callback(data);
        });
    },
    getPremiumById:function (id,callback) {
        premiumDal.getPremiumById(function (data,err) {
            callback(data);
        });
    },


    addPremium:function (body,callback) {
        premiumDal.addPremium(body,function (data,err) {
            callback(data);
        })
    },
    updatePremium:function (body,callback) {
        premiumDal.updatePremium(body,function (data,err) {
            callback(data);
        })
    },
    deletePremium:function (id,callback) {
        premiumDal.deletePremium(id,function (data,err) {
            callback(data);
        })
    }

}
module.exports=premiumBal;