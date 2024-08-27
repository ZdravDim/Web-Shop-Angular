import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { OrderInterface } from '../../../interfaces/order';
import { OrderService } from '../../../services/order.service';
import { OrderStatus } from '../../../enums/order';
import { MatDividerModule } from '@angular/material/divider';
import { Category, Size } from '../../../enums/product';
import { EditOrderDialogComponent } from './edit-order-dialog/edit-order-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ MatIconModule, CommonModule, RouterModule, MatDividerModule, EditOrderDialogComponent, MatDialogModule, MatButtonModule ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {

  OrderStatus = OrderStatus;
  Category = Category;
  Size = Size;

  orders: OrderInterface[];
  selectedOrder?: OrderInterface = undefined;

  statusColors: string[] = ['darkgoldenrod', 'green', 'red'];

  constructor(private orderService: OrderService, private dialog: MatDialog) {
    this.orders = orderService.getAllOrders().reverse();
  }

  finishOrder(order: OrderInterface): void {
    order.status = OrderStatus.DELIVERED;
  }

  cancelOrder(order: OrderInterface): void {
    order.status = OrderStatus.CANCELED;
  }

  deleteOrder(order: OrderInterface): void {
    this.orderService.deleteOrder(order);
  }

  editOrder(order: OrderInterface): void {
    const dialogRef = this.dialog.open(EditOrderDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        order.address = result;
      }
    });
  }

  showReviewDialog(order: OrderInterface) : void {
    // ...
  }
}
