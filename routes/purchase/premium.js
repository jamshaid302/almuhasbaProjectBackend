var express=require("express");
var router=express.Router();
var premiumBal=require("../../BAL/premium");
var roleGrant=require("../../utility/roleGrant");
router.get("/:id?",roleGrant.grantAccess('readAny', 'premium'),function (req,res) {
    if(req.params.id){
        premiumBal.getPremiumById(req.params.id,function (data,err) {
            if(data.message=="error"){
                res.status(401).json(data);
            }else if(data.message=="success") {
                res.status(200).json(data);
            }
        })

    }else {
        premiumBal.getAllPremium(function (data,err) {
            if(data.message=="error"){
                res.status(401).json(data);
            }else if(data.message=="success") {
                res.status(200).json(data);
            }
        })
    }


})
router.post("/",roleGrant.grantAccess('createAny', 'premium'),function (req,res) {
    premiumBal.addPremium(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});
router.post("/update",roleGrant.grantAccess('updateAny', 'premium'),function (req,res) {
    premiumBal.updatePremium(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});
router.get("/delete/:id?",roleGrant.grantAccess('deleteAny', 'premium'),function (req,res) {
    premiumBal.deletePremium(req.params.id,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
})
module.exports=router;