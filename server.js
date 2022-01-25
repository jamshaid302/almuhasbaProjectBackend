var express=require("express");
var cors = require('cors');
var app=express();
app.use(cors());
app.use('/assets',express.static('assets'));
app.use('/uploads',express.static('uploads'));
var bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
var config=require('./config.json');
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
var passport=require('passport');
app.use(passport.initialize());
app.use('/api',passport.authenticate('jwt', { session: false }));

app.get("/",function (req,res) {
    res.render('document', {domain: req.headers.host });
});

//routes
var login=require("./routes/auth/login");
app.use("/login/",login);
var registration=require("./routes/auth/registration");
app.use("/register/",registration);
//=======================================================purchase================================================
var category=require("./routes/purchase/category");
app.use("/api/category/",category);
var supplier=require("./routes/purchase/supplier");
app.use("/api/supplier/",supplier);
var warehouse=require("./routes/purchase/warehouse");
app.use("/api/warehouse/",warehouse);
var store=require("./routes/purchase/store");
app.use("/api/store/",store);
var farmAddress=require('./routes/purchase/farmAddress');
app.use("/api/farmaddress/",farmAddress);
var carriageRate=require("./routes/purchase/carriageRate");
app.use("/api/carriagerate/",carriageRate);
var contractor=require("./routes/purchase/contractor");
app.use("/api/contractor/",contractor);
var contractorRate=require("./routes/purchase/contractorRate");
app.use("/api/contractorrate/",contractorRate);
var purchaseOrder=require("./routes/purchase/purchaseOrder");
app.use("/api/purchaseorder/",purchaseOrder);
var purchaseLedger=require("./routes/purchase/purchaseLedger");
app.use("/api/purchaseledger/",purchaseLedger);
var premium=require("./routes/purchase/premium");
app.use("/api/premium/",premium);
var invoice=require("./routes/purchase/invoice");
app.use("/api/invoice/",invoice);

//==================================================germination routes====================================================
var wheatPurity=require("./routes/germination/wheatPurity");
app.use("/api/wheatpurity/",wheatPurity);
var cottonBudTest=require("./routes/germination/cottonBudTest");
app.use("/api/cottonbudtest/",cottonBudTest);

//==================================================Production============================================================
var commodityIssueForProduction=require("./routes/production/commodityIssueForProduction");
app.use("/api/commodityissueforproduction/",commodityIssueForProduction);
var productItem=require("./routes/production/productItem");
app.use("/api/productitem/",productItem);
var productionOutput=require("./routes/production/productionOutput");
app.use("/api/productionoutput/",productionOutput);
var dry=require("./routes/production/dry");
app.use("/api/dry/",dry)
var packingSize=require("./routes/production/packingSize");
app.use("/api/packingsize",packingSize);
var saleStore=require("./routes/production/saleStore");
app.use("/api/salestore",saleStore);
var stock=require("./routes/production/stock");
app.use("/api/stock",stock);
var packing=require("./routes/production/packing");
app.use("/api/packing",packing);


//================================================Sale==========================================
var customer=require("./routes/sale/customer");
app.use("/api/customer",customer);
var saleOfficer=require("./routes/sale/saleOfficer");
app.use("/api/saleofficer",saleOfficer);
var payment=require("./routes/sale/payment");
app.use("/api/payment",payment);
var rateList=require("./routes/sale/rateList");
app.use("/api/ratelist",rateList);
var book=require("./routes/sale/book");
app.use("/api/book",book);
var discount=require("./routes/sale/discount");
app.use("/api/discount",discount);
var shiped=require("./routes/sale/shipped");
app.use("/api/shipped",shiped);
//================================================COA============================================
const coa = require("./routes/coa/coa");
app.use("/api/coa", coa);
//================================================BANK============================================
const bank = require("./routes/bank/bank");
app.use("/api/bank", bank);

//================================================REPORTS============================================
const reports = require("./routes/reports/reports");
app.use("/api/reports", reports);

//================================================SHEET============================================
const sheet = require("./routes/sheet/sheet");
app.use("/api/sheet", sheet);

//server
const port = process.env.PORT || config.port;
app.listen(port,function () {
    console.log("Listening at port",port);
});