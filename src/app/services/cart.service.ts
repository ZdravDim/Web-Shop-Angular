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
    this.currentUser!.cart.productList.push({productInfo: product, size});
    this.currentUser!.cart.price += product.price;
    this.storageService.reserveProduct(product.id, size);
  }

  removeFromCart(item: CartItemInterface): boolean {
    const index = this.currentUser!.cart.productList.findIndex(p => p === item);

    if (index !== -1) {
      this.currentUser!.cart.productList.splice(index, 1);
      this.currentUser!.cart.price -= item.productInfo.price;
      this.storageService.addProductToStorage(item.productInfo.id, item.size, 1);
      return true;
    }
    return false;
  }

  emptyCart(): void {
    for (let item of this.currentUser.cart.productList) 
      this.storageService.addProductToStorage(item.productInfo.id, item.size, 1);

    this.currentUser!.cart.productList = [];
    this.currentUser!.cart.price = 0;
  }

}
