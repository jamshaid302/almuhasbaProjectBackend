var express=require("express");
var router=express.Router();
var storeBal=require("../../BAL/store");
var roleGrant=require("../../utility/roleGrant");

router.get("/getAllStore",roleGrant.grantAccess('readAny', 'store'),function (req,res){
    storeBal.getAllStore(function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    });
});

router.get("/:id?",roleGrant.grantAccess('readAny', 'store'),function (req,res) {
    var iii = req.query.id;
            if(iii){
                storeBal.getDetailStore(req.query.id,function (data,err) {
                    if(data.message=="error"){
                        res.status(401).json(data);
                    }else if(data.message=="success") {
                        res.status(200).json(data);
                    }
                });
            }
            else {
                storeBal.getStoreChatha(function (data, err) {
                    if (data.message == "error") {
                        res.status(401).json(data);
                    } else if (data.message == "success") {
                        res.status(200).json(data);
                    }

                });
            }
    // if(req.params.id){
    //     if(req.params.id=="storedetail"){
    //         storeBal.getDetailStore(function (data,err) {
    //             if(data.message=="error"){
    //                 res.status(401).json(data);
    //             }else if(data.message=="success") {
    //                 res.status(200).json(data);
    //             }
    //         })
    //     }else  if(req.params.id=="storechatha"){
    //         storeBal.getStoreChatha(function (data,err) {
    //             if(data.message=="error"){
    //                 res.status(401).json(data);
    //             }else if(data.message=="success") {
    //                 res.status(200).json(data);
    //             }
    //         })
    //     }else {
    //         storeBal.getStoreById(req.params.id,function (data,err) {
    //             if(data.message=="error"){
    //                 res.status(401).json(data);
    //             }else if(data.message=="success") {
    //                 res.status(200).json(data);
    //             }
    //         })
    //     }
    //
    //
    // }else {
    //     storeBal.getAllStore(function (data,err) {
    //         if(data.message=="error"){
    //             res.status(401).json(data);
    //         }else if(data.message=="success") {
    //             res.status(200).json(data);
    //         }
    //     })
    // }
});

router.post("/",roleGrant.grantAccess('createAny', 'store'),function (req,res) {
    storeBal.addStore(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});

router.post("/update",roleGrant.grantAccess('updateAny', 'store'),function (req,res) {
    storeBal.updateStore(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});

router.get("/delete/:id?",roleGrant.grantAccess('deleteAny', 'store'),function (req,res) {
    storeBal.deleteStore(req.params.id,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
})

module.exports=router;