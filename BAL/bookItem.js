var bookitemDal=require("../DAL/bookItem");
var bookitemBal={
    getAllBookItem:function (callback) {
        bookitemDal.getAllBookItem(function (data,err) {
            callback(data);
        });
    },
    getBookItemWithDetail:function (id,callback) {
        bookitemDal.getBookItemWithDetail(id,function (data,err) {
            callback(data);
        });
    },
    getBookItemById:function (id,callback) {
        bookitemDal.getBookItemById(id,function (data,err) {
            callback(data);
        });
    },
    addBookItem:function (body,callback) {
        bookitemDal.addBookItem(body,function (data,err) {
            callback(data)
        })
    }
    ,
    updateBookItem:function (body,callback) {
        bookitemDal.updateBookItem(body,function (data,err) {
            callback(data);
        })
    },
    deleteBookItem:function (id,callback) {
        bookitemDal.deleteBookItem(id,function (data,err) {
            callback(data);
        })
    }

}

module.exports=bookitemBal;