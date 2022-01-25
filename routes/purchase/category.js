var express=require("express");
var router=express.Router();
var categoryBal=require("../../BAL/category");
var passport=require("passport");
var roleGrant=require("../../utility/roleGrant");
router.get("/:id?",roleGrant.grantAccess('readAny', 'category'),function (req,res) {
    if(req.params.id){
        if(req.params.id=="catsubunwind"){
            categoryBal.categorySubcategoryUnwind(function (data,err) {
                if(data.message=="error"){
                    res.status(401).json(data);
                }else if(data.message=="success") {
                    res.status(200).json(data);
                }
            })
        }else if(req.params.id=="cat"){
            categoryBal.getAllCategory(function (data,err) {
                if(data.message=="error"){
                    res.status(401).json(data);
                }else if(data.message=="success") {
                    res.status(200).json(data);
                }
            })
        }
        else if(req.params.id=="catsub"){
            categoryBal.categorySubcategory(function (data,err) {
                if(data.message=="error"){
                    res.status(401).json(data);
                }else if(data.message=="success") {
                    res.status(200).json(data);
                }
            })
        }
        else {
            categoryBal.getCategoryById(req.params.id,function (data,err) {
                if(data.message=="error"){
                    res.status(401).json(data);
                }else if(data.message=="success") {
                    res.status(200).json(data);
                }
            })
        }

    }else {
        categoryBal.getAllCategory(function (data,err) {
            if(data.message=="error"){
                res.status(401).json(data);
            }else if(data.message=="success") {
                res.status(200).json(data);
            }
        })
    }
});
router.post("/",roleGrant.grantAccess('createAny', 'category'),function (req,res) {
    categoryBal.addCategory(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});
router.post("/update",roleGrant.grantAccess('updateAny', 'category'),function (req,res) {
    categoryBal.updateCategory(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});
router.get("/delete/:id?",roleGrant.grantAccess('deleteAny', 'category'),function (req,res) {
    categoryBal.deleteCategory(req.params.id,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
})
module.exports=router;