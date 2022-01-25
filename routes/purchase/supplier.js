var express=require("express");
var router=express.Router();
var supplierBal=require("../../BAL/supplier");
var roleGrant=require("../../utility/roleGrant");
router.get("/:id?",roleGrant.grantAccess('readAny', 'supplier'),function (req,res) {
    if(req.params.id){
        supplierBal.getSupplierById(req.params.id,function (data,err) {
            if(data.message=="error"){
                res.status(401).json(data);
            }else if(data.message=="success") {
                res.status(200).json(data);
            }
        })

    }else {
        supplierBal.getAllSupplier(function (data,err) {
            if(data.message=="error"){
                res.status(401).json(data);
            }else if(data.message=="success") {
                res.status(200).json(data);
            }
        })
    }


})
router.post("/",roleGrant.grantAccess('createAny', 'supplier'),function (req,res) {
    supplierBal.addSupplier(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});
router.post("/update",roleGrant.grantAccess('updateAny', 'supplier'),function (req,res) {
    supplierBal.updateSupplier(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});
router.get("/delete/:id?",roleGrant.grantAccess('deleteAny', 'supplier'),function (req,res) {
    supplierBal.deleteSupplier(req.params.id,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
})
module.exports=router;