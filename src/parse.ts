import * as fs from 'fs';
import * as Papa from 'papaparse';
import util from 'util';
import { Order, Item } from './orders';

interface OrderRow {
  role: string;
  customerName: string;
  quantity: string;
  subtotal: string;
  discount: string;
  payableAmount: string;
  paymentStatus: string;
  total: string;
  distributionStatus: string;
  email: string;
  mobileNumber: string;
  gcashRefNum: string;
  mayaRefNum: string;
  attendingCashier: string;
}

export function parseCsv() {
  const csvData = fs.readFileSync('./orders.csv', 'utf8');

  Papa.parse<OrderRow>(csvData, {
    header: true,
    complete: (results) => {
      const orders: Order[] = results.data.map((row) => {
        const items: Item[] = []; // Parse items from row into Item[] array

        console.log(row.customerName);

        items.push({
          name: 'Lanyard',
          quantity: Number(row.quantity),
          price: Number(119),
          discount: Number(row.discount ? row.discount.replace('%', '') : 0),
          subtotal: Number(row.payableAmount),
        });

        const res: Order = {
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
        } else {
          console.log('Successfully wrote orders to orders.json');
        }
      });
    },
  });
}

// Convert fs.readFile into Promise version to use with async/await
const readFile = util.promisify(fs.readFile);

export async function getJsonFile(filename: string) {
  try {
    const data = await readFile(filename, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading file from disk: ${filename}`, err);
    return null;
  }
}

export function sortOrders(orders: Order[]) {
  try {
    return orders.sort((a, b) => a.customerName.localeCompare(b.customerName));
  } catch (error) {
    console.log('Skipping item...', error);
  }
}
