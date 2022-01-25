var express=require("express");
var router=express.Router();
var saleofficerBal=require("../../BAL/saleOfficer");
var roleGrant=require("../../utility/roleGrant");
router.get("/",roleGrant.grantAccess('readAny', 'customer'),function (req,res) {
    saleofficerBal.getAllSaleOfficer(function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
})
router.post("/",roleGrant.grantAccess('createAny', 'customer'),function (req,res) {
    saleofficerBal.addSaleOfficer(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});
router.post("/update",roleGrant.grantAccess('updateAny', 'customer'),function (req,res) {
    saleofficerBal.updateSaleOfficer(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});
router.post("/delete",roleGrant.grantAccess('deleteAny', 'customer'),function (req,res) {
    saleofficerBal.deleteSaleOfficer(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
})
module.exports=router;