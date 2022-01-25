var express=require("express");
var router=express.Router();
var packingBal=require("../../BAL/packing");
var stockBal=require("../../BAL/stock");
var roleGrant=require("../../utility/roleGrant");
const ratelistBal = require("../../BAL/rateList");
const bookBal = require("../../BAL/book");
router.get("/",roleGrant.grantAccess('readAny', 'packing'),function (req,res) {
    packingBal.getPackingWithDetail(function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
})

router.get("/getPackingWithDetail",roleGrant.grantAccess('readAny', 'packing'),function (req,res) {
    packingBal.getPackingWithDetail(function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
})

router.post("/",roleGrant.grantAccess('createAny', 'packing'),function (req,res) {
    packingBal.addPacking(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});
router.post("/update",roleGrant.grantAccess('updateAny', 'packing'),function (req,res) {
    packingBal.updatePacking(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});
router.post("/delete",roleGrant.grantAccess('deleteAny', 'packing'),function (req,res) {
    packingBal.deletePacking(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});
router.post("/shift",roleGrant.grantAccess('createAny', 'packing'),function (req,res) {
    // console.log("api => ", req.body);
    // res.send(req.body);
    stockBal.getStockWithDetail_withID(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
})

router.post("/shift",roleGrant.grantAccess('createAny', 'packing'),function (req,res) {
    // console.log("api => ", req.body);
    // res.send(req.body);
    stockBal.getAllStock(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
})


router.get("/getproductdata",roleGrant.grantAccess('readAny', 'purchaseOrder'),function (req,res) {
    packingBal.searchProduct(req.query.id,function (data,err) {
        if(data.message==="error"){
            res.status(401).json(data);
        }else if(data.message==='success') {
            res.status(200).json(data);
        }
    });
});

// fetch_with_id

module.exports=router;