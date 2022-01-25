var express=require("express");
const coaBal = require("../../BAL/coa");
const roleGrant = require("../../utility/roleGrant");
var router=express.Router();

router.get('/', roleGrant.grantAccess('readAny', 'customer'),function(req,res){
    console.log('ENTER DONE');
    coaBal.getAllCoaForSheet(function (data,err) {
        if(data.message=="error"){
            res.status(500).json(err);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});


module.exports = router;