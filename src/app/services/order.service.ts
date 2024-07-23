import { Injectable } from '@angular/core';
import { OrderInterface, OrderServiceInterface } from '../interfaces/order';
import { currentUser, incrementOrderCnt, orderCnt } from '../globals';
import { OrderStatus } from '../enums/order';

@Injectable({
  providedIn: 'root'
})

export class OrderService implements OrderServiceInterface {

  constructor() {}

  createOrder(address: string): void {
    const newOrder: OrderInterface = {
      id: orderCnt,
      cart: currentUser.cart,
      address: address,
      status: OrderStatus.PROCESSING,
      createdAt: new Date()
    }
    currentUser.orders.push(newOrder);
    incrementOrderCnt();
  }

  cancelOrder(orderId: number): void {
    for (const order of currentUser.orders) {
      if (order.id == orderId) {
        order.status = OrderStatus.CANCELED;
        return;
      }
    }
  }

}
