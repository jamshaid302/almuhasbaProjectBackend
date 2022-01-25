var mongoose=require("mongoose");
var config=require("../config.json");

mongoose.connect(config.mongodatabaseConnection,{ useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true});
//db.serverStatus().connections run this cmd on shell for checking connections
//mongoose.Promise=global.Promise;
module.exports={
    //Purchase
    'category':require("../models/category"),
    'supplier':require("../models/supplier"),
    'warehouse':require("../models/warehouse"),
    'store':require("../models/store"),
    'farmAddress':require("../models/farmAddress"),
    'carriageRate':require("../models/carriageRate"),
    'contractor':require("../models/contractor"),
    'contractorRate':require("../models/contractorRate"),
    'purchaseOrder':require("../models/purchaseOrder"),
    'user':require("../models/user"),
    'premium':require("../models/premium"),
    'invoice':require("../models/invoice"),
    'wheatPurity':require("../models/wheatPurity"),
    'commodityIssueForProduction':require("../models/commodityIssueForProduction"),
    'productItem':require("../models/productItem"),
    'productionOutput':require("../models/productionOutput"),
    'purchaseLedger':require("../models/purchaseLedger"),
    'dry':require("../models/dry")
}