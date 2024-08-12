import { OrderStatus } from "../enums/order";
import { CartInterface } from "./cart";
import { OrderReviewInterface } from "./review";

export interface OrderInterface {
  id: number;
  cart: CartInterface;
  address: string;
  review?: OrderReviewInterface;
  status: OrderStatus;
  createdAt: Date;
  updatedAt?: Date;
}

export interface OrderServiceInterface {
  createOrder(address: string) : void;
  cancelOrder(iorderId: number) : void;
  createOrderReview(userEmail: string, orderId: number, rating: number, comment?: string): void;
}