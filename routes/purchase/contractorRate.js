var express=require("express");
var router=express.Router();
var contractorRateBal=require("../../BAL/contractorRate");
var roleGrant=require("../../utility/roleGrant");
router.get("/:id?",roleGrant.grantAccess('readAny', 'contractorRate'),function (req,res) {
    var id = req.params.id;
    if(req.params.id){
        contractorRateBal.getContractorRateById(req.params.id,function (data,err) {
            if(data.message=="error"){
                res.status(401).json(data);
            }else if(data.message=="success") {
                res.status(200).json(data);
            }
        });
    }else if(req.query.id){
        contractorRateBal.getContractorRateById(req.query.id,function (data,err) {
            if(data.message=="error"){
                res.status(401).json(data);
            }else if(data.message=="success") {
                res.status(200).json(data);
            }
        });
    }
    // contractorRateBal.getAllContractorRate(function (data,err) {
    //     if(data.message=="error"){
    //         res.status(401).json(data);
    //     }else if(data.message=="success") {
    //         res.status(200).json(data);
    //     }
    // });
});
// router.get("/getAllContractorRates",roleGrant.grantAccess('readAny', 'contractorRate'),function (req,res) {
//         contractorRateBal.getAllContractorRate(function (data,err) {
//             if(data.message=="error"){
//                 res.status(401).json(data);
//             }else if(data.message=="success") {
//                 res.status(200).json(data);
//             }
//         });
// });

router.post("/",roleGrant.grantAccess('createAny', 'contractorRate'),function (req,res) {
    contractorRateBal.addContractorRate(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});

router.get("/delete/:id?",roleGrant.grantAccess('deleteAny', 'contractorRate'),function (req,res) {
    contractorRateBal.deleteContractorRate(req.params.id,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
})
module.exports=router;