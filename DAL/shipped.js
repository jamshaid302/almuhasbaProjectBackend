var shipped=require("../models/shipped");
var mongoose=require("mongoose");
const bookItem = require("../models/bookItem");
const book = require("../models/book");
const ObjectId = mongoose.Types.ObjectId;
var shippedDal={
    getShipped:function (callback) {
        book.aggregate([
            { $match: { $and: [{isActive: true}, {isShipped: true} ] } },
            // { $match: { isActive:true, isShipped:true} },
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
    },

    showShipped:function (id,callback) {

        shipped.find({bookId : id.bookId,isActive:true}).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })

    },

    detailShipped:function (id,callback) {

        shipped.aggregate([
            {$match: {$and: [{bookId : ObjectId(id.bookId)}] }},
            // {$match: {$and: [{bookId : id.bookId}] }},
            {
                $lookup:
                    {
                        from: "ratelists",
                        localField: "rateList",
                        foreignField: "_id",
                        as: "AsRateList"

                    }
            },
            {
                $project:
                    {
                        amount: 1,
                        bookId: 1,
                        listName :
                            {
                                $first: "$AsRateList.name"
                            }

                    }
            }
        ]).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })

    },

    addShipped:function (body,callback){

        shipped.deleteMany({bookId:body.bookId}).then(function (data1) {

            var shippedObj = new shipped({
                bookId: body.bookId,
                rateList: body.rateList,
                amount: body.amount,
            });
            shippedObj.save().then(function (savedData) {
                var data = {message: "success", data: savedData}
                callback(data);
            }).catch(function (err) {
                var data = {message: "error", data: err.message}
                callback(data);

            })

        }).catch(function (err) {
            var data = {message: "error", data: err.message}
            callback(data);

        })

    }
    ,
    updatecheck:function (body,callback){
        shipped.deleteMany({bookId:body.id}).then(function (data1){
            shipped.insertMany(body.bookitems).then(function (data2){
                var data={message:"success",data:data2};
                callback(data);
            }).catch(function (err){
                var arr={message:"error", data:err.message};
                callback(arr);
            })
        }).catch(function (err){
            var arr={message:"error", data:err.message};
            callback(arr);
        })

    },

    deletecheck:function (id,callback) {

        shipped.deleteMany(
            { "bookId" : id.id},

        ).then(function (delData) {
            var data={message:"success",data:delData}
            callback(data)
        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);
        });
    }
}

module.exports=shippedDal;