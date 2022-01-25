var express=require("express");
var router=express.Router();
var carriageRateBal=require("../../BAL/carriageRate");
var roleGrant=require("../../utility/roleGrant");
router.post("/",roleGrant.grantAccess('createAny', 'carriageRate'),function (req,res) {
    carriageRateBal.addCarriageRate(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});
module.exports=router;