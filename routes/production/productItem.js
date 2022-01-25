var express=require("express");
var router=express.Router();
var productItemBal=require("../../BAL/productItem");
var roleGrant=require("../../utility/roleGrant");
router.get("/:id?",roleGrant.grantAccess('readAny', 'productItem'),function (req,res) {
    if(req.params.id){
        productItemBal.getproductItemById(req.params.id,function (data,err) {
            if(data.message=="error"){
                res.status(401).json(data);
            }else if(data.message=="success") {
                res.status(200).json(data);
            }
        })

    }else {
        productItemBal.getAllproductItem(function (data,err) {
            if(data.message=="error"){
                res.status(401).json(data);
            }else if(data.message=="success") {
                res.status(200).json(data);
            }
        })
    }


})
router.post("/",roleGrant.grantAccess('createAny', 'productItem'),function (req,res) {
    productItemBal.addproductItem(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});
router.post("/update",roleGrant.grantAccess('updateAny', 'productItem'),function (req,res) {
    productItemBal.updateproductItem(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});
router.get("/delete/:id?",roleGrant.grantAccess('deleteAny', 'productItem'),function (req,res) {
    productItemBal.deleteproductItem(req.params.id,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
})
module.exports=router;