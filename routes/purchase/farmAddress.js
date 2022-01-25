var express=require("express");
var router=express.Router();
var farmAddressBal=require("../../BAL/farmAddress");
var roleGrant=require("../../utility/roleGrant");
const contractorBal = require("../../BAL/contractor");
router.get("/:id?",roleGrant.grantAccess('readAny', 'farmAddress'),function (req,res) {
    if(req.params.id){
        if(req.params.id=="farmgroup"){
            farmAddressBal.getFarmGroup(function (data,err) {
                if(data.message=="error"){
                    res.status(401).json(data);
                }else if(data.message=="success") {
                    res.status(200).json(data);
                }
            })
        }else {
            farmAddressBal.getFarmAddressById(req.params.id,function (data,err) {
                if(data.message=="error"){
                    res.status(401).json(data);
                }else if(data.message=="success") {
                    res.status(200).json(data);
                }
            })
        }


    }else {
        farmAddressBal.getAllFarmAddress(function (data,err) {
            if(data.message=="error"){
                res.status(401).json(data);
            }else if(data.message=="success") {
                res.status(200).json(data);
            }
        });
    }
});

router.post("/getFarmExpense",roleGrant.grantAccess('updateAny', 'wheatPurity'),function (req,res) {
    var d = req.body;
    farmAddressBal.getFarmsExpensesByUserSearch(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});

router.post("/",roleGrant.grantAccess('createAny', 'farmAddress'),function (req,res) {
    farmAddressBal.addFarmAddress(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});
router.post("/update",roleGrant.grantAccess('updateAny', 'farmAddress'),function (req,res) {
    farmAddressBal.updateFarmAddress(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});
router.get("/delete/:id?",roleGrant.grantAccess('deleteAny', 'farmAddress'),function (req,res) {
    farmAddressBal.deleteFarmAddress(req.params.id,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
})
module.exports=router;