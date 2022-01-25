const express = require("express");
const bankBal = require("../../BAL/bank");
const roleGrant = require("../../utility/roleGrant");
const router = express.Router();

router.get('/', roleGrant.grantAccess('readAny', 'customer'),function(req,res){
    bankBal.getUserAccount(req.params.id,function (data,err) {
        // console.log(data);
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    });
});

router.post('/add_user_bank_account',function(req,res){
    bankBal.addUserAccount(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    });
});

router.post('/update_user_bank_account',function(req,res){
    bankBal.updateUserAccount(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    });
});
router.get('/delete_user_bank_account/:id?', function(req,res){
    console.log(req.params.id);
    bankBal.deleteUserAccount(req.params.id,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    });
})
module.exports = router;