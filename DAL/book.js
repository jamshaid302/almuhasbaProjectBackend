var book=require("../models/book");
var bookItem=require("../models/bookItem");
var mongoose=require("mongoose");
const purchaseOrder = require("../models/purchaseOrder");
const stock = require("../models/stock");
var stockSum = require("../models/stockSum");
const packing = require("../models/packing");
const category = require("../models/category");
const ObjectId = mongoose.Types.ObjectId;
var bookDal={
    getAllBook:function (callback) {
        book.find({isActive:true}).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    },

    searchProduct:function (search,callback) {
        // stock.aggregate([
        //     {
        //         $match: { $text: { $search: search } }
        //     },
        //     { $limit : 10 },
        //     { $project: { productItem: 1,productItemId:1, _id: 1,productItems: 1, } }
        // ]).then(function (data) {
        //
        //     var arr={message:"success",data:data}
        //     callback(arr);
        // }).catch(function (err) {
        //     var arr={message:"error",data:err}
        //     callback(arr);
        // })

        stockSum.aggregate([
            {
                $match: {
                    $or: [
                        {productItem :  { $regex: '.*' + search + '.*' }}    ,
                    ]
                }
            },{$limit: 10},
            {$project: {
                productItem: 1, packingsize:1,qty:1,subcategory:1,
                    category:1, _id: 1, productItemId:1,salestoreId:1}
            }

            // { $match: { $text: { $search: search } }},
            // {productItem :  { $regex: '.*' + search + '.*' }}    ,
            // {$limit: 10},
            // {$project: {productItem: 1, _id: 1,}}

    ]).then(function (data) {

            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err}
            callback(arr);
        })

    },

    getBookWithDetail:function (callback) {
        book.aggregate([
            { $match: { isActive:true, isShipped:false} },
            { $lookup: {
                    from: 'customers',
                    localField: 'customerId',
                    foreignField: '_id',
                    as: 'customerdata'
                }},
            { $unwind : { path: "$customerdata", preserveNullAndEmptyArrays: true } },
            {
                $match:  { "customerdata.isActive":true }
            },
            { $lookup: {
                    from: 'saleofficers',
                    localField: 'saleOfficerId',
                    foreignField: '_id',
                    as: 'saleofficerdata'
                }},
            { $unwind : { path: "$saleofficerdata", preserveNullAndEmptyArrays: true } },
            {
                $match:  { "saleofficerdata.isActive":true }
            },
            { $lookup: {
                    from: 'payments',
                    localField: 'paymentId',
                    foreignField: '_id',
                    as: 'paymentdata'
                }},
            { $unwind : { path: "$paymentdata", preserveNullAndEmptyArrays: true } },
            {
                $match:  { "paymentdata.isActive":true }
            },
            { $lookup: {
                    from: 'bookitems',
                    localField: '_id',
                    foreignField: 'bookId',
                    as: 'itemsdata'
                }},
            {
                $match:  { "itemsdata.isActive":true }
            },
        ]).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    }
    ,
    getBookById:function (id,callback) {
        book.aggregate([
            { $match: { _id:ObjectId(id)} },
            {
                $lookup:{
                    from:"bookitems",
                    let:{bookId:"$_id"},
                    pipeline:[{$match: { $expr: { $eq: ["$bookId", "$$bookId"] }}},
                        {
                            $lookup:{
                                from:"stocksums",
                                let:{productId:"$productId"},
                                pipeline:[{$match: { $expr: { $eq: ["$productItemId", "$$productId"] }}},

                                ],
                                as:"stocksum"
                            }
                        },
                        { $unwind : { path: "$stocksum", preserveNullAndEmptyArrays: true } },
                    ],
                    as:"bookData",
                },

            },








        ]).then(function (data1){
            var data={message:"success",data:data1}
            callback(data)
        }).catch(function (err){
            var data={message:"error",data:err.message}
            callback(data);
        })
        // book.aggregate([
        //     { $match: { isActive:true,_id:ObjectId(id)} },
        //     { $lookup: {
        //             from: 'bookitems',
        //             localField: '_id',
        //             foreignField: 'bookId',
        //             as: 'itemsdata'
        //         }},
        //     {
        //         $match:  { "itemsdata.isActive":true }
        //     },
        // ]).then(function (data) {
        //     var arr={message:"success",data:data}
        //     callback(arr);
        // }).catch(function (err) {
        //     var arr={message:"error",data:err.message}
        //     callback(arr);
        // })
    },

    addBook:function (body,callback){
        var bookObj = new book({
            date:body.date,
            bookNo:body.bookingnumber,
            customerId:body.customer,
            saleOfficerId:body.saleofficer,
            paymentId:body.payment,
            destination:body.destination,
            area:body.area,
            // type:body.type,
            // category:body.category,
            checkNo : body.checkNo
            //bookAmount:body.totalamount
        });
        bookObj.save().then(function (savedData) {
            var data={message:"success",data:savedData}
            callback(data);
        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);

        })
    }
    ,
    updateBook:function (body,callback){
        book.updateOne(
            {"_id":body.id},
            {
                $set: {
                    date:body.date,
                    bookNo:body.bookingnumber,
                    customerId:body.customer,
                    saleOfficerId:body.saleofficer,
                    paymentId:body.payment,
                    destination:body.destination,
                    area:body.area,
                    // type:body.type,
                    // category:body.category,
                    checkNo : body.checkNo
                    //bookAmount:body.totalamount
                }
            },
        ).then(function (updateData) {
            var data={message:"success",data:updateData}
            callback(data)
        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);
        });
    }
    ,
    deleteBook:function (id,callback) {
        book.deleteOne(
            { "_id" : id.id},

        ).then(function (delData) {
            var data={message:"success",data:delData}
            callback(data)
        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);
        });
    },


    shippedBook:function (body,callback) {

        book.updateOne(
            {_id:body.bookId},
            {
                $set: {
                    isShipped : true
                }
            },
        ).then(function (updateDate) {
            var data={message:"success",data:updateDate}
            callback(data)
        }).catch(function (err) {
            var data={message:"error",data:err}
            callback(data);
        })

    }


}





module.exports=bookDal;