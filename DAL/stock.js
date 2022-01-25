var stock=require("../models/stock");
var packing=require("../models/packing");
var stockSum = require("../models/stockSum");
var mongoose=require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
var stockDal={
    getAllStock:function (callback) {
        stock.aggregate([
            { $match: { isActive:true} },
            {
                $lookup:
                    {
                        from: 'salestores',
                        localField: 'salestoreId',
                        foreignField: '_id',
                        as: 'AsSaleStore'
                    }
            },
            { $unwind : { path: "$AsSaleStore", preserveNullAndEmptyArrays: true } },
            { $match: { 'AsSaleStore.isActive':true} },

            {
                $group:
                    {
                        "_id": {
                                "category": "$category",
                                "subcategory": "$subcategory",
                                "productItem": '$productItem',
                                "packingsize": '$packingsize',
                                'AsSaleStore' : '$AsSaleStore',
                                // 'AsStocks' : '$AsStocks'
                        },
                        totalqty: {$sum: '$qty'},
                        "productItemId": { "$first": "$productItemId" },
                        "salestoreId": { "$first": "$salestoreId" },

                    },
            },
            {
                $project:{
                    category : '$_id.category',
                    subcategory :'$_id.subcategory',
                    productItem : '$_id.productItem',
                    packingsize : '$_id.packingsize',
                    AsSaleStoreName : '$_id.AsSaleStore.name',
                    totalqty : 1,
                    _id:1,

                    productItemId : 1,
                    salestoreId : 1

                }
    },

        ]).then(function (data){
            var arr = {message: "success", data: data}
            callback(arr);
        }).catch(function (err){
            var arr = {message: "error", data: err.message}
            callback(arr);
        })


    },

    getAllStockSum:function (callback) {

        stockSum.aggregate([
            {
                $lookup:
                    {
                        from: "salestores",
                        localField: "salestoreId",
                        foreignField: "_id",
                        as: "AsStoreList"
                    }
            },
            {
                $project:
                    {
                        packingsize: 1,
                        productItem: 1,
                        qty:1,
                        subcategory:1,
                        category:1,
                        productItemId:1,
                        salestoreId:1,
                        storeName :
                            {
                                $first: "$AsStoreList.name"
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

    getStockWithDetail:function (callback) {
        stock.aggregate([
            { $match: { isActive:true} },
            { $lookup: {
                    from: 'salestores',
                    localField: 'salestoreId',
                    foreignField: '_id',
                    as: 'storedata'
                }},
            { $unwind : { path: "$storedata", preserveNullAndEmptyArrays: true } },
            {
                $match:  { "storedata.isActive":true }
            },
            { $lookup: {
                    from: 'packingsizes',
                    localField: 'packingsizeId',
                    foreignField: '_id',
                    as: 'packingsizedata'
                }},
            { $unwind : { path: "$packingsizedata", preserveNullAndEmptyArrays: true } },
            {
                $match:  { "packingsizedata.isActive":true }
            },
            { $lookup: {
                    from: 'productitems',
                    localField: 'productItemId',
                    foreignField: '_id',
                    as: 'productdata'
                }},
            { $unwind : { path: "$productdata", preserveNullAndEmptyArrays: true } },
            {
                $match:  { "productdata.isActive":true }
            }
        ]).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    }
    ,



    getStockById:function (id,callback) {
        stock.find({_id : id,isActive:true}).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    },

    addStock:function (body,callback){
        var saleStoreObj = new stock({
            salestoreId:body.salestoreId,
            packingsize:body.packingsize,
            productItem:body.productItem,
            productItemId : body.productItemID,
            qty:parseInt(body.qty),
            subcategory:body.subcategory,
            category:body.category,
            productItemId : body.productItemId,

        });
        saleStoreObj.save().then(function (savedData) {

           stockSum.find({
               packingsize:body.packingsize,
               productItem:body.productItem,
               subcategory:body.subcategory,
               category:body.category,
               salestoreId:body.salestoreId,
               productItemId : body.productItemId,
           }).then(function(docs) {
               var saveDocs = docs;
               if (docs.length == 0){
                       var stockSumObj = new stockSum({
                           packingsize:body.packingsize,
                           productItem:body.productItem,
                           qty:parseInt(body.qty),
                           subcategory:body.subcategory,
                           category:body.category,
                           salestoreId:body.salestoreId,
                           productItemId : body.productItemId,
                       });
                        stockSumObj.save().then(function (stockSumData) {
                            var saveInsertData = stockSumData;
                       })
               }else {
                     var getQty = docs[0]._doc.qty;
                     var storeQty = parseInt(getQty) + parseInt(body.qty);

                        stockSum.update({
                           packingsize:body.packingsize,
                           productItem:body.productItem,
                           subcategory:body.subcategory,
                           category:body.category,
                           salestoreId:body.salestoreId,
                           productItemId : body.productItemId,
                        },
                       {
                           $set: {
                               qty: storeQty,
                           }
                        }).then(function(Updocs) {
                            var sucessDone = Updocs;
                        }).catch(function(err) {

                        });

               }


               var lenDocs = saveDocs.length;
           }, function(err) {

           });

            var data={message:"success",data:savedData};
            callback(data);
        }).catch(function (err) {
            var data={message:"error",data:err.message};
            callback(data);

        })
    }
    ,

    updateQtyStock:function (body,callback){


        console.log(body.id);
        var saleStoreObj = new stock({
            salestoreId:body.salestoreId,
            packingsize:body.packingsize,
            productItem:body.productItem,
            productItemId : body.productItemId,
            qty: parseInt(body.newqty),
            subcategory:body.subcategory,
            category:body.category,

        });
        saleStoreObj.save().then(function (savedData) {
            var data={message:"success",data:savedData}
            callback(data)
        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);

        })


    }
    ,

    detailQtyStock:function (body,callback){

        stock.aggregate([
            {
                $match: {
                    $and: [
                        {
                            category: body.category
                        },
                        {
                            subcategory: body.subcategory
                        },
                        {
                            productItem: body.productItem
                        },
                        {
                            packingsize: parseInt( body.packingsize )
                        }
                    ]
                }
            },
            {
                $lookup: {
                    from: "salestores",
                    localField: "salestoreId",
                    foreignField: "_id",
                    as: "AsSaleStore"
                }
            },
            {
                $project: {
                    category: 1,
                    subcategory: 1,
                    qty: 1,
                    productItem: 1,
                    packingsize: 1,
                    storeName: {
                        $first: "$AsSaleStore.name"
                    }
                }
            }
        ]).then(function (savedData) {
            var data={message:"success",data:savedData}
            callback(data)
        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);

        })

    },


    updateStock:function (body,callback){
        stock.updateOne(
            {"_id":body.id},
            {
                $set: {
                    salestoreId:body.salestoreId,
                    packingsizeId:body.packingsizeId,
                    qty:body.qty
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
    deleteStock:function (id,callback) {
        stock.updateOne(
            { "_id" : id.id},
            { $set: {
                    isActive:false
                } },
        ).then(function (updateDate) {
            var data={message:"success",data:updateDate}
            callback(data)
        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);
        });
    }
}

module.exports=stockDal;