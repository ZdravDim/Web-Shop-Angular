import { Injectable } from '@angular/core';
import { OrderInterface, OrderServiceInterface } from '../interfaces/order';
import { OrderStatus } from '../enums/order';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

export class OrderService implements OrderServiceInterface {

  constructor(private userService: UserService) {}

  private orderCnt = 0;

  createOrder(address: string): void {
    const newOrder: OrderInterface = {
      id: this.orderCnt++,
      cart: this.userService.getCurrentUser().cart,
      address: address,
      status: OrderStatus.PROCESSING,
      createdAt: new Date()
    }
    this.userService.getCurrentUser().orders.push(newOrder);
  }

  cancelOrder(orderId: number): void {
    for (const order of this.userService.getCurrentUser().orders) {
      if (order.id == orderId) {
        order.status = OrderStatus.CANCELED;
        return;
      }
    }
  }

}
