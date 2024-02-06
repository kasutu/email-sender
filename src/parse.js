"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortOrders = exports.getJsonFile = exports.parseCsv = void 0;
const fs = __importStar(require("fs"));
const Papa = __importStar(require("papaparse"));
const util_1 = __importDefault(require("util"));
function parseCsv() {
    const csvData = fs.readFileSync('./orders.csv', 'utf8');
    Papa.parse(csvData, {
        header: true,
        complete: (results) => {
            const orders = results.data.map((row) => {
                const items = []; // Parse items from row into Item[] array
                console.log(row.customerName);
                items.push({
                    name: 'Lanyard',
                    quantity: Number(row.quantity),
                    price: Number(119),
                    discount: Number(row.discount ? row.discount.replace('%', '') : 0),
                    subtotal: Number(row.payableAmount),
                });
                const res = {
                    email: row.email,
                    orderId: Math.floor(100000 + Math.random() * 900000).toString(),
                    customerName: row.customerName,
                    items,
                    total: Number(row.payableAmount),
                    paymentStatus: row.paymentStatus,
                };
                return res;
            });
            console.log('Done Parsing');
            fs.writeFile('orders.json', JSON.stringify(orders, null, 2), (err) => {
                if (err) {
                    console.error('Error writing file', err);
                }
                else {
                    console.log('Successfully wrote orders to orders.json');
                }
            });
        },
    });
}
exports.parseCsv = parseCsv;
// Convert fs.readFile into Promise version to use with async/await
const readFile = util_1.default.promisify(fs.readFile);
function getJsonFile(filename) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield readFile(filename, 'utf8');
            return JSON.parse(data);
        }
        catch (err) {
            console.error(`Error reading file from disk: ${filename}`, err);
            return null;
        }
    });
}
exports.getJsonFile = getJsonFile;
function sortOrders(orders) {
    return orders.sort((a, b) => a.customerName.localeCompare(b.customerName));
}
exports.sortOrders = sortOrders;
