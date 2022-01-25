var checkDal=require("../DAL/check");
var checkBal={
    getAllBookItem:function (callback) {
        checkDal.getAllBookItem(function (data,err) {
            callback(data);
        });
    },
    getBookItemWithDetail:function (id,callback) {
        checkDal.getBookItemWithDetail(id,function (data,err) {
            callback(data);
        });
    },
    getCheckId:function (id,callback) {
        checkDal.getCheckId(id,function (data,err) {
            callback(data);
        });
    },
    addcheck:function (body,callback) {
        checkDal.addcheck(body,function (data,err) {
            callback(data)
        })
    }
    ,
    updateBookItem:function (body,callback) {
        checkDal.updateBookItem(body,function (data,err) {
            callback(data);
        })
    },
    deleteBookItem:function (id,callback) {
        checkDal.deleteBookItem(id,function (data,err) {
            callback(data);
        })
    }

}

module.exports=checkBal;