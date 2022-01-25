var express=require("express");
var router=express.Router();
var userBal=require("../../BAL/user");
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var passwordHash = require('password-hash');
var passport=require("passport");
var base64Img = require('base64-img');
router.post("/",upload.single('avatar'),function (req,res) {
    if(req.file)
    {
        req.body.photo=req.file.path;
    }else {
        req.body.photo="upload/default/default1.png";
    }
    req.body.password = passwordHash.generate(req.body.password);
    userBal.addUser(req.body,function (data,err) {
        if(data.message=="success"){
            res.status(200).json(data);
        }else{
            res.status(401).json(data);
        }
    })
})

router.post("/update",passport.authenticate('jwt', { session: false }),function (req,res) {
    userBal.updateUser(req.body,function (data,err) {
        if(data.message=="success"){
            res.status(200).json(data);
        }else{
            res.status(401).json(data);
        }
    })
})

router.post("/changepassword",passport.authenticate('jwt', { session: false }),function (req,res) {
    if(req.body.password1==req.body.password2){
        userBal.getUserByEmail(req.body.email,function (data,err) {
            if(data.message=="success"){
                data=data.data[0].toObject();
                var status=passwordHash.verify(req.body.old,data.password)
                if(status==true){
                    req.body.password1 = passwordHash.generate(req.body.password1);
                    userBal.updatePassword(req.body,function (data,err) {
                        if(data.message=="success"){
                            res.status(200).json(data);
                        }else{
                            res.status(401).json(data);
                        }
                    })
                }else{
                    res.status(401).json({error:"Password does not match"});
                }
            }
        })

    }else {
        res.status(401).json({error:"Password does not match"});
    }

})

router.post("/avatar",passport.authenticate('jwt', { session: false }),upload.single('avatar'),function (req,res) {
    if(req.file){
        req.body.photo=req.file.path;
        userBal.updatePicture(req.body,function (data,err) {
            if(data.message=="success"){
                res.status(200).json(data);
            }else{
                res.status(401).json(data);
            }
        })
    }else{
        res.status(401).json({error:"Image does not found"});
    }


})
module.exports=router;