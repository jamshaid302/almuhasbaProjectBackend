var express=require("express");
var router=express.Router();
var contractorBal=require("../../BAL/contractor");
var roleGrant=require("../../utility/roleGrant");
const wheatPurityBal = require("../../BAL/wheatPurity");
router.get("/:id?",roleGrant.grantAccess('readAny', 'contractor'),function (req,res) {
    if(req.params.id){
        contractorBal.getContractorById(req.params.id,function (data,err) {
            if(data.message=="error"){
                res.status(401).json(data);
            }else if(data.message=="success") {
                res.status(200).json(data);
            }
        })

    }else {
        contractorBal.getAllContractor(function (data,err) {
            if(data.message=="error"){
                res.status(401).json(data);
            }else if(data.message=="success") {
                res.status(200).json(data);
            }
        })
    }
})
router.get("/detail/:id?",roleGrant.grantAccess('readAny', 'contractor'),function (req,res) {
    if(req.params.id){
        contractorBal.getContractorDetailById(req.params.id,function (data,err) {
            if(data.message=="error"){
                res.status(401).json(data);
            }else if(data.message=="success") {
                res.status(200).json(data);
            }
        })
    }
});
router.post("/getContractorExpenses",roleGrant.grantAccess('updateAny', 'wheatPurity'),function (req,res) {
    var d = req.body;
    contractorBal.getContractorExpenseByUserSearch(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
    // contractorBal.ExpensebyId(req.body,function (data,err) {
    //     if(data.message=="error"){
    //         res.status(401).json(data);
    //     }else if(data.message=="success") {
    //         res.status(200).json(data);
    //     }
    // })
});
router.post("/",roleGrant.grantAccess('createAny', 'contractor'),function (req,res) {
    contractorBal.addContractor(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});
router.post("/update",roleGrant.grantAccess('updateAny', 'contractor'),function (req,res) {
    contractorBal.updateContractor(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});
router.get("/delete/:id?",roleGrant.grantAccess('deleteAny', 'contractor'),function (req,res) {
    contractorBal.deleteContractor(req.params.id,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});

router.post("/getContractorExpensebyId",roleGrant.grantAccess('deleteAny', 'contractor'),function (req,res) {
    contractorBal.ExpensebyId(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});


// getContractorForPay
router.post("/getContractorForPay",roleGrant.grantAccess('deleteAny', 'contractor'),function (req,res) {
    contractorBal.payContractor(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});

router.post("/PaytoContractor",roleGrant.grantAccess('deleteAny', 'contractor'),function (req,res) {
    contractorBal.PaytoContractor(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});

module.exports=router;