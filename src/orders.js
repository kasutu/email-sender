"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrders = void 0;
const parse_1 = require("./parse");
const isProd = false;
function getOrders() {
    return __awaiter(this, void 0, void 0, function* () {
        if (isProd) {
            (0, parse_1.parseCsv)();
            return (0, parse_1.sortOrders)(yield (0, parse_1.getJsonFile)('orders.json'));
        }
        return [
            {
                customerName: 'Jerome Cabugwason',
                email: 'jeromecabugwason2@gmail.com',
                items: [
                    {
                        name: 'Lanyard',
                        quantity: 1,
                        price: 100,
                        discount: 0,
                        subtotal: 100,
                    },
                    {
                        name: 'Hoodie',
                        quantity: 1,
                        price: 1000,
                        discount: 0,
                        subtotal: 1000,
                    },
                ],
                orderId: '234233',
                paymentStatus: 'Paid',
                total: 1100,
            },
            {
                customerName: 'Cabugwason, Jerome',
                email: 'jeromecabugwason2@gmail.com',
                items: [
                    {
                        name: 'Lanyard',
                        quantity: 1,
                        price: 100,
                        discount: 0,
                        subtotal: 100,
                    },
                    {
                        name: 'Hoodie',
                        quantity: 1,
                        price: 1000,
                        discount: 0,
                        subtotal: 1000,
                    },
                ],
                orderId: '234233',
                paymentStatus: 'Paid',
                total: 1100,
            },
        ];
    });
}
exports.getOrders = getOrders;
// should add a getter function that sorts the orders by name A-Z
// should add a parser that parses the csv to the order interface
