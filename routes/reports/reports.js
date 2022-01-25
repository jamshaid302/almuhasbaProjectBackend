const express = require("express");
var wheatPurityBal=require("../../BAL/wheatPurity");
const roleGrant = require("../../utility/roleGrant");
const router = express.Router();

router.post('/', roleGrant.grantAccess('readAny', 'reports'),function(req,res){
    var d = req.body;
    //if(req.body.category === 'Wheat'){
        wheatPurityBal.getWheatPurityByUserSearch(req.body,function (data,err) {
            if(data.message=="error"){
                res.status(401).json(data);
            }else if(data.message=="success") {
                res.status(200).json(data);
            }
        });
    //}
});


module.exports = router;