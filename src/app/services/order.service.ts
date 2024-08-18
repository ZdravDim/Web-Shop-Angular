import { Injectable } from '@angular/core';
import { OrderInterface, OrderServiceInterface } from '../interfaces/order';
import { OrderStatus } from '../enums/order';
import { UserService } from './user.service';
import { OrderReviewInterface } from '../interfaces/review';

@Injectable({
  providedIn: 'root'
})

export class OrderService implements OrderServiceInterface {

  constructor(private userService: UserService) {}

  private orderCnt = 0;

  createOrder(): void {
    const newOrder: OrderInterface = {
      id: this.orderCnt++,
      cart: JSON.parse(JSON.stringify(this.userService.getCurrentUser().cart)),
      address: JSON.parse(JSON.stringify(this.userService.getCurrentUser().address)),
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

  createOrderReview(userEmail: string, orderId: number, rating: number, comment?: string): void {
    const orderReview: OrderReviewInterface = { 
      userEmail: userEmail,
      orderId: orderId,
      rating: rating,
      comment: comment,
      createdAt: new Date()
    };
    
    this.userService.getUserList().get(userEmail)!.orders.find(order => order.id == orderId)!.review = orderReview;
  }

}
