var express=require("express");
var router=express.Router();
var wheatPurityBal=require("../../BAL/wheatPurity");
var roleGrant=require("../../utility/roleGrant");
router.get("/:id?",roleGrant.grantAccess('readAny', 'wheatPurity'),function (req,res) {
    if(req.params.id){
        wheatPurityBal.getwheatPurityById(req.params.id,function (data,err) {
            if(data.message=="error"){
                res.status(401).json(data);
            }else if(data.message=="success") {
                res.status(200).json(data);
            }
        })

    }else {
        wheatPurityBal.getAllwheatPurity(req.query,function (data,err) {
            if(data.message=="error"){
                res.status(401).json(data);
            }else if(data.message=="success") {
                res.status(200).json(data);
            }
        });
    }
})
router.post("/",roleGrant.grantAccess('createAny', 'wheatPurity'),function (req,res) {
    wheatPurityBal.addwheatPurity(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});
router.post("/getWheatPurityByUserSearch",roleGrant.grantAccess('updateAny', 'wheatPurity'),function (req,res) {
    var d = req.body;
    wheatPurityBal.getWheatPurityByUserSearch(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});
router.post("/update",roleGrant.grantAccess('updateAny', 'wheatPurity'),function (req,res) {
    wheatPurityBal.updatewheatPurity(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});
router.get("/delete/:id?",roleGrant.grantAccess('deleteAny', 'wheatPurity'),function (req,res) {
    wheatPurityBal.deletewheatPurity(req.params.id,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
})
module.exports=router;