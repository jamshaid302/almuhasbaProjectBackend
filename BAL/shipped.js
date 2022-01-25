var shippedDal=require("../DAL/shipped");
var bookDal=require("../DAL/book");
var shippedBal={
    getShipped:function (callback) {
        shippedDal.getShipped(function (data,err) {
            callback(data);
        });
    },
    showShipped:function (id,callback) {
        shippedDal.showShipped(id,function (data,err) {
            callback(data);
        });
    },

    detailShipped:function (id,callback) {
        shippedDal.detailShipped(id,function (data,err) {
            callback(data);
        });
    },

    getCheckId:function (id,callback) {
        shippedDal.getCheckId(id,function (data,err) {
            callback(data);
        });
    },
    addShipped:function (body,callback) {
        shippedDal.addShipped(body, function (data2, err) {
                if(data2.message=="success") {
                        bookDal.shippedBook(body,function (data1,err) {
                        callback(data2)
                    })
                }else
                {
                    callback(data2)
                }
        })
    }
    ,
    updateBookItem:function (body,callback) {
        shippedDal.updateBookItem(body,function (data,err) {
            callback(data);
        })
    },
    deleteBookItem:function (id,callback) {
        shippedDal.deleteBookItem(id,function (data,err) {
            callback(data);
        })
    }

}

module.exports=shippedBal;