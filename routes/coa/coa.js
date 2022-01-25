var express=require("express");
const coaBal = require("../../BAL/coa");
const roleGrant = require("../../utility/roleGrant");
var router=express.Router();

router.get('/:id?', roleGrant.grantAccess('readAny', 'customer'),function(req,res){
    // console.log('ENTER DONE');
    coaBal.getAllCoa(req.params.id,function (data,err) {
        // console.log(data);
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});
router.get('/getcoabytitle/:id?', roleGrant.grantAccess('readAny', 'customer'),function(req,res){
    console.log(req.params.id);
    coaBal.getCoaByTitle(req.params.id,function (data,err) {
        // console.log(data);
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});


router.post('/addCoa',function(req,res){
    // console.log('Data of COA in API: ', req.body);
    coaBal.addCoa(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});

router.post('/addCoaTransaction',function(req,res){
    console.log('Data of COATRANSACTION in API: ', req.body);
    coaBal.addCoaTransaction(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
});
router.post('/adddefaultgl', function(req,res){
    console.log(req.body);
    coaBal.addDefaultGl(req.body,function (data,err) {
        if(data.message=="error"){
            res.status(401).json(data);
        }else if(data.message=="success") {
            res.status(200).json(data);
        }
    })
})
module.exports = router;