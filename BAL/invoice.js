var invoiceDal=require("../DAL/invoice");
var purchaseOrder=require("../DAL/purchaseOrder");
var purchaseLedgerDal=require("../DAL/purchaseLedger");
var invoiceBal={
    getAllInvoice:function (callback) {
        invoiceDal.getAllInvoice(function (data,err) {
            callback(data);
        });
    },
    getInvoiceById:function (id,callback) {
        invoiceDal.getInvoiceById(id,function (data,err) {
            callback(data);
        });
    },
    createInvoiceById:function (id,callback) {
        invoiceDal.createInvoiceById(id,function (data,err) {
            callback(data);
        });
    },
    getInvoiceByOrderId:function (id,callback) {
        invoiceDal.getInvoiceByOrderId(id,function (data,err) {
            callback(data);
        });
    },


    addInvoice:function (body,callback) {
        invoiceDal.addInvoice(body,function (data,err) {
            if(data.message=="success"){
                purchaseOrder.getPurchaseOrderById(body.purchaseOrderId,function (data1,err1) {
                    if(data1.message=="success"){
                        var totalpaid = data1.data[0].paidAmount+parseInt(body.amount);
                        var newbody={id:body.purchaseOrderId,paidAmount:totalpaid,status:data1.data[0].totalAmount-totalpaid==0?1:0}
                        purchaseOrder.updatePayment(newbody,function (data2,err2) {
                            if(data2.message=="success"){
                                purchaseLedgerDal.addSupplierLedger({
                                    order: data1.data[0]._id,
                                    supplier: data1.data[0].supplierId,
                                    amount: body.amount,
                                    invoiceId:data.data._id,
                                    dc: 'd'
                                },function (ledgedata){
                                    if(ledgedata.message=="success"){
                                        invoiceDal.getInvoiceByOrderId(body.purchaseOrderId,function (data3,err3) {
                                            callback(data3)
                                        })
                                    }
                                    else{
                                        callback(ledgedata)
                                    }
                                })
                            }
                            else {
                                callback(data2)
                            }

                        })
                    }else{
                        callback(data1);
                    }

                })

            }else {
                callback(data);
            }

        })
    },
    updateInvoice:function (body,callback) {
        invoiceDal.updateInvoice(body,function (data,err) {
            callback(data);
        })
    },
    deleteInvoice:function (id,callback) {
        invoiceDal.deleteInvoice(id,function (data,err) {
            callback(data);
        })
    }

}
module.exports=invoiceBal;