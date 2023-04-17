import { AccountModel } from './../account/account';
import { CartModel } from './../product/cart';

export interface DataPurchaseEmail {
  id:             string;
  user_name:      string;
  address_user:   string;
  cpfCnpj:        string;
  user_email:     string;
  user_phone:     string;
  purchase_id:    string;
  date:           DateClass;
  Sender_Name:    string;
  Sender_Address: string;
  Sender_City:    string;
  Sender_State:   string;
  Sender_Zip:     string;
  total:          string;
  products:       Products;
}

export interface DateClass {
  mm: string;
  dd: string;
  yy: string;
}

export interface Products {
  data: Datum[];
}

export interface Datum {
  product_name: string;
  quantity:     string;
  sub_total:    number;
}


export interface PurchaseModel { 
  id: string;
  cart: CartModel;
  account: AccountModel,
  paymentMethod: string;
  shippingAddress: string;
  shippingPrice: number;
  total: number;
  status: 'pending' | 'approved' | 'canceled' | 'refunded' | 'shipped' | 'delivered' | 'returned' | 'disputed';
  createDate: Date;
  updateDate: Date;
}