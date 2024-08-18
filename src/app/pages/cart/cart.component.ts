import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { UserService } from '../../services/user.service';
import { CartInterface, CartItemInterface } from '../../interfaces/cart';
import { Category } from '../../enums/product';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { CartService } from '../../services/cart.service';
import { RouterModule } from '@angular/router';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, MatDivider, MatIconButton, MatIcon],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})

export class CartComponent {

  cartEmpty: boolean;
  cart: CartInterface;
  Category = Category;

  constructor(userService: UserService, private cartService: CartService, private orderService: OrderService) {
    this.cart = userService.getCurrentUser().cart;
    this.cartEmpty = this.cart.price === 0;
  }

  deleteItemFromCart(item: CartItemInterface): void {
    this.cartService.removeFromCart(item);
    this.cartEmpty = this.cart.products.length === 0;
  }

  createNewOrder(): void {
    this.orderService.createOrder();
    this.cartService.emptyCart();
    this.cartEmpty = true;
  }
}
