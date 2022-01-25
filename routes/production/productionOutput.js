var express=require("express");
var router=express.Router();
var productionOutputBal=require("../../BAL/productionOutput");
var roleGrant=require("../../utility/roleGrant");

router.get("/allproductionOutPuts/:id?",roleGrant.grantAccess('readAny','commodityIssueForProductionBal'),function (req,res){
    var id = req.query.id;
    if(id) {
        productionOutputBal.getProductionOutputData(req.query.id, function (data, err) {
            if (data.message == "error") {
                res.status(401).json(data);
            } else if (data.message == "success") {
                res.status(200).json(data);
            }
        });
    }else{
        productionOutputBal.getProductionOutputDataToAddDry( function (data, err) {
            if (data.message == "error") {
                res.status(401).json(data);
            } else if (data.message == "success") {
                res.status(200).json(data);
            }
        });
    }
});

router.get("/allProductionOutputData/",roleGrant.grantAccess('readAny','commodityIssueForProductionBal'),function (req,res){
    productionOutputBal.allProductionOutputData(function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    });
});

// router.get("/allproductionOutPuts/",roleGrant.grantAccess('readAny','commodityIssueForProductionBal'),function (req,res){
//     productionOutputBal.getSimpleProductionOutput(function (data,err) {
//         if(data.message=="error"){
//             res.status(401).json(data);
//         }else if(data.message=="success") {
//             res.status(200).json(data);
//         }
//     });
// });

router.get("/:id?",roleGrant.grantAccess('readAny', 'commodityIssueForProductionBal'),function (req,res) {
    if(req.params.id){
        productionOutputBal.getproductionOutputById(req.params.id,function (data,err) {
            if(data.message=="error"){
                res.status(401).json(data);
            }else if(data.message=="success") {
                res.status(200).json(data);
            }
        })

    }else {
        productionOutputBal.getAllproductionOutput(req.query,function (data,err) {
            if(data.message=="error"){
                res.status(401).json(data);
            }else if(data.message=="success") {
                res.status(200).json(data);
            }
        });
    }
});

// router.get("/getDataforproductionOutput/:id?",roleGrant.grantAccess('readAny', 'contractorRate'),function (req,res) {
//     var id = req.query.id;
//     if(req.query.id){
//         productionOutputBal.getProductionOutputData(req.query.id,function (data,err) {
//             if(data.message=="error"){
//                 res.status(401).json(data);
//             }else if(data.message=="success") {
//                 res.status(200).json(data);
//             }
//         });
//     }
// });

router.post("/",roleGrant.grantAccess('createAny', 'commodityIssueForProductionBal'),function (req,res) {
    productionOutputBal.addproductionOutput(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});

router.post("/update",roleGrant.grantAccess('updateAny', 'commodityIssueForProductionBal'),function (req,res) {
    productionOutputBal.updateproductionOutput(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});

router.get("/delete/:id?",roleGrant.grantAccess('deleteAny', 'commodityIssueForProductionBal'),function (req,res) {
    productionOutputBal.deleteproductionOutput(req.params.id,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
})

module.exports=router;