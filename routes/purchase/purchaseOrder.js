var express=require("express");
var router=express.Router();
var purchaseOrderBal=require("../../BAL/purchaseOrder");
var purchaseLedgerBal=require("../../BAL/purchaseLedger");
var roleGrant=require("../../utility/roleGrant");
router.get("/getall/:id?",roleGrant.grantAccess('readAny', 'purchaseOrder'),function (req,res) {
        purchaseOrderBal.getAllPurchaseOrder(req.query,function (data,err) {
            if(data.message=="error"){
                res.status(401).json(data);
            }else if(data.message=="success") {
                res.status(200).json(data);
            }
        })
})
router.get("/getone/:id?",roleGrant.grantAccess('readAny', 'purchaseOrder'),function (req,res) {
    if(req.params.id){
        purchaseOrderBal.getPurchaseOrderById(req.params.id,function (data,err) {
            if(data.message=="error"){
                res.status(401).json(data);
            }else if(data.message=="success") {
                res.status(200).json(data);
            }
        })

    }

})
router.get("/getdetail/:id?",roleGrant.grantAccess('readAny', 'purchaseOrder'),function (req,res) {
    if(req.params.id){
        purchaseOrderBal.getPurchaseOrderDetailById(req.params.id,function (data,err) {
            if(data.message=="error"){
                res.status(401).json(data);
            }else if(data.message=="success") {
                res.status(200).json(data);
            }
        })

    }

})
router.get("/searchinvoice",roleGrant.grantAccess('readAny', 'purchaseOrder'),function (req,res) {

        purchaseOrderBal.searchInvoice(req.query.id,function (data,err) {
            if(data.message=="error"){
                res.status(401).json(data);
            }else if(data.message=="success") {
                res.status(200).json(data);
            }
        })
})
router.post("/",roleGrant.grantAccess('createAny', 'purchaseOrder'),function (req,res) {
    purchaseOrderBal.addPurchaseOrder(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});
router.post("/update",roleGrant.grantAccess('updateAny', 'purchaseOrder'),function (req,res) {
    purchaseOrderBal.updatePurchaseOrder(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});
router.post("/fixation",roleGrant.grantAccess('createAny', 'purchaseOrder'),function (req,res) {
    purchaseOrderBal.addFixation(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});

router.get("/delete/:id?",roleGrant.grantAccess('deleteAny', 'purchaseOrder'),function (req,res) {
    purchaseOrderBal.deletePurchaseOrder(req.params.id,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
})
module.exports=router;