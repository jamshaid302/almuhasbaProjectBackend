var coa=require("../models/coa");
var mongoose=require("mongoose");
var coaTransactions = require('../models/coaTransaction');
var defaultGlCoa = require('../models/defaultGlCoa');
const customer = require("../models/customer");
const ObjectId = mongoose.Types.ObjectId;
var coaDal={
    addCoa:function (body,callback){
        var array = body.node.split('-');
        const length = array.length;
        console.log('LENGTH>>',length, 'ARRAY>>',array)

        //level 2 Child Addition
        if(length == 1){
            const key1 = body.key1;
            console.log('LENGTH 1');
            const coas = coa.find({
                key1: key1,
            }).then(function(data, err){
                console.log('DATA',data.length);
                if(data.length != 0){
                    var lastKey = data[0].key2;
                    for(var i=0; i<data.length; i++){
                        lastKey = Math.max(lastKey, data[i].key2);
                    }
                    console.log('LAST KEY',lastKey);
                    // console.log('LAST KEY', lastKey);
                    var newKey='';
                    if(lastKey != 0){
                        console.log('UPPER IF')
                        if(lastKey.toString().length >= 1){
                            newKey = '0'+parseInt(lastKey + 1);

                        }else{
                            newKey = '0'+parseInt(lastKey + 1);
                        }
                        console.log('NEW KEY>>>', newKey);
                        var coaObj = new coa({
                            key1:'01',
                            key2:newKey,
                            key3:null,
                            key4:null,
                            key5:null,
                            key6:null,
                            accountname:'01-'+newKey,
                            accounttitle:body.accounttitle,
                            behaviour:body.behaviour,
                        });
                        coaObj.save().then(function (savedData) {
                            var data={message:"success",data:savedData}
                            callback(data)
                        }).catch(function (err) {
                            var data={message:"error",data:err.message}
                            callback(data);

                        });
                    }else{
                        console.log('UPPER ELSE')
                        //mean last index is
                        console.log('ELSE PARTTTT');
                        var coaObj = new coa({
                            key1:'01',
                            key2:'01',
                            key3:null,
                            key4:null,
                            key5:null,
                            key6:null,
                            accountname:'01-01',
                            accounttitle:body.accounttitle,
                            behaviour:body.behaviour,
                        });
                        coaObj.save().then(function (savedData) {
                            var data={message:"success",data:savedData}
                            callback(data)
                        }).catch(function (err) {
                            var data={message:"error",data:err.message}
                            callback(data);
                        });
                    }
                    console.log('NEW KEY', newKey);
                }else{
                    var coaObj = new coa({
                        key1:'01',
                        key2:'01',
                        key3:null,
                        key4:null,
                        key5:null,
                        key6:null,
                        accountname:'01-01',
                        accounttitle:body.accounttitle,
                        behaviour:body.behaviour,
                    });
                    coaObj.save().then(function (savedData) {
                        var data={message:"success",data:savedData}
                        callback(data)
                    }).catch(function (err) {
                        var data={message:"error",data:err.message}
                        callback(data);
                    });
                }
                // var data={message:"error",data:err.message}
                // callback(data);
            }).catch(function (err){
                console.log('ERROR in lENGTH-2');
                var data={message:"error",data:err.message}
                callback(data);
            })
        }
        //Level 3 Child Addition
        if(length == 2){
            console.log('LENGTH 2');
            const coas = coa.find({
                $and: [
                    {key1: array[0]},
                    {key2: array[1]},
                ]
            }).then(function(data, err){
                // console.log(data[0]);
                var lastKey = data[0].key3;
                for(var i=0; i<data.length; i++){
                    lastKey = Math.max(lastKey, data[i].key3);
                }
                console.log('LAST KEY',lastKey);
                // console.log('LAST KEY', lastKey);
                var newKey='';
                if(lastKey != 0){
                    console.log('UPPER IF')
                    if(lastKey.toString().length >= 1){
                        newKey = '0'+parseInt(lastKey + 1);

                    }else{
                        newKey = '0'+parseInt(lastKey + 1);
                    }
                    console.log('NEW KEY>>>', newKey);
                    var coaObj = new coa({
                        key1:'01',
                        key2:array[1],
                        key3:newKey,
                        key4:null,
                        key5:null,
                        key6:null,
                        accountname:'01-'+array[1]+'-'+newKey,
                        accounttitle:body.accounttitle,
                        behaviour:body.behaviour,
                    });
                    coaObj.save().then(function (savedData) {
                        var data={message:"success",data:savedData}
                        callback(data)
                    }).catch(function (err) {
                        var data={message:"error",data:err.message}
                        callback(data);

                    });
                }else{
                    console.log('UPPER ELSE')
                    //mean last index is
                    console.log('ELSE PARTTTT');
                    var coaObj = new coa({
                        key1:'01',
                        key2:array[1],
                        key3:'01',
                        key4:null,
                        key5:null,
                        key6:null,
                        accountname:'01-'+array[1]+'-'+'01',
                        accounttitle:body.accounttitle,
                        behaviour:body.behaviour,
                    });
                    coaObj.save().then(function (savedData) {
                        var data={message:"success",data:savedData}
                        callback(data)
                    }).catch(function (err) {
                        var data={message:"error",data:err.message}
                        callback(data);
                    });
                }
                console.log('NEW KEY', newKey);
                // var data={message:"error",data:err.message}
                // callback(data);
            }).catch(function (err){
                console.log('ERROR in lENGTH-2');
                var data={message:"error",data:err.message}
                callback(data);
            })
        }
        //Level 4 Child Addition
        if(length == 3){
            console.log('LENGTH 3');
            const coas = coa.find({
                $and: [
                    {key1: array[0]},
                    {key2: array[1]},
                    {key3: array[2]},
                ]
            }).then(function(data){
                // console.log(data[0]);
                var lastKey = data[0].key4;
                for(var i=0; i<data.length; i++){
                    lastKey = Math.max(lastKey, data[i].key4);
                }
                console.log('LAST KEY',lastKey);

                // console.log('LAST KEY', lastKey);
                var newKey='';

                if(lastKey != 0){
                    console.log('UPPER IF')
                    if(lastKey.toString().length >= 1){
                        newKey = '0'+parseInt(lastKey + 1);

                    }else{
                        newKey = '0'+parseInt(lastKey + 1);
                    }
                    console.log('NEW KEY>>>', newKey);
                    var coaObj = new coa({
                        key1:'01',
                        key2:array[1],
                        key3:array[2],
                        key4:newKey,
                        key5:null,
                        key6:null,
                        accountname:'01-'+array[1]+'-'+array[2]+'-'+newKey,
                        accounttitle:body.accounttitle,
                        behaviour:body.behaviour,
                    });
                    coaObj.save().then(function (savedData) {
                        var data={message:"success",data:savedData}
                        callback(data)
                    }).catch(function (err) {
                        var data={message:"error",data:err.message}
                        callback(data);

                    });
                }else{
                    var coaObj = new coa({
                        key1:'01',
                        key2:array[1],
                        key3:array[2],
                        key4:'01',
                        key5:null,
                        key6:null,
                        accountname:'01-'+array[1]+'-'+array[2]+'-'+'01',
                        accounttitle:body.accounttitle,
                        behaviour:body.behaviour,
                    });
                    coaObj.save().then(function (savedData) {
                        var data={message:"success",data:savedData}
                        callback(data)
                    }).catch(function (err) {
                        var data={message:"error",data:err.message}
                        callback(data);

                    });
                }
                console.log('NEW KEY', newKey);
            }).catch(function (err){
                console.log('ERROR in lENGTH-3');
            })
        }
        //Level 5 Child Addition
        if(length == 4){
            console.log('LENGTH 4');
            const coas = coa.find({
                $and: [
                    {key1: array[0]},
                    {key2: array[1]},
                    {key3: array[2]},
                    {key4: array[3]},
                ]
            }).then(function(data){
                // console.log(data[0]);
                var lastKey = data[0].key5;
                for(var i=0; i<data.length; i++){
                    lastKey = Math.max(lastKey, data[i].key5);
                }
                console.log('LAST KEY',lastKey);

                // console.log('LAST KEY', lastKey);
                var newKey='';

                if(lastKey != 0){
                    console.log('UPPER IF')
                    if(lastKey.toString().length >= 1){
                        newKey = '0'+parseInt(lastKey + 1);
                    }else{
                        newKey = '0'+parseInt(lastKey + 1);
                    }
                    console.log('NEW KEY>>>', newKey);
                    var coaObj = new coa({
                        key1:'01',
                        key2:array[1],
                        key3:array[2],
                        key4:array[3],
                        key5:newKey,
                        key6:null,
                        accountname:'01-'+array[1]+'-'+array[2]+'-'+array[3]+'-'+newKey,
                        accounttitle:body.accounttitle,
                        behaviour:body.behaviour,
                    });
                    coaObj.save().then(function (savedData) {
                        var data={message:"success",data:savedData}
                        callback(data)
                    }).catch(function (err) {
                        var data={message:"error",data:err.message}
                        callback(data);

                    });
                }else{
                    var coaObj = new coa({
                        key1:'01',
                        key2:array[1],
                        key3:array[2],
                        key4:array[3],
                        key5:'01',
                        key6:null,
                        accountname:'01-'+array[1]+'-'+array[2]+'-'+array[3]+'-'+'01',
                        accounttitle:body.accounttitle,
                        behaviour:body.behaviour,
                    });
                    coaObj.save().then(function (savedData) {
                        var data={message:"success",data:savedData}
                        callback(data)
                    }).catch(function (err) {
                        var data={message:"error",data:err.message}
                        callback(data);

                    });
                }
                console.log('NEW KEY', newKey);
            }).catch(function (err){
                console.log('ERROR in lENGTH-4');
            })
        }
        //Level 6 Child Addition
        if(length == 5){
            console.log('LENGTH 5');
            // console.log('LENGTH 4');
            const coas = coa.find({
                $and: [
                    {key1: array[0]},
                    {key2: array[1]},
                    {key3: array[2]},
                    {key4: array[3]},
                    {key5: array[4]},
                ]
            }).then(function(data){
                // console.log(data[0]);
                var lastKey = data[0].key6;
                for(var i=0; i<data.length; i++){
                    lastKey = Math.max(lastKey, data[i].key6);
                }
                console.log('LAST KEY',lastKey);

                // console.log('LAST KEY', lastKey);
                var newKey='';

                if(lastKey != 0){
                    console.log('UPPER IF')
                    if(lastKey.toString().length >= 1){
                        newKey = '0'+parseInt(lastKey + 1);
                    }else{
                        newKey = '0'+parseInt(lastKey + 1);
                    }
                    console.log('NEW KEY>>>', newKey);
                    var coaObj = new coa({
                        key1:'01',
                        key2:array[1],
                        key3:array[2],
                        key4:array[3],
                        key5:array[4],
                        key6:newKey,
                        accountname:'01-'+array[1]+'-'+array[2]+'-'+array[3]+'-'+array[4]+'-'+newKey,
                        accounttitle:body.accounttitle,
                        behaviour:body.behaviour,
                    });
                    coaObj.save().then(function (savedData) {
                        var data={message:"success",data:savedData}
                        callback(data)
                    }).catch(function (err) {
                        var data={message:"error",data:err.message}
                        callback(data);

                    });
                }else{
                    var coaObj = new coa({
                        key1:'01',
                        key2:array[1],
                        key3:array[2],
                        key4:array[3],
                        key5:array[4],
                        key6:'01',
                        accountname:'01-'+array[1]+'-'+array[2]+'-'+array[3]+'-'+array[4]+'-'+'01',
                        accounttitle:body.accounttitle,
                        behaviour:body.behaviour,
                    });
                    coaObj.save().then(function (savedData) {
                        var data={message:"success",data:savedData}
                        callback(data)
                    }).catch(function (err) {
                        var data={message:"error",data:err.message}
                        callback(data);

                    });
                }
                console.log('NEW KEY', newKey);
            }).catch(function (err){
                console.log('ERROR in lENGTH-5');
            })
        }
        // var coaObj = new coa({
        //     key1:'01',
        //     key2:body.key2 !='' ? body.key2 : null,
        //     key3:body.key3 !='' ? body.key3 : null,
        //     key4:body.key4 !='' ? body.key4 : null,
        //     key5:body.key5 !='' ? body.key5 : null,
        //     key6:body.key6 !='' ? body.key6 : null,
        //     accountname:body.key,
        //     accounttitle:body.accounttitle,
        //     behaviour:body.behaviour,
        // });
        // coaObj.save().then(function (savedData) {
        //     var data={message:"success",data:savedData}
        //     callback(data)
        // }).catch(function (err) {
        //     var data={message:"error",data:err.message}
        //     callback(data);
        //
        // });
    },

    addCoaTransaction:function (body,callback){
        var coaTransactionObj = new coaTransactions({
            coaid:body.coaid,
            invoiceid:body.invoiceid,
            d_c:body.d_c,
            amount:parseFloat(body.amount),
            description:body.description,
            createdby:body.createdby,
        });
        coaTransactionObj.save().then(function (savedData) {
            var data={message:"success",data:savedData}
            callback(data)
        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);

        })
    },
    addDefaultGl:function(body, callback){
        var defaultGlCoaObj = new defaultGlCoa({
            coaname: body.accountName,
            coatype: body.accounttype,
        });
        defaultGlCoaObj.save().then(function (savedData) {
            var data={message:"success",data:savedData}
            callback(data)
        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);

        })
    },
    getAllCoa:function (id,callback) {
        var key1 = null, key2 = null, key3 = null, key4 = null, key5 = null, key6 = null;
        if(id==undefined){
            id='01';
        }
            var arr=id.split("-");
            arr.push({ $regex: /\w/ });
            arr.forEach(function (item,index){
                // console.log('HEREEEEEEEEEEEEEEE',item);
                if(index==0){
                    key1=item;
                }else if(index==1){
                    key2=item;
                }else if(index==2){
                    key3=item;
                }else if(index==3){
                    key4=item;
                }else if(index==4){
                    key5=item;
                }else if(index==5){
                    key6=item;
                }
            })
            coa.aggregate([
                { $match:
                        { key1: key1,key2: key2,key3: key3,key4: key4,key5: key5, key6: key6,},
                }
            ]).then(function (data){
                var coaData = [];
                for (var i=0;i< data.length;i++) {
                    coaData.push({
                        'id':data[i].accountname,
                        "icon":"fa fa-folder icon-lg kt-font-danger",
                        "text":data[i].accountname + ' '+data[i].accounttitle,
                        "children":true,
                    })

                }
                // {"id":"node_163532271544535","icon":"fa fa-folder icon-lg kt-font-success","text":"Node 1635322715","children":true}
                var arr={message:"success",data:coaData};
                callback(arr);
            }).catch(function (err) {
                var arr={message:"error",data:err.message}
                callback(arr);
            });
    },
    getAllCoaForSheet:function (callback) {
        coa.find().then(function (data){
            var arr={message:"success",data:data};
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        });
    },
    getCoaByTitle: function (id, callback){
        coa.find({
            accounttitle: RegExp(id, "i")
        }).then(function (data, err){
            var data={message:"success",data:data}
            callback(data)
        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);

        })
    }
}


module.exports = coaDal;