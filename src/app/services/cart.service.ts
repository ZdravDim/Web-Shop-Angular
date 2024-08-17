import { Injectable } from '@angular/core';
import { CartItemInterface, CartServiceInterface } from '../interfaces/cart';
import { ProductInterface } from '../interfaces/product';
import { UserInterface } from '../interfaces/user';
import { UserService } from './user.service';
import { StorageService } from './storage.service';
import { Size } from '../enums/product';

@Injectable({
  providedIn: 'root'
})
export class CartService implements CartServiceInterface {

  currentUser: UserInterface;

  constructor(userService: UserService, private storageService: StorageService) {
    this.currentUser = userService.getCurrentUser();
   }

  addToCart(product: ProductInterface, size: Size): void {
    this.currentUser!.cart.products.push({product, size});
    this.currentUser!.cart.price += product.price;
    this.storageService.reserveProduct(product.id, size);
  }

  removeFromCart(item: CartItemInterface): boolean {
    const index = this.currentUser!.cart.products.findIndex(p => p === item);

    if (index !== -1) {
      this.currentUser!.cart.products.splice(index, 1);
      this.currentUser!.cart.price -= item.product.price;
      this.storageService.addProductToStorage(item.product.id, item.size, 1); // return to storage
      return true;
    }
    return false;
  }

  emptyCart(): void {
    for (let item of this.currentUser.cart.products) 
      this.storageService.addProductToStorage(item.product.id, item.size, 1);

    this.currentUser!.cart.products = [];
    this.currentUser!.cart.price = 0;
  }

}
