var mongoose=require("mongoose");
var dataTables = require('mongoose-datatables')
var Schema=mongoose.Schema;
const schema=Schema({
    categoryId: {type: mongoose.Schema.Types.ObjectId, ref: 'category',required: true},
    supplierId: {type: mongoose.Schema.Types.ObjectId, ref: 'supplier',required: true},
    carriageRateId: {type: mongoose.Schema.Types.ObjectId, ref: 'carriageRate',required: true},
    storeId: {type: mongoose.Schema.Types.ObjectId, ref: 'store',required: true},
    //contactor
    uploaderRate: {type: mongoose.Schema.Types.ObjectId, ref: 'contractorRate',required: true},
    uploaderBag:{ type: Number, required: true, min:1},
    downloaderRate: {type: mongoose.Schema.Types.ObjectId, ref: 'contractorRate',required: true},
    downloaderBag:{ type: Number, required: true, min:1},
    carriageRate: {type: mongoose.Schema.Types.ObjectId, ref: 'contractorRate',required: true},
    carriageBag:{ type: Number, required: true, min:1},
    supplierAmount : {type : Number,required:true},
    fakeCarriageWeight:{ type: Number, required: true, default:0},
    invoiceIdManual: { type: String, required: false,maxlength:10 },
    vehicleNumber: { type: String, required: true,maxlength:10,minlength:3 ,trim: true },
    gatePass: { type: String, required: true,maxlength:10, minlength:3 ,trim: true},
    driverName: { type: String, required: true,maxlength:30,minlength:3 ,trim: true },
    purchaseDate: { type: Date, default: Date.now },
    conveyno: { type: String, required: false },
    storageSlipNo: { type: String, required: false },
    purity: { type: String, required: false },
    uploaderClerk: { type: String, required: false },
    downloaderClerk: { type: String, required: false },
    note: { type: String, required: false,maxlength:1000 },
    tip:{type:Number, required:false,maxlength:20,default:0},
    //for weights
    farmGross: { type: Number, required: true,min:1 },
    farmTare: { type: Number, required: true,min:1 },
    factoryGross: { type: Number, required: true,min:1 },
    factoryTare: { type: Number, required: true,min:1 },
    //for deductions
    bardana: { type: Number, required: false },//for wheat deduction
    kanta: { type: Number, required: false },//for wheat deduction
    sangli: { type: Number, required: false },//for cotton deduction
    moisture: { type: Number, required: false },//for cotton deduction
    other: { type: Number, required: false },//for extra deductions
    //for fixation
    premium: {type: mongoose.Schema.Types.ObjectId, ref: 'premium',required: false},
    rate: { type: Number, required: false,min:1 },
    rateType: { type: String, required: false,enum : ['mund','kg'] },
    pageRef: { type: String, required: false,maxlength:10 },
    fixType: { type: String, required: false,enum : ['factory','farm'] },
    image: { type: String, required: false },//page ref image
    fixationDate: { type: Date, default: Date.now },
    suspect: { type: Boolean, required: true}, // if bags are equal then false else true
    fixationStatus: { type: Boolean, required: true , default:false },// if true then uneditable
    //for invoice
    status: { type: Boolean, required: true ,default: 0},//0 mean partialy or unpaid 1 mean fully paid and clear
    totalAmount: { type: Number, required: false },
    paidAmount: { type: Number, required: true,default: 0 },
    //for deletion
    isActive: { type: Boolean, required: true ,default: 1},
});
schema.index( { invoiceIdManual: "text" } )
schema.plugin(dataTables)
module.exports=mongoose.model("purchaseOrder",schema);