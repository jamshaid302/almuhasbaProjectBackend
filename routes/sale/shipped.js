var express=require("express");
var router=express.Router();
var shippedBal=require("../../BAL/shipped");
var roleGrant=require("../../utility/roleGrant");
router.get("/",roleGrant.grantAccess('readAny', 'discount'),function (req,res) {
    shippedBal.getShipped(function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
})

router.post("/showshipped",roleGrant.grantAccess('createAny', 'discount'),function (req,res) {
    shippedBal.showShipped(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});

router.post("/detailsshipped",roleGrant.grantAccess('createAny', 'discount'),function (req,res) {
    shippedBal.detailShipped(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});


router.post("/update",roleGrant.grantAccess('updateAny', 'discount'),function (req,res) {
    discountBal.updateDiscount(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});
router.post("/delete",roleGrant.grantAccess('deleteAny', 'discount'),function (req,res) {
    discountBal.deleteDiscount(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
})
module.exports=router;