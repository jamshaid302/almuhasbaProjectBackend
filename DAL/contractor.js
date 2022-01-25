var contractor=require("../models/contractor");
var contractorRate=require("../models/contractorRate");
var db=require("../utility/conn");
var mongoose=require("mongoose");
var defaultGl = require('../models/defaultGlCoa');
const coaDal = require("../DAL/coa");
const wheatPurity = require("../models/wheatPurity");
const purchaseExpenses = require("../models/purchaseExpences");
const ObjectId = mongoose.Types.ObjectId;
var contractorDal={
    getAllContractor:function (callback) {
        contractor.find({isActive:true}).then(function (data) {
            var arr={message:"success",data:data};
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message};
            callback(arr);
        });
    },
    getContractorById:function (id,callback) {
        contractor.find({_id : id,isActive:true}).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        });
    },

    getContractorExpenseByUserSearch: async function (body,callback) {

        var lusifer ;
        if(body.contractorId != "all"){
            contractorRate.find({"contractorId":ObjectId(body.data.contractorId)}).then(async function (data){
                var d = data;
                var doublecheck = [];
                for(var index=0;index<data.length;index++){
                    var id = data[index]._doc._id.toString();

                 var v = await purchaseExpenses.aggregate([
                        {
                            $match: {"contractorRateId": ObjectId(id),
                                date:{$gte:new Date(body.data.startDate),$lt:new Date(body.data.endDate)}
                            }
                        },
                        {
                            $lookup: {
                                from: "contractorrates",
                                let: {conRateId: "$contractorRateId"},
                                pipeline: [{$match: {$expr: {$eq: ["$_id", "$$conRateId"]}}},
                                    {
                                        $lookup:{
                                            from:"contractors",
                                            let:{conId:"$contractorId"},
                                            pipeline:[{$match: { $expr: { $eq: ["$_id", "$$conId"] }},}, ],
                                            as:"asContractorData",
                                        }
                                    },
                                    { $unwind : { path: "$asContractorData", preserveNullAndEmptyArrays: true } },
                                ],
                                as:"asContractorRateData"
                            }
                        },
                     {
                         $lookup: {
                             from: "contractorrates",
                             let: {conRateId: "$contractorRateId"},
                             pipeline: [{$match: {$expr: {$eq: ["$_id", "$$conRateId"]}}},
                                 {
                                     $lookup:{
                                         from:"contractors",
                                         let:{conId:"$contractorId"},
                                         pipeline:[{$match: { $expr: { $eq: ["$_id", "$$conId"] }},}, ],
                                         as:"asContractorData",
                                     }
                                 },
                                 { $unwind : { path: "$asContractorData", preserveNullAndEmptyArrays: true } },
                             ],
                             as:"asContractorRateData"
                         }
                     },
                     { $unwind : { path: "$asContractorRateData", preserveNullAndEmptyArrays: true } },

                     // get repeated elements uniquely by doing the below code in which the name,phone,type are repeat but
                     // we need anyone of them so we did this to get single single value from all of these because
                     // a single use can have multiple records but we get multiple name of same person we code and single name of user
                     {
                         $group: {
                             _id:{"idFname" : "$asContractorRateData.asContractorData.firstName",
                                 "idLname" : "$asContractorRateData.asContractorData.lastName",
                                 "idphone" : "$asContractorRateData.asContractorData.phone",
                                 "idtype" : "$asContractorRateData.asContractorData.type",
                                 "idconRateid" : "$asContractorRateData._id",
                             },
                             paidsum: {$sum: "$paid"},
                             amountsum: {$sum: "$amount"},
                             theProcess: {
                                 $push: "$process"
                             },
                             theDate: {
                                 $push: "$date"
                             },
                             theAmount: {
                                 $push: "$amount"
                             },
                             theRate : {
                                 $push : "$rate"
                             },
                             thePaid : {
                                 $push : "$paid"
                             }
                         },
                     },
                     {
                         $project: {
                             paidsum : 1,
                             amountsum : 1,
                             conRateID : '$_id.idconRateid',
                             Fname: '$_id.idFname',
                             Lname: '$_id.idLname',
                             phone: '$_id.idphone',
                             type: '$_id.idtype',
                             process : "$theProcess",
                             date : "$theDate",
                             amount : "$theAmount",
                             rate : "$theRate",
                             paid : "$thePaid",
                         }
                     }
                    ]).then(function (reportData) {
                     doublecheck.push(reportData);
                     lusifer = doublecheck;

                 }).catch(function (err) {
                     var data={message:"error",data:err.message}
                     callback(data);
                 });

                 //working here fine
                    var data={message:"success",data:lusifer[0]}
                    callback(data)

                }

            });
        }
        else {
                    purchaseExpenses.aggregate([
                        {
                            $match: { date:{$gte:new Date(body.startDate),$lt:new Date(body.endDate)}}
                        },
                        {
                            $lookup: {
                                from: "contractorrates",
                                let: {conRateId: "$contractorRateId"},
                                pipeline: [{$match: {$expr: {$eq: ["$_id", "$$conRateId"]}}},
                                    {
                                        $lookup:{
                                            from:"contractors",
                                            let:{conId:"$contractorId"},
                                            pipeline:[{$match: { $expr: { $eq: ["$_id", "$$conId"] }},}, ],
                                            as:"asContractorData",
                                        }
                                    },
                                    { $unwind : { path: "$asContractorData", preserveNullAndEmptyArrays: true } },
                                ],
                                as:"asContractorRateData"
                            }
                        },
                        { $unwind : { path: "$asContractorRateData", preserveNullAndEmptyArrays: true } },

                        // get repeated elements uniquely by doing the below code in which the name,phone,type are repeat but
                        // we need anyone of them so we did this to get single single value from all of these because
                        // a single use can have multiple records but we get multiple name of same person we code and single name of user
                        {
                            $group: {
                                _id:{"idFname" : "$asContractorRateData.asContractorData.firstName",
                                    "idLname" : "$asContractorRateData.asContractorData.lastName",
                                    "idphone" : "$asContractorRateData.asContractorData.phone",
                                    "idtype" : "$asContractorRateData.asContractorData.type",
                                    "idconRateid" : "$asContractorRateData._id",
                                    },
                                paidsum: {$sum: "$paid"},
                                amountsum: {$sum: "$amount"},
                                theProcess: {
                                    $push: "$process"
                                },
                                theDate: {
                                    $push: "$date"
                                },
                                theAmount: {
                                    $push: "$amount"
                                },
                                theRate : {
                                    $push : "$rate"
                                },
                                thePaid : {
                                    $push : "$paid"
                                }
                            },
                        },
                        {
                            $project: {
                                paidsum : 1,
                                amountsum : 1,
                                conRateID : '$_id.idconRateid',
                                Fname: '$_id.idFname',
                                Lname: '$_id.idLname',
                                phone: '$_id.idphone',
                                type: '$_id.idtype',
                                process : "$theProcess",
                                date : "$theDate",
                                amount : "$theAmount",
                                rate : "$theRate",
                                paid : "$thePaid",
                            }
                        }
                    ]).then(function (reportData) {
                        var data={message:"success",data:reportData};
                        callback(data);
                    }).catch(function (err) {
                        var data={message:"error",data:err.message};
                        callback(data);
                    });
        }
    },

    getContractorDetailById:function (id,callback) {
        contractor.aggregate([
            { $match: {
                isActive:true,_id:ObjectId(id)
            }},
            { $lookup: {
                from: 'contractorrates',
                localField: '_id',
                foreignField: 'contractorId',
                as: 'contractorData'
            }},
            { $unwind : { path: "$contractorData", preserveNullAndEmptyArrays: true } },
            {
                $match:  { "contractorData.isActive":true }
            },
        ]).then(function (data) {
            var arr={message:"success",data:data}
            callback(arr);
        }).catch(function (err) {
            var arr={message:"error",data:err.message}
            callback(arr);
        })
    },
    // addContractor:function (body,callback) {
    //     var con=new contractor({
    //         firstName:body.firstName,
    //         lastName:body.lastName,
    //         address:body.address,
    //         cnic:body.cnic,
    //         phone:body.phone,
    //         type:body.type,
    //     });
    //     con.save().then(function (savedData) {
    //         var data={message:"success",data:savedData};
    //         callback(data);
    //     }).catch(function (err) {
    //         var data={message:"error",data:err.message};
    //         callback(data);
    //
    //     })
    // },
    // after changing
    addContractor:function (body,callback) {
        defaultGl.find({coatype:'Contractor'}).then(function (coaData){
            if(coaData.length>0){
        var con=new contractor({
            firstName:body.firstName,
            lastName:body.lastName,
            address:body.address,
            cnic:body.cnic,
            phone:body.phone,
            type:body.type,
        });
        con.save().then(function (savedData) {
            const coaBody = {
                'node': coaData[0].coaname,
                'accounttitle': body.firstName+" "+body.lastName,
                'behaviour':'Credit',
            };
            coaDal.addCoa(coaBody, function(data,err){
                if(data.message=="error"){
                    var data={message:"success",data:savedData}
                    callback(data)
                }else if(data.message=="success") {
                    var data={message:"Error in coa Creating in Supplier",data:savedData}
                    callback(data)
                }
            });
            var data={message:"success",data:savedData}
            callback(data)

        }).catch(function (err) {
            var data={message:"error",data:err.message};
            callback(data);

        })
            }else{
                var data={message:"error",data:"Please Setup DefaultGl account of contractor in account section."}
                callback(data);
            }

        }).catch(function (err1){
            var data={message:"error",data:err1.message}
            callback(data);
        });
    },
    updateContractor:function (body,callback) {
        contractor.updateOne(
            { "_id" : body.id },
            { $set: {
                firstName:body.firstName,
                lastName:body.lastName,
                address:body.address,
                cnic:body.cnic,
                phone:body.phone,
                type:body.type,
            } },
            {runValidators: true}
        ).then(function (updateDate) {
            var data={message:"success",data:updateDate};
            callback(data);
        }).catch(function (err) {
            var data={message:"error",data:err.message};
            callback(data);
        });

    },
    deleteContractor:function (id,callback) {
        contractor.updateOne(
            { "_id" : id },
            { $set: {
                isActive:false
            } },
        ).then(function (updateDate) {
            contractorRate.updateMany(
                { "contractorId" : id },
                { $set: {
                        isActive:false
                    } },
            ).then(function (updateDate) {
                var data={message:"success",data:updateDate}
                callback(data)
            }).catch(function (err) {
                var data={message:"error",data:err.message}
                callback(data);
            });
            var data={message:"success",data:updateDate}
            callback(data)
        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);
        });
    },

    ExpensebyId:function (body,callback) {
        // var supId = '';
        // if(body.supplier !== ''){
        //     supId = ObjectId(body.supplier);
        // }else{
        //     supId = "$$supId";
        // }
        var d = body;
        var saveArray = [] ;
        if(body.contractorId != "all"){
            purchaseExpenses.aggregate([
                {
                    $match: {"contractorRateId": ObjectId(body.conid),
                        date:{$gte:new Date(body.startDate),$lt:new Date(body.endDate)}
                    }
                },
                {
                    $lookup: {
                        from: "contractorrates",
                        let: {conRateId: "$contractorRateId"},
                        pipeline: [{$match: {$expr: {$eq: ["$_id", "$$conRateId"]}}},
                            {
                                $lookup:{
                                    from:"contractors",
                                    let:{conId:"$contractorId"},
                                    pipeline:[{$match: { $expr: { $eq: ["$_id", "$$conId"] }},}, ],
                                    as:"asContractorData",
                                }
                            },
                            { $unwind : { path: "$asContractorData", preserveNullAndEmptyArrays: true } },
                        ],
                        as:"asContractorRateData"
                    }
                },
                { $unwind : { path: "$asContractorRateData", preserveNullAndEmptyArrays: true } },

                // get repeated elements uniquely by doing the below code in which the name,phone,type are repeat but
                // we need anyone of them so we did this to get single single value from all of these because
                // a single use can have multiple records but we get multiple name of same person we code and single name of user

                {
                    $project: {

                        conRateID : '$asContractorRateData._id',
                        process : 1,
                        date : 1,
                        amount : 1,
                        rate : 1,
                        paid : 1,
                    }
                }
            ]).then(function (reportData) {
                var data={message:"success",data:reportData}
                callback(data)
            }).catch(function (err) {
                var data={message:"error",data:err.message}
                callback(data);
            });
        }
        else{
            purchaseExpenses.aggregate([
                {
                    $match: {"contractorRateId": ObjectId(body.conid),
                        date:{$gte:new Date(body.startDate),$lt:new Date(body.endDate)}
                    }
                },
                {
                    $lookup: {
                        from: "contractorrates",
                        let: {conRateId: "$contractorRateId"},
                        pipeline: [{$match: {$expr: {$eq: ["$_id", "$$conRateId"]}}},
                            {
                                $lookup:{
                                    from:"contractors",
                                    let:{conId:"$contractorId"},
                                    pipeline:[{$match: { $expr: { $eq: ["$_id", "$$conId"] }},}, ],
                                    as:"asContractorData",
                                }
                            },
                            { $unwind : { path: "$asContractorData", preserveNullAndEmptyArrays: true } },
                        ],
                        as:"asContractorRateData"
                    }
                },
                { $unwind : { path: "$asContractorRateData", preserveNullAndEmptyArrays: true } },

                // get repeated elements uniquely by doing the below code in which the name,phone,type are repeat but
                // we need anyone of them so we did this to get single single value from all of these because
                // a single use can have multiple records but we get multiple name of same person we code and single name of user

                {
                    $project: {

                        conRateID : '$asContractorRateData._id',
                        // Fname: '$_id.idFname',
                        // Lname: '$_id.idLname',
                        // phone: '$_id.idphone',
                        // type: '$_id.idtype',
                        process : 1,
                        date : 1,
                        amount : 1,
                        rate : 1,
                        paid : 1,
                    }
                }
            ]).then(function (reportData) {
                var data={message:"success",data:reportData}
                callback(data)
            }).catch(function (err) {
                var data={message:"error",data:err.message}
                callback(data);
            });
        }
    },

    payContractor:function (paydata,callback) {
        var d = paydata;
        // {
        //     $match: { _id : ObjectId(paydata.data.id),process : paydata.data.process , date : {$eq: new Date(paydata.data.date) } }
        // },
        purchaseExpenses.aggregate([
            {
                $match: { _id : ObjectId(paydata.data.id) }
            },
            // , date : {$eq: ISODate(paydata.date) } }
        ]).then(function (reportData) {
            var data={message:"success",data:reportData}
            callback(data)
        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);
        });
    },

    PaytoContractor:function (paydata,callback) {
        purchaseExpenses.findOneAndUpdate(
            { contractorRateId : ObjectId(paydata.conid),process : paydata.conprocess , date : {$eq: new Date(paydata.condate) } },
            { $set: {
                    paid: parseInt(paydata.conpaid) + parseInt(paydata.connewpaid)
                } },

            // , date : {$eq: ISODate(paydata.date) } }
        ).then(function (reportData) {
            var data={message:"success",data:reportData}
            callback(data)
        }).catch(function (err) {
            var data={message:"error",data:err.message}
            callback(data);
        });
    }

}
module.exports=contractorDal;