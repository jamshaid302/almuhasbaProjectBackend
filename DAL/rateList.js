var ratelist=require("../models/rateList");
var mongoose=require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
var ratelistDal={
    getAllRateList:function (callback) {
        ratelist.find({isActive:true}).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    },
    getRateListWithDetail:function (callback) {
        ratelist.aggregate([
            { $match: { isActive:true} },
            { $lookup: {
                    from: 'categories',
                    localField: 'category',
                    foreignField: '_id',
                    as: 'categoryData'
                }},
            { $unwind : { path: "$categoryData", preserveNullAndEmptyArrays: true } },
            {
                $match:  { "categoryData.isActive":true }
            },
            { $lookup: {
                    from: 'categories',
                    localField: 'subcategory',
                    foreignField: '_id',
                    as: 'subcategoryData'
                }},
            { $unwind : { path: "$subcategoryData", preserveNullAndEmptyArrays: true } },
            {
                $match:  { "subcategoryData.isActive":true }
            },
            { $lookup: {
                    from: 'packingsizes',
                    localField: 'packingsize',
                    foreignField: '_id',
                    as: 'packingData'
                }},
            { $unwind : { path: "$packingData", preserveNullAndEmptyArrays: true } },
            {
                $match:  { "packingData.isActive":true }
            },

            { $lookup: {
                    from: 'discounts',
                    localField: 'discount',
                    foreignField: '_id',
                    as: 'discountData'
                }},
            { $unwind : { path: "$discountData", preserveNullAndEmptyArrays: true } },
            {
                $match:  { "discountData.isActive":true }
            },


            {
                $project:{
                    subcategory:'$subcategoryData.name',
                    subcategoryId:'$subcategoryData._id',
                    category:'$categoryData.name',
                    categoryId:'$categoryData._id',
                    packing:'$packingData.size',
                    packingId:'$packingData._id',
                    discount:'$discountData.amount',
                    discountId:'$discountData._id',
                    name:1,
                    rate:1,
                    _id:1
                }
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
    getRateListById:function (id,callback) {
        ratelist.find({_id : id,isActive:true}).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    },

    addRateList:function (body,callback){
        var ratelistObj = new ratelist({
            name:body.name,
            category:body.category,
            subcategory:body.subcategory,
            packingsize:body.packingsize,
            discount:body.discount,
            rate:body.rate,
            isActive:body.isActive,
        });
        ratelistObj.save().then(function (savedData) {
            var data={message:"success",data:savedData}
            callback(data)
        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);

        })
    }
    ,
    updateRateList:function (body,callback){
        ratelist.updateOne(
            {"_id":body.id},
            {
                $set: {
                    name:body.name,
                    category:body.category,
                    subcategory:body.subcategory,
                    packingsize:body.packingsize,
                    discount:body.discount,
                    rate:body.rate,
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
    deleteRateList:function (id,callback) {
        ratelist.updateOne(
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

module.exports=ratelistDal;