var express=require("express");
var router=express.Router();
var dryBal=require("../../BAL/dry");
var roleGrant=require("../../utility/roleGrant");
const contractorRateBal = require("../../BAL/contractorRate");
router.post("/getalldry",roleGrant.grantAccess('readAny', 'dry'),function (req,res) {
    dryBal.getAllDry(function (data,err) {
            if(data.message=="error"){
                res.status(401).json(data);
            }else if(data.message=="success") {
                res.status(200).json(data);
            }
        });
});

router.get("/getDryById/:id?",roleGrant.grantAccess('readAny', 'contractorRate'),function (req,res) {
    var id = req.query.id;
    if(req.query.id){
        dryBal.getDryById(req.query.id,function (data,err) {
            if(data.message=="error"){
                res.status(401).json(data);
            }else if(data.message=="success") {
                res.status(200).json(data);
            }
        });
    }
});

router.post("/",roleGrant.grantAccess('createAny', 'dry'),function (req,res) {
    dryBal.addDry(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});
router.post("/update",roleGrant.grantAccess('updateAny', 'dry'),function (req,res) {
    dryBal.updateDry(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});
router.post("/delete",roleGrant.grantAccess('deleteAny', 'dry'),function (req,res) {
    dryBal.deleteDry(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
})
module.exports=router;