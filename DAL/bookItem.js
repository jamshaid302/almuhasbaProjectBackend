var bookItem=require("../models/bookItem");
var mongoose=require("mongoose");
const stockSum = require("../models/stockSum");
const ObjectId = mongoose.Types.ObjectId;
var bookitemDal={
    getAllBookItem:function (callback) {
        bookItem.find({isActive:true}).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    },
    getBookItemWithDetail:function (id,callback) {
        bookItem.aggregate([
            { $match: { isActive:true,bookId:ObjectId(id)} },
            { $lookup: {
                    from: 'ratelists',
                    localField: 'ratelistId',
                    foreignField: '_id',
                    as: 'ratelistdata'
                }},
            { $unwind : { path: "$ratelistdata", preserveNullAndEmptyArrays: true } },
            {
                $match:  { "ratelistdata.isActive":true }
            },
            { $lookup: {
                    from: 'productitems',
                    localField: 'productId',
                    foreignField: '_id',
                    as: 'itemdata'
                }},
            { $unwind : { path: "$itemdata", preserveNullAndEmptyArrays: true } },
            {
                $match:  { "itemdata.isActive":true }
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
    getBookItemById:function (id,callback) {
        bookItem.find({_id : id,isActive:true}).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    },

    addBookItem:function (body,callback){
        bookItem.insertMany(body).then(function (savedData) {
                var data={message:"success",data:savedData}
                callback(data)
        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);
        })
    }
    ,
    updateBookItem:function (body,callback){
        bookItem.deleteMany({bookId:body.id}).then(function (data1){
            bookItem.insertMany(body.bookitems).then(function (data2){
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



        // bookItem.find({_id : body.productId,isActive:true}).then(function (data) {
        //
        //     var ids=[];
        //     for(var i=0;i<data.length;i++){
        //         ids.push(data[i]._id);
        //     }
        //     bookItem.deleteMany({bookId:body.id}).then(function (data1){
        //         body.bookitems[0].itemId = body.bookitems[0].itemmoizId;
        //         bookItem.insertMany(body.bookitems).then(function (savedData) {
        //             var data={message:"success",data:savedData};
        //             callback(data);
        //         }).catch(function (err) {
        //             var data={message:"error",data:err.message};
        //             callback(data);
        //         });
        //     }).catch(function (err){
        //         var arr={message:"error",data:err.message};
        //         callback(arr);
        //     });
        // }).catch(function (err) {
        //     var arr={message:"error", data:err.message};
        //     callback(arr);
        // });
        // bookItem.updateOne(

        //     {"_id" : body.productId},

        //     {
        //         $set: {
        //             //ratelistId:body.name,
        //             //itemId:body.uom,
        //             qty:parseInt(body.qty),
        //         }
        //     },
        // ).then(function (updateData) {
        //     var data={message:"success",data:updateData}
        //     callback(data)
        // }).catch(function (err) {
        //     var data={message:"error",data:err.message}
        //     callback(data);
        // });

    },

    deleteBookItem:function (id,callback) {

        bookItem.deleteMany(
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

module.exports=bookitemDal;