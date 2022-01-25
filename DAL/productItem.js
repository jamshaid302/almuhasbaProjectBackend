var productItem=require("../models/productItem");
var db=require("../utility/conn");
var productItemDal={
    getAllProductItem:function (callback) {
        productItem.find({isActive:true}).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    },
    getProductItemById:function (id,callback) {
        productItem.find({_id : id,isActive:true}).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    },
    addProductItem:function (body,callback) {
        var pro=new productItem({
            name:body.name,
        });
        pro.save().then(function (savedData) {
            var data={message:"success",data:savedData}
            callback(data);
        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);

        })
    },
    updateProductItem:function (body,callback) {
        productItem.updateOne(
            { "_id" : body.id },
            { $set: {
                name:body.name,
            } },
            {runValidators: true}
        ).then(function (updateDate) {
            var data={message:"success",data:updateDate}
            callback(data)
        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);
        });

    },
    deleteProductItem:function (id,callback) {
        productItem.updateOne(
            { "_id" : id },
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
module.exports=productItemDal;