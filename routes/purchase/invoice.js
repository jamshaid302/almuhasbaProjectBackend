var express=require("express");
var router=express.Router();
var invoiceBal=require("../../BAL/invoice");
var roleGrant=require("../../utility/roleGrant");
router.get("/:id?",roleGrant.grantAccess('readAny', 'invoice'),function (req,res) {
    if(req.params.id){
        invoiceBal.getInvoiceByOrderId(req.params.id,function (data,err) {
            if(data.message=="error"){
                res.status(401).json(data);
            }else if(data.message=="success") {
                res.status(200).json(data);
            }
        })

    }else {
        invoiceBal.getAllInvoice(function (data,err) {
            if(data.message=="error"){
                res.status(401).json(data);
            }else if(data.message=="success") {
                res.status(200).json(data);
            }
        })
    }


})
router.get("/generateinvoice/:id?",roleGrant.grantAccess('readAny', 'invoice'),function (req,res) {
    if(req.params.id) {
        invoiceBal.createInvoiceById(req.params.id, function (data, err) {
            if (data.message == "error") {
                res.status(401).json(data);
            } else if (data.message == "success") {
                res.status(200).json(data);
            }
        })
    }



})
router.post("/",roleGrant.grantAccess('createAny', 'invoice'),function (req,res) {
    invoiceBal.addInvoice(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});
router.post("/update",roleGrant.grantAccess('updateAny', 'invoice'),function (req,res) {
    invoiceBal.updateInvoice(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});
router.get("/delete/:id?",roleGrant.grantAccess('deleteAny', 'invoice'),function (req,res) {
    invoiceBal.deleteInvoice(req.params.id,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
})
module.exports=router;