const AccessControl = require("accesscontrol");

const flatList = [
    { role: 'admin', resource: 'category', action: 'create:any' },
    { role: 'admin', resource: 'category', action: 'read:any' },
    { role: 'admin', resource: 'category', action: 'update:any' },
    { role: 'admin', resource: 'category', action: 'delete:any' },

    { role: 'admin', resource: 'supplier', action: 'create:any' },
    { role: 'admin', resource: 'supplier', action: 'read:any' },
    { role: 'admin', resource: 'supplier', action: 'update:any' },
    { role: 'admin', resource: 'supplier', action: 'delete:any' },

    { role: 'admin', resource: 'warehouse', action: 'create:any' },
    { role: 'admin', resource: 'warehouse', action: 'read:any' },
    { role: 'admin', resource: 'warehouse', action: 'update:any' },
    { role: 'admin', resource: 'warehouse', action: 'delete:any' },

    { role: 'admin', resource: 'store', action: 'create:any' },
    { role: 'admin', resource: 'store', action: 'read:any' },
    { role: 'admin', resource: 'store', action: 'update:any' },
    { role: 'admin', resource: 'store', action: 'delete:any' },

    { role: 'admin', resource: 'farmAddress', action: 'create:any' },
    { role: 'admin', resource: 'farmAddress', action: 'read:any' },
    { role: 'admin', resource: 'farmAddress', action: 'update:any' },
    { role: 'admin', resource: 'farmAddress', action: 'delete:any' },

    { role: 'admin', resource: 'carriageRate', action: 'create:any' },

    { role: 'admin', resource: 'contractor', action: 'create:any' },
    { role: 'admin', resource: 'contractor', action: 'read:any' },
    { role: 'admin', resource: 'contractor', action: 'update:any' },
    { role: 'admin', resource: 'contractor', action: 'delete:any' },

    { role: 'admin', resource: 'contractorRate', action: 'read:any' },
    { role: 'admin', resource: 'contractorRate', action: 'create:any' },
    { role: 'admin', resource: 'contractorRate', action: 'delete:any' },

    { role: 'admin', resource: 'purchaseOrder', action: 'create:any' },
    { role: 'admin', resource: 'purchaseOrder', action: 'read:any' },
    { role: 'admin', resource: 'purchaseOrder', action: 'update:any' },
    { role: 'admin', resource: 'purchaseOrder', action: 'delete:any' },

    { role: 'admin', resource: 'purchaseLedger', action: 'create:any' },
    { role: 'admin', resource: 'purchaseLedger', action: 'read:any' },
    { role: 'admin', resource: 'purchaseLedger', action: 'update:any' },
    { role: 'admin', resource: 'purchaseLedger', action: 'delete:any' },

    { role: 'admin', resource: 'premium', action: 'create:any' },
    { role: 'admin', resource: 'premium', action: 'read:any' },
    { role: 'admin', resource: 'premium', action: 'update:any' },
    { role: 'admin', resource: 'premium', action: 'delete:any' },

    { role: 'admin', resource: 'invoice', action: 'create:any' },
    { role: 'admin', resource: 'invoice', action: 'read:any' },
    { role: 'admin', resource: 'invoice', action: 'update:any' },
    { role: 'admin', resource: 'invoice', action: 'delete:any' },

    { role: 'admin', resource: 'wheatPurity', action: 'create:any' },
    { role: 'admin', resource: 'wheatPurity', action: 'read:any' },
    { role: 'admin', resource: 'wheatPurity', action: 'update:any' },
    { role: 'admin', resource: 'wheatPurity', action: 'delete:any' },

    { role: 'admin', resource: 'cottonBudTest', action: 'create:any' },
    { role: 'admin', resource: 'cottonBudTest', action: 'read:any' },
    { role: 'admin', resource: 'cottonBudTest', action: 'update:any' },
    { role: 'admin', resource: 'cottonBudTest', action: 'delete:any' },

    { role: 'admin', resource: 'commodityIssueForProductionBal', action: 'create:any' },
    { role: 'admin', resource: 'commodityIssueForProductionBal', action: 'read:any' },
    { role: 'admin', resource: 'commodityIssueForProductionBal', action: 'update:any' },
    { role: 'admin', resource: 'commodityIssueForProductionBal', action: 'delete:any' },

    { role: 'admin', resource: 'productItem', action: 'create:any' },
    { role: 'admin', resource: 'productItem', action: 'read:any' },
    { role: 'admin', resource: 'productItem', action: 'update:any' },
    { role: 'admin', resource: 'productItem', action: 'delete:any' },

    { role: 'admin', resource: 'productionOutput', action: 'create:any' },
    { role: 'admin', resource: 'productionOutput', action: 'read:any' },
    { role: 'admin', resource: 'productionOutput', action: 'update:any' },
    { role: 'admin', resource: 'productionOutput', action: 'delete:any' },

    { role: 'admin', resource: 'dry', action: 'create:any' },
    { role: 'admin', resource: 'dry', action: 'read:any' },
    { role: 'admin', resource: 'dry', action: 'update:any' },
    { role: 'admin', resource: 'dry', action: 'delete:any' },

    { role: 'admin', resource: 'packingSize', action: 'create:any' },
    { role: 'admin', resource: 'packingSize', action: 'read:any' },
    { role: 'admin', resource: 'packingSize', action: 'update:any' },
    { role: 'admin', resource: 'packingSize', action: 'delete:any' },

    { role: 'admin', resource: 'saleStore', action: 'create:any' },
    { role: 'admin', resource: 'saleStore', action: 'read:any' },
    { role: 'admin', resource: 'saleStore', action: 'update:any' },
    { role: 'admin', resource: 'saleStore', action: 'delete:any' },

    { role: 'admin', resource: 'stock', action: 'create:any' },
    { role: 'admin', resource: 'stock', action: 'read:any' },
    { role: 'admin', resource: 'stock', action: 'update:any' },
    { role: 'admin', resource: 'stock', action: 'delete:any' },

    { role: 'admin', resource: 'packing', action: 'create:any' },
    { role: 'admin', resource: 'packing', action: 'read:any' },
    { role: 'admin', resource: 'packing', action: 'update:any' },
    { role: 'admin', resource: 'packing', action: 'delete:any' },

    { role: 'admin', resource: 'customer', action: 'create:any' },
    { role: 'admin', resource: 'customer', action: 'read:any' },
    { role: 'admin', resource: 'customer', action: 'update:any' },
    { role: 'admin', resource: 'customer', action: 'delete:any' },

    { role: 'admin', resource: 'saleofficer', action: 'create:any' },
    { role: 'admin', resource: 'saleofficer', action: 'read:any' },
    { role: 'admin', resource: 'saleofficer', action: 'update:any' },
    { role: 'admin', resource: 'saleofficer', action: 'delete:any' },

    { role: 'admin', resource: 'payment', action: 'create:any' },
    { role: 'admin', resource: 'payment', action: 'read:any' },
    { role: 'admin', resource: 'payment', action: 'update:any' },
    { role: 'admin', resource: 'payment', action: 'delete:any' },

    { role: 'admin', resource: 'ratelist', action: 'create:any' },
    { role: 'admin', resource: 'ratelist', action: 'read:any' },
    { role: 'admin', resource: 'ratelist', action: 'update:any' },
    { role: 'admin', resource: 'ratelist', action: 'delete:any' },

    { role: 'admin', resource: 'book', action: 'create:any' },
    { role: 'admin', resource: 'book', action: 'read:any' },
    { role: 'admin', resource: 'book', action: 'update:any' },
    { role: 'admin', resource: 'book', action: 'delete:any' },

    { role: 'admin', resource: 'discount', action: 'create:any' },
    { role: 'admin', resource: 'discount', action: 'read:any' },
    { role: 'admin', resource: 'discount', action: 'update:any' },
    { role: 'admin', resource: 'discount', action: 'delete:any' },

    //roles for guest
    { role: 'guest', resource: 'category', action: 'read:any' },

    { role: 'guest', resource: 'supplier', action: 'read:any' },

    { role: 'guest', resource: 'warehouse', action: 'read:any' },

    { role: 'guest', resource: 'store', action: 'read:any' },

    { role: 'guest', resource: 'farmAddress', action: 'read:any' },

    { role: 'guest', resource: 'carriageRate', action: 'read:any' },

    { role: 'guest', resource: 'contractor', action: 'read:any' },

    { role: 'guest', resource: 'contractorRate', action: 'read:any' },

    { role: 'guest', resource: 'purchaseOrder', action: 'read:any' },

    { role: 'guest', resource: 'premium', action: 'read:any' },

    { role: 'guest', resource: 'invoice', action: 'read:any' },

    { role: 'guest', resource: 'wheatPurity', action: 'read:any' },

    { role: 'guest', resource: 'cottonBudTest', action: 'read:any' },

    { role: 'guest', resource: 'commodityIssueForProductionBal', action: 'read:any' },

    { role: 'guest', resource: 'productItem', action: 'read:any' },

    { role: 'guest', resource: 'productionOutput', action: 'read:any' },

    { role: 'guest', resource: 'discount', action: 'read:any' },

    //roles for supervisor
];
const ac = new AccessControl(flatList);
exports.roles = (function() {
    return ac;
})();