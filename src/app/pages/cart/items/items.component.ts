import { Component } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { Category, Size } from '../../../enums/product';
import { CartInterface, CartItemInterface } from '../../../interfaces/cart';
import { CartService } from '../../../services/cart.service';
import { OrderService } from '../../../services/order.service';
import { UserService } from '../../../services/user.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [MatDivider, MatIconButton, MatIcon, RouterModule, CommonModule],
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss'
})
export class ItemsComponent {
  cartEmpty: boolean;
  cart: CartInterface;
  Category = Category;
  Size = Size;

  constructor(private userService: UserService, private cartService: CartService, private orderService: OrderService, private storageService: StorageService) {
    this.cart = userService.getCurrentUser().cart;
    this.cartEmpty = this.cart.productList.length === 0;
  }

  deleteItemFromCart(item: CartItemInterface): void {
    this.cartService.removeFromCart(item);
    this.cartEmpty = this.cart.productList.length === 0;
  }

  createNewOrder(): void {
    this.orderService.createOrder();
    this.storageService.emptyCart(this.userService.getCurrentUser().cart);
    this.cartEmpty = true;
  }
}
