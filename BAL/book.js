var bookDal=require("../DAL/book"); 
var bookItemDal=require("../DAL/bookItem");
var checkDal=require("../DAL/check");
const purchaseOrderDal = require("../DAL/purchaseOrder");
var stockSum = require("../models/stockSum");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
var bookBal={
    getAllBook:function (callback) {
        bookDal.getAllBook(function (data,err) {
            callback(data);
        });
    },
    getBookWithDetail:function (callback) {
        bookDal.getBookWithDetail(function (data,err) {
            callback(data);
        });
    },
    getBookById:function (id,callback) {
        bookDal.getBookById(id,function (data,err) {
            callback(data);
        });
    },
    addBook:function (body,callback) {
        body.newBookItems = JSON.parse(body.pushTable);
        bookDal.addBook(body,function (data1,err) {
            if(data1.message=="success"){
                for(var i=0;i<body.bookitems.length;i++){
                    body.newBookItems[i].bookId = data1.data._id.toString();
                    body.newBookItems[i].prdprice = body.prdprice[i];
                    body.newBookItems[i].prdqty = body.prdqty[i];
                }

                bookItemDal.addBookItem(body.newBookItems,function (data2,err){
                    ///////
                    var mastiyan =  parseInt(body.newBookItems[0].packingsize) ;
                        if(data2.message=="success"){
                            var arr=[];
                            for (let j=0; j<body.newBookItems.length; j++)
                            {
                                arr.push(updatePromise({
                                    packingsize: parseInt(body.newBookItems[j].packingsize),
                                    productItem: body.newBookItems[j].productName,
                                    subcategory: body.newBookItems[j].subcategory,
                                    category: body.newBookItems[j].category,
                                    totalquantity: body.newBookItems[j].totalquantity,
                                    prdqty: body.newBookItems[j].prdqty,
                                }))
                            }
                            Promise.all(arr).then(function (data3){
                                var data = {message: "success", data: data3}
                                callback(data);
                            }).catch(function (err){
                                var data = {message: "error", data: err.message}
                                callback(data);
                            })
                        }
                        else{
                            // callback(data);
                        }
                    ///////

                    // callback(data2);
                })
            }
            else{
                callback(data1)
            }
        }).catch(function (err){
            console.log(err.message)
        })
    },
    searchProduct:function (search,callback) {
        bookDal.searchProduct(search,function (data,err) {
            callback(data);
        })
    },


    updateBook:function (body,callback) {
        body.newBookItems = JSON.parse(body.pushTable);
        for(var i=0;i<body.bookitems.length;i++){
            // body.bookitems[i].bookId = body.id;
            body.newBookItems[i].prdprice = body.prdprice[i];
            body.newBookItems[i].prdqty = body.prdqty[i];
            body.newBookItems[i].productId = body.bookitems[i].productId;
            body.newBookItems[i].bookId = body.bookitems[i].bookId;
        }
        bookItemDal.updateBookItem(body,function (data,err){
            if(data.message=="success"){
                bookDal.updateBook(body,function (data2,err) {
                    // callback(data1);

                    if(data2.message=="success"){
                        var arr=[];
                        for (let j=0; j<body.newBookItems.length; j++)
                        {
                            arr.push(updatePromise({
                                packingsize: parseInt(body.newBookItems[j].packingsize),
                                productItem: body.newBookItems[j].productName,
                                subcategory: body.newBookItems[j].subcategory,
                                category: body.newBookItems[j].category,
                                totalquantity: body.newBookItems[j].totalquantity,
                                prdqty: body.newBookItems[j].prdqty,
                            }))
                        }
                        Promise.all(arr).then(function (data3){
                            var data = {message: "success", data: data3}
                            callback(data);
                        }).catch(function (err){
                            var data = {message: "error", data: err.message}
                            callback(data);
                        })
                    }
                    else{
                        // callback(data);
                    }

                });
            }
            else{
                callback(data);
            }
        });

        // bookDal.updateBook(body,function (data1,err) {
        //     if(data1.message=="success"){

        //         for(var i=0;i<body.bookitems.length;i++){
        //             body.bookitems[i].bookId = data1.data.id;
        //         }

        //         bookItemDal.updateBookItem(body,function (data2,err){
        //             callback(data2);
        //         })
        //     }
        //     else{
        //         callback(data1);
        //     }
        // });

    },
    deleteBook:function (id,callback) {
        checkDal.deletecheck(id,function (data,err){
            if(data.message=="success") {
        ///////
        bookItemDal.deleteBookItem(id,function (data,err){
            if(data.message=="success"){
                bookDal.deleteBook(id,function (data1,err) {
                    callback(data1);
                })
            }
            else{
                callback(data);
            }
        })
        ///////
            }else {
                callback(data);
            }
        })


    }


}

function updatePromise(data){
    return new Promise((resolve,reject)=>{
        stockSum.updateOne({
                packingsize: parseInt(data.packingsize),
                productItem: data.productItem,
                subcategory: data.subcategory,
                category: data.category,
                // packingsize: 1,productItem: "basmati rice",
                // subcategory: "54A",category: "Wheat"
            },
            {
                $set: {
                    qty: parseInt(data.totalquantity) - parseInt(data.prdqty),
                }
            }).then(function (savedData33) {
            resolve(savedData33);
        }).catch(function (err) {
            var data = {message: "error", data: err.message}
            reject(err);
        })
    })
}

module.exports=bookBal;
