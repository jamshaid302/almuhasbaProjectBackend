var wheatPurityDal=require("../DAL/wheatPurity");
var wheatPurityBal={
    getAllwheatPurity:function (body,callback) {
        wheatPurityDal.getAllWheatPurity(body,function (data,err) {
            callback(data);
        });
    },

    getWheatPurityByUserSearch:function (body,callback) {
        wheatPurityDal.getWheatPurityByUserSearch(body,function (data,err) {
            callback(data);
        });
    },

    getwheatPurityById:function (id,callback) {
        wheatPurityDal.getWheatPurityById(id,function (data,err) {
            callback(data);
        });
    },

    addwheatPurity:function (body,callback) {
        wheatPurityDal.addWheatPurity(body,function (data,err) {
            callback(data);
        })
    },
    updatewheatPurity:function (body,callback) {
        wheatPurityDal.updateWheatPurity(body,function (data,err) {
            callback(data);
        })
    },
    deletewheatPurity:function (id,callback) {
        wheatPurityDal.deleteWheatPurity(id,function (data,err) {
            callback(data);
        })
    }

}
module.exports=wheatPurityBal;