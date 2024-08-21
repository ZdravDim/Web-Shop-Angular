import { CommonModule } from '@angular/common';
import { Component, inject, OutputOptions } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { OrderInterface } from '../../../interfaces/order';
import { OrderService } from '../../../services/order.service';
import { MatTableModule } from '@angular/material/table';
import { OrderStatus } from '../../../enums/order';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ MatIconModule, CommonModule, RouterModule, MatTableModule ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {

  OrderStatus = OrderStatus;
  orders: OrderInterface[];
  selectedOrder?: OrderInterface = undefined;

  statusColors: string[] = ['darkgoldenrod', 'green', 'red'];

  constructor(private orderService: OrderService) {
    this.orders = orderService.getAllOrders();
  }

  finishOrder(order: OrderInterface): void {
    order.status = OrderStatus.DELIVERED;
  }
 
  cancelOrDelete(order: OrderInterface): void {
    if (order.status === OrderStatus.PROCESSING) order.status = OrderStatus.CANCELED;
    else this.orderService.deleteOrder(order);
  }

  showReviewDialog(order: OrderInterface) : void {
    // ...
  }
}
