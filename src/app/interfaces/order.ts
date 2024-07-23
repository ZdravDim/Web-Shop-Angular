import { OrderStatus } from "../enums/order";
import { CartInterface } from "./cart";

export interface OrderInterface {
  id: number;
  cart: CartInterface;
  address: string;
  rating?: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt?: Date;
}

export interface OrderServiceInterface {
  createOrder(address: string) : void;
  cancelOrder(iorderId: number) : void;
}