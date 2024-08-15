import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { UserService } from '../../services/user.service';
import { CartInterface } from '../../interfaces/cart';
import { Category } from '../../enums/product';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatDivider, MatIcon],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})

export class CartComponent {

  cart: CartInterface;
  Category = Category;

  constructor(userService: UserService) {
    this.cart = userService.getCurrentUser().cart;
  }

}
