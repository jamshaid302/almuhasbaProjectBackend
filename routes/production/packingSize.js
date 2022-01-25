var express=require("express");
var router=express.Router();
var packingSizeBal=require("../../BAL/packingSize");
var roleGrant=require("../../utility/roleGrant");
router.get("/",roleGrant.grantAccess('readAny', 'packingSize'),function (req,res) {
    packingSizeBal.getAllPackingSize(function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
})
router.post("/",roleGrant.grantAccess('createAny', 'packingSize'),function (req,res) {
    packingSizeBal.addPackingSize(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});
router.post("/update",roleGrant.grantAccess('updateAny', 'packingSize'),function (req,res) {
    packingSizeBal.updatePackingSize(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});
router.post("/delete",roleGrant.grantAccess('deleteAny', 'packingSize'),function (req,res) {
    packingSizeBal.deletePackingSize(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
})
module.exports=router;