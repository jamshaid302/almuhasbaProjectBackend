var express=require("express");
var router=express.Router();
var warehouseBal=require("../../BAL/warehouse");
var roleGrant=require("../../utility/roleGrant");
router.get("/:id?",roleGrant.grantAccess('readAny', 'warehouse'),function (req,res) {
    if(req.params.id){
        if(req.params.id=="storewarehouse")
        {
            warehouseBal.getStoreWarehouse(function (data,err) {
                if(data.message=="error"){
                    res.status(401).json(data);
                }else if(data.message=="success") {
                    res.status(200).json(data);
                }
            })

        }else {
            warehouseBal.getWarehouseById(req.params.id,function (data,err) {
                if(data.message=="error"){
                    res.status(401).json(data);
                }else if(data.message=="success") {
                    res.status(200).json(data);
                }
            })
        }
    }else {
        warehouseBal.getAllWarehouse(function (data,err) {
            if(data.message=="error"){
                res.status(401).json(data);
            }else if(data.message=="success") {
                res.status(200).json(data);
            }
        })
    }
})
router.post("/",roleGrant.grantAccess('createAny', 'warehouse'),function (req,res) {
    warehouseBal.addWarehouse(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});
router.post("/update",roleGrant.grantAccess('updateAny', 'warehouse'),function (req,res) {
    warehouseBal.updateWarehouse(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});
router.get("/delete/:id?",roleGrant.grantAccess('deleteAny', 'warehouse'),function (req,res) {
    warehouseBal.deleteWarehouse(req.params.id,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
})
module.exports=router;