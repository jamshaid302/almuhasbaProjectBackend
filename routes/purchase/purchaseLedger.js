var express=require("express");
var router=express.Router();
var purchaseLedgerBal=require("../../BAL/purchaseLedger");
var roleGrant=require("../../utility/roleGrant");

router.post("/ledgers",roleGrant.grantAccess('readAny', 'purchaseLedger'),function (req,res) {
    purchaseLedgerBal.getPurchaseLedgerDetailById(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});


router.get("/:id?",roleGrant.grantAccess('readAny', 'purchaseLedger'),function (req,res) {
    if(req.params.id){
        purchaseLedgerBal.getPurchaseLedgerById(req.params.id,function (data,err) {
            if(data.message=="error"){
                res.status(401).json(data);
            }else if(data.message=="success") {
                res.status(200).json(data);
            }
        })

    }else {
        purchaseLedgerBal.getAllPurchaseLedger(function (data,err) {
            if(data.message=="error"){
                res.status(401).json(data);
            }else if(data.message=="success") {
                res.status(200).json(data);
            }
        })
    }


})
router.get("/detail/:id?",roleGrant.grantAccess('readAny', 'purchaseLedger'),function (req,res) {
    if(req.params.id){
        purchaseLedgerBal.getPurchaseLedgerDetailById(req.params.id,function (data,err) {
            if(data.message=="error"){
                res.status(401).json(data);
            }else if(data.message=="success") {
                res.status(200).json(data);
            }
        })
    }
})
router.post("/",roleGrant.grantAccess('createAny', 'purchaseLedger'),function (req,res) {
    purchaseLedgerBal.addPurchaseLedger(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});
router.post("/update",roleGrant.grantAccess('updateAny', 'purchaseLedger'),function (req,res) {
    purchaseLedgerBal.updatePurchaseLedger(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});
router.get("/delete/:id?",roleGrant.grantAccess('deleteAny', 'purchaseLedger'),function (req,res) {
    purchaseLedgerBal.deletePurchaseLedger(req.params.id,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
})
module.exports=router;