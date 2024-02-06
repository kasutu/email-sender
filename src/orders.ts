import { getJsonFile, parseCsv, sortOrders } from './parse';

export interface Item {
  name: string;
  quantity: number;
  price: number;
  discount: number;
  subtotal: number;
}

export interface Order {
  email: string;
  orderId: string;
  customerName: string;
  items: Item[];
  total: number;
  paymentStatus: string;
}

const isProd = false;

export async function getOrders(): Promise<Order[]> {
  if (isProd) {
    parseCsv();
    return sortOrders(await getJsonFile('orders.json'));
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
}

// should add a getter function that sorts the orders by name A-Z
// should add a parser that parses the csv to the order interface
