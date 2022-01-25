var productItemDal=require("../DAL/productItem");
var productItemBal={
    getAllproductItem:function (callback) {
        productItemDal.getAllProductItem(function (data,err) {
            callback(data);
        });
    },
    getproductItemById:function (id,callback) {
        productItemDal.getProductItemById(id,function (data,err) {
            callback(data);
        });
    },


    addproductItem:function (body,callback) {
        productItemDal.addProductItem(body,function (data,err) {
            callback(data);
        })
    },
    updateproductItem:function (body,callback) {
        productItemDal.updateProductItem(body,function (data,err) {
            callback(data);
        })
    },
    deleteproductItem:function (id,callback) {
        productItemDal.deleteProductItem(id,function (data,err) {
            callback(data);
        })
    }

}
module.exports=productItemBal;