var express=require("express");
var router=express.Router();
var ratelistBal=require("../../BAL/rateList");
var roleGrant=require("../../utility/roleGrant");
router.get("/",roleGrant.grantAccess('readAny', 'ratelist'),function (req,res) {
    ratelistBal.getAllRateList(function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
})
router.get("/getRateListWithDetail",roleGrant.grantAccess('readAny', 'ratelist'),function (req,res) {
    ratelistBal.getRateListWithDetail(function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
})
router.post("/",roleGrant.grantAccess('createAny', 'ratelist'),function (req,res) {
    ratelistBal.addRateList(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});
router.post("/update",roleGrant.grantAccess('updateAny', 'ratelist'),function (req,res) {
    ratelistBal.updateRateList(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});
router.post("/delete",roleGrant.grantAccess('deleteAny', 'ratelist'),function (req,res) {
    ratelistBal.deleteRateList(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
})
module.exports=router;