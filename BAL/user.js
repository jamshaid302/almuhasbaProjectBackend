var userDal=require("../DAL/user");
var userBal={
    getAllUsers:function (callback) {
        userDal.getAllUsers(function (data,err) {
            callback(data);
        });
    },
    getUserById:function (id,callback) {
        userDal.getUserById(id,function (data,err) {
            callback(data);
        });
    },
    getUserByEmail:function (id,callback) {
    userDal.getUserByEmail(id,function (data,err) {
        callback(data);
    });
},

    addUser:function (body,callback) {
        userDal.addUser(body,function (data,err) {
            callback(data);
        })
    },
    updateUser:function (body,callback) {
        userDal.updateUser(body,function (data,err) {
            callback(data);
        })
    },
    updatePassword:function (body,callback) {
        userDal.updatePassword(body,function (data,err) {
            callback(data);
        })
    },
    updatePicture:function (body,callback) {
        userDal.updatePicture(body,function (data,err) {
            callback(data);
        })
    },
    deleteUser:function (id,callback) {
        userDal.deleteUser(id,function (data,err) {
            callback(data);
        })
    }

}
module.exports=userBal;