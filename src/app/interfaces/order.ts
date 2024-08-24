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
  createOrder() : void;
  cancelOrder(orderId: number) : void;
  deleteOrder(order: OrderInterface): void;
  createOrderReview(userEmail: string, orderId: number, rating: number, comment?: string): void;
  getAllOrders(): OrderInterface[];
}