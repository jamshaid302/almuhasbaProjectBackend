var express=require("express");
var router=express.Router();
var bookBal=require("../../BAL/book");
var bookitemBal=require("../../BAL/bookItem");
var checkBal=require("../../BAL/check");
var shippedBal=require("../../BAL/shipped");
var roleGrant=require("../../utility/roleGrant");
const purchaseOrderBal = require("../../BAL/purchaseOrder");
router.get("/",roleGrant.grantAccess('readAny', 'book'),function (req,res) {
    bookBal.getBookWithDetail(function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});

router.get("/getproductdata",roleGrant.grantAccess('readAny', 'purchaseOrder'),function (req,res) {
    bookBal.searchProduct(req.query.id,function (data,err) {
        if(data.message==="error"){
            res.status(401).json(data);
        }else if(data.message==='success') {
            res.status(200).json(data);
        }
    });
});

router.post("/getbookitems",roleGrant.grantAccess('readAny', 'book'),function (req,res) {
    bookitemBal.getBookItemWithDetail(req.body.id,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
})

router.post("/getbookbyid",roleGrant.grantAccess('readAny', 'book'),function (req,res) {
    bookBal.getBookById(req.body.id,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
})

router.post("/",roleGrant.grantAccess('createAny', 'book'),function (req,res) {
    var saveBodu = req.body;
    bookBal.addBook(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});

router.post("/update",roleGrant.grantAccess('updateAny', 'book'),function (req,res) {
    bookBal.updateBook(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});

router.post("/delete",roleGrant.grantAccess('deleteAny', 'book'),function (req,res) {
    bookBal.deleteBook(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
})

router.post("/check",roleGrant.grantAccess('deleteAny', 'book'),function (req,res) {
    checkBal.addcheck(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
})

router.post("/loadcheck",roleGrant.grantAccess('deleteAny', 'book'),function (req,res) {
    checkBal.getCheckId(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
})

router.post("/shipped",roleGrant.grantAccess('deleteAny', 'book'),function (req,res) {
    shippedBal.addShipped(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
})

router.post("/shipped",roleGrant.grantAccess('deleteAny', 'book'),function (req,res) {
    shippedBal.getShipped(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
})


module.exports=router;