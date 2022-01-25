var user=require("../models/user");
var db=require("../utility/conn");
var userDal={
    getAllUsers:function (callback) {
        user.find({isActive:true}).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    },
    getUserById:function (id,callback) {
        user.find({_id : id,isActive:true},{ "password": 0}).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    },
    getUserByEmail:function (id,callback) {
        user.find({email : id,isActive:true}).then(function (data) {
            if(data.length==0){
                var arr={message:"error",data:data}
                callback(arr);
            }else{
                var arr={message:"success",data:data}
                callback(arr);
            }
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    },
    addUser:function (body,callback) {
        var userId=new user({
            name:body.name,
            email:body.email,
            password:body.password,
            photo:body.photo,
            phone:body.phone,
            role:body.role,
            designation:body.designation,
            address:body.address
        });
        userId.save().then(function (savedData) {
            var data={message:"success",data:savedData}
            callback(data)

        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);

        })
    },
    updateUser:function (body,callback) {
        user.updateOne(
            { "_id" : body.id },
            { $set: {
                name:body.name,
                phone:body.phone,
                designation:body.designation,
                address:body.address
            } },
            {runValidators: true}
        ).then(function (updateDate) {
            var data={message:"success",data:updateDate}
            callback(data)
        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);
        });
    },
    updatePassword:function (body,callback) {
        user.updateOne(
            { "_id" : body.id},
            { $set: {
                password:body.password1,
            } }
        ).then(function (updateDate) {
            var data={message:"success",data:updateDate}
            callback(data)
        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);
        });
    },
    updatePicture:function (body,callback) {
        user.updateOne(
            { "_id" : body.id},
            { $set: {
                photo:body.photo,
            } }
        ).then(function (updateDate) {
            var data={message:"success",data:updateDate}
            callback(data)
        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);
        });
    },
}
module.exports=userDal;