var categoryDal=require("../DAL/category");
var categoryBal={

    categorySubcategory:function (callback) {
        categoryDal.categorySubcategory(function (data,err) {
            callback(data);
        });
    },
    getAllCategory:function (callback) {
        categoryDal.getAllCategory(function (data,err) {
            callback(data);
        });
    },
    categorySubcategoryUnwind:function (callback) {
        categoryDal.categorySubcategoryUnwind(function (data,err) {
            callback(data);
        });
    },
    getCategoryById:function (id,callback) {
        categoryDal.getCategoryById(id,function (data,err) {
            callback(data);
        });
    },
    addCategory:function (body,callback) {
        categoryDal.addCategory(body,function (data,err) {
            callback(data);
        })
    },

    updateCategory:function (body,callback) {
      categoryDal.updateCategory(body,function (data,err) {
          callback(data);
      })
    },
    deleteCategory:function (id,callback) {
        categoryDal.deleteCategory(id,function (data,err) {
            callback(data);
        })
    }

}
module.exports=categoryBal;