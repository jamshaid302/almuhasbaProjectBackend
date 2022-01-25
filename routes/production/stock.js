var express=require("express");
var router=express.Router();
var stockBal=require("../../BAL/stock");
var packingBal=require("../../BAL/packing");
var roleGrant=require("../../utility/roleGrant");
router.get("/",roleGrant.grantAccess('readAny', 'stock'),function (req,res) {
    // stockBal.getAllStock(function (data,err) {
    //     if(data.message=="error"){
    //         res.status(401).json(data);
    //     }else if(data.message=="success") {
    //         res.status(200).json(data);
    //     }
    // })

    stockBal.getAllStockSum(function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })

})
router.post("/",roleGrant.grantAccess('createAny', 'stock'),function (req,res) {
    stockBal.addStock(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })




});

router.post("/updateQty",roleGrant.grantAccess('updateAny', 'stock'),function (req,res) {
    stockBal.updateQtyStock(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});

router.post("/detailstock",roleGrant.grantAccess('updateAny', 'stock'),function (req,res) {
    stockBal.detailQtyStock(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});


router.post("/detailstock",roleGrant.grantAccess('updateAny', 'stock'),function (req,res) {
    stockBal.detailQtyStock(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});


router.post("/update",roleGrant.grantAccess('updateAny', 'stock'),function (req,res) {
    stockBal.updateStock(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});
router.post("/delete",roleGrant.grantAccess('deleteAny', 'stock'),function (req,res) {
    stockBal.deleteStock(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
})
module.exports=router;