var express=require("express");
var router=express.Router();
var saleStoreBal=require("../../BAL/saleStore");
var roleGrant=require("../../utility/roleGrant");
router.get("/",roleGrant.grantAccess('readAny', 'saleStore'),function (req,res) {
    saleStoreBal.getAllSaleStore(function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
})
router.post("/",roleGrant.grantAccess('createAny', 'saleStore'),function (req,res) {
    saleStoreBal.addSaleStore(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});
router.post("/update",roleGrant.grantAccess('updateAny', 'saleStore'),function (req,res) {
    saleStoreBal.updateSaleStore(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});
router.post("/delete",roleGrant.grantAccess('deleteAny', 'saleStore'),function (req,res) {
    saleStoreBal.deleteSaleStore(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
})
module.exports=router;