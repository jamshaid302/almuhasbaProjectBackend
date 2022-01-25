var category=require("../models/category");
var db=require("../utility/conn");
var mongoose=require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
var categoryDal={
    categorySubcategory:function (callback) {
        category.aggregate([
            { $match: {
                categoryId: null
            }},
            {
                $graphLookup: {
                    from: "categories",
                    startWith: "$_id",
                    connectFromField: "_id",
                    connectToField: "categoryId",
                    maxDepth: 0,
                    as: "subcategories",
                    restrictSearchWithMatch: { "isActive" : true }
                }
            },
        ]).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err}
            callback(arr);
        });
    },
    categorySubcategoryUnwind:function (callback) {
        category.aggregate([
            { $match: {
                categoryId: null
            }},
            {
                $graphLookup: {
                    from: "categories",
                    startWith: "$_id",
                    connectFromField: "_id",
                    connectToField: "categoryId",
                    maxDepth: 0,
                    as: "subcategories",
                    restrictSearchWithMatch: { "isActive" : true }
                }
            },
            { $unwind : { path: "$subcategories", preserveNullAndEmptyArrays: true } }
        ]).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err}
            callback(arr);
        });
    },
    getAllCategory:function (callback) {
        category.find({isActive:true, categoryId: { $exists: false } }).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err}
            callback(arr);
        });
    },
    getCategoryById:function (id,callback) {
        category.aggregate([
            { $match : { _id : ObjectId(id) } },
            {
                $graphLookup: {
                    from: "categories",
                    startWith: "$_id",
                    connectFromField: "_id",
                    connectToField: "categoryId",
                    maxDepth: 0,
                    as: "subcategories"
                }
            }
        ]).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err}
            callback(arr);
        });
    },
    addCategory:function (body,callback) {
        var cat=new category();
        if(body.categoryId==undefined){
            cat.name=body.name;
        }else {
            cat.name=body.name;
            cat.categoryId=ObjectId(body.categoryId)
        }

        cat.save().then(function (savedData) {
            var data={message:"success",data:savedData}
            callback(data)

        }).catch(function (err) {
            var data={message:"error",data:err}
            callback(data);

        })
    },
    updateCategory:function (body,callback) {
        category.update({_id:body.id},{
            name:body.name,
            categoryId:body.categoryId
        }).then(function (updateDate) {
            var data={message:"success",data:updateDate}
            callback(data)
        }).catch(function (err) {
            var data={message:"error",data:err}
            callback(data);
        })
    },
    deleteCategory:function (id,callback) {
        category.update({_id:id},{
            isActive:false
        }).then(function (updateDate) {
            var data={message:"success",data:updateDate}
            callback(data)
        }).catch(function (err) {
            var data={message:"error",data:err}
            callback(data);
        })
    }
}
module.exports=categoryDal;