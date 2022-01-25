var express=require("express");
var router=express.Router();
var commodityIssueForProductionBal=require("../../BAL/commodityIssueForProduction");
var productionOutputBal=require("../../BAL/productionOutput");
var roleGrant=require("../../utility/roleGrant");
const contractorRateBal = require("../../BAL/contractorRate");
// router.get("/:id?",roleGrant.grantAccess('readAny', 'commodityIssueForProductionBal'),function (req,res) {
//     if(req.params.id){
//         if(req.params.id=="getone"){
//             commodityIssueForProductionBal.getCommodityIssueForProductionOne(req.query.id,function (data,err) {
//                 if(data.message=="error"){
//                     res.status(401).json(data);
//                 }else if(data.message=="success") {
//                     console.log('api -> ', data);
//                     res.status(200).json(data);
//                 }
//             })
//         }else{
//             commodityIssueForProductionBal.getCommodityIssueForProductionById(req.params.id,function (data,err) {
//                 if(data.message=="error"){
//                     res.status(401).json(data);
//                 }else if(data.message=="success") {
//                     res.status(200).json(data);
//                 }
//             })
//         }
//     }else {
//         var d = req.body;
//         commodityIssueForProductionBal.getAllCommodityIssueForProduction(req.query,function (data,err) {
//             if(data.message=="error"){
//                 res.status(401).json(data);
//             }else if(data.message=="success") {
//                 res.status(200).json(data);
//             }
//         })
//     }
// });

router.get("/:id?",roleGrant.grantAccess('readAny', 'commodityIssueForProductionBal'),function (req,res) {
    if(req.params.id){
        if(req.params.id=="getone"){
            commodityIssueForProductionBal.getCommodityIssueForProductionOne(req.query.id,function (data,err) {
                if(data.message=="error"){
                    res.status(401).json(data);
                }else if(data.message=="success") {
                    console.log('api -> ', data);
                    res.status(200).json(data);
                }
            });
        }else{
            commodityIssueForProductionBal.getCommodityIssueForProductionById(req.params.id,function (data,err) {
                if(data.message=="error"){
                    res.status(401).json(data);
                }else if(data.message=="success") {
                    res.status(200).json(data);
                }
            });
        }
    }else {
        var d = req.query;
        commodityIssueForProductionBal.getAllCommodityIssueForProduction(req.query,function (data,err) {
            if(data.message=="error"){
                res.status(401).json(data);
            }else if(data.message=="success") {
                res.status(200).json(data);
            }
        });
    }
})


router.post("/getAllProduction",roleGrant.grantAccess('createAny', 'commodityIssueForProductionBal'),function (req,res) {
    var d = req.body;
    commodityIssueForProductionBal.getAllCommodityIssueForProduction(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    });
});

router.post("/",roleGrant.grantAccess('createAny', 'commodityIssueForProductionBal'),function (req,res) {
    commodityIssueForProductionBal.addCommodityIssueForProduction(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});
router.post("/update",roleGrant.grantAccess('updateAny', 'commodityIssueForProductionBal'),function (req,res) {
    commodityIssueForProductionBal.updateCommodityIssueForProduction(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});
router.get("/delete/:id?",roleGrant.grantAccess('deleteAny', 'commodityIssueForProductionBal'),function (req,res) {
    commodityIssueForProductionBal.deleteCommodityIssueForProduction(req.params.id,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
})
module.exports=router;