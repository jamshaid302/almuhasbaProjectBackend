var cottonBudTestDal=require("../DAL/cottonBudTest");
const wheatPurityDal = require("../DAL/wheatPurity");
var cottonBudTestBal={
    getAllCottonBudTest:function (body,callback) {
        cottonBudTestDal.getAllCottonBudTest(body,function (data,err) {
            callback(data);
        });
    },
    getCottonBudTestById:function (id,callback) {
        cottonBudTestDal.getCottonBudTestById(id,function (data,err) {
            callback(data);
        });
    },

    getCottonBudTestByUserSearch:function (body,callback) {
        cottonBudTestDal.getCottonBudTestByUserSearch(body,function (data,err) {
            callback(data);
        });
    },

    addCottonBudTest:function (body,callback) {
        cottonBudTestDal.addCottonBudTest(body,function (data,err) {
            callback(data);
        })
    },
    updateCottonBudTest:function (body,callback) {
        cottonBudTestDal.updateCottonBudTest(body,function (data,err) {
            callback(data);
        })
    },
    deleteCottonBudTest:function (id,callback) {
        cottonBudTestDal.deleteCottonBudTest(id,function (data,err) {
            callback(data);
        })
    }

}
module.exports=cottonBudTestBal;