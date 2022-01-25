var express=require("express");
var router=express.Router();
var cottonBudTestBal=require("../../BAL/cottonBudTest");
var roleGrant=require("../../utility/roleGrant");
const wheatPurityBal = require("../../BAL/wheatPurity");
router.get("/:id?",roleGrant.grantAccess('readAny', 'cottonBudTest'),function (req,res) {
    if(req.params.id){
        cottonBudTestBal.getCottonBudTestById(req.params.id,function (data,err) {
            if(data.message=="error"){
                res.status(401).json(data);
            }else if(data.message=="success") {
                res.status(200).json(data);
            }
        })

    }else {
        cottonBudTestBal.getAllCottonBudTest(req.query,function (data,err) {
            if(data.message=="error"){
                res.status(401).json(data);
            }else if(data.message=="success") {
                res.status(200).json(data);
            }
        })
    }
});

router.post("/getBudPurityByUserSearch",roleGrant.grantAccess('updateAny', 'wheatPurity'),function (req,res) {
    var d = req.body;
    cottonBudTestBal.getCottonBudTestByUserSearch(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});

router.post("/",roleGrant.grantAccess('createAny', 'cottonBudTest'),function (req,res) {
    cottonBudTestBal.addCottonBudTest(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});
router.post("/update",roleGrant.grantAccess('updateAny', 'cottonBudTest'),function (req,res) {
    cottonBudTestBal.updateCottonBudTest(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});
router.get("/delete/:id?",roleGrant.grantAccess('deleteAny', 'cottonBudTest'),function (req,res) {
    cottonBudTestBal.deleteCottonBudTest(req.params.id,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
})
module.exports=router;