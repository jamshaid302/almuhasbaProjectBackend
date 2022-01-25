var express=require("express");
var router=express.Router();
var customerBal=require("../../BAL/customer");
var roleGrant=require("../../utility/roleGrant");
router.get("/",roleGrant.grantAccess('readAny', 'customer'),function (req,res) {
    customerBal.getAllCustomer(function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
})
router.post("/",roleGrant.grantAccess('createAny', 'customer'),function (req,res) {
    customerBal.addCustomer(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});
router.post("/update",roleGrant.grantAccess('updateAny', 'customer'),function (req,res) {
    customerBal.updateCustomer(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});
router.post("/delete",roleGrant.grantAccess('deleteAny', 'customer'),function (req,res) {
    customerBal.deleteCustomer(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
})
module.exports=router;