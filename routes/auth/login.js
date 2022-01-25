var express=require("express");
var router=express.Router();
var jwt = require('jsonwebtoken');
var passwordHash = require('password-hash');
var config=require("../../config.json");
var users = require('../../BAL/user');
var passport=require("passport");
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey : config.jwtToken};

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    return done(null, jwt_payload);
}));
router.post("/",function (req,res) {
    users.getUserByEmail(req.body.email,function (data,err) {
        if(data.message=="success"){
            data=data.data[0].toObject();
            var status = passwordHash.verify(req.body.password,data.password)
            if(status==true){
                jwt.sign({user:{email:data.email,role:data.role}},config.jwtToken,function (err,token) {
                    delete data.password;
                    data.photo=req.protocol + '://' +req.headers.host+"/"+data.photo;
                    res.status(200).json({token:token,user:data});
                });
            }else {
                res.status(401).json({error:"Password is wrong"})
            }
        }else{
            res.status(401).json({error:"Email is wrong"})
        }
    })
})

router.get("/:id?",passport.authenticate('jwt', { session: false }),function (req,res) {
    if(req.params.id == "verifytoken"){
        res.status(200).json({message:"success"})
    }
    else {
        users.getUserById(req.params.id,function (data,err) {
            if(data.message=="success"){
                data=data.data[0].toObject();
                data.photo=req.protocol + '://' +req.headers.host+"/"+data.photo;
                res.status(200).json({user:data});
            }else {
                res.status(401).json({user:data.data[0]});
            }
        })
    }


})


module.exports=router;