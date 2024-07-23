import { Injectable } from '@angular/core';
import { CartServiceInterface } from '../interfaces/cart';
import { ProductInterface } from '../interfaces/product';
import { currentUser } from '../globals';

@Injectable({
  providedIn: 'root'
})

export class CartService implements CartServiceInterface {

  constructor() { }

  // da li se uklanja sa stanja pre porudzbine ?

  addToCart(product: ProductInterface): void {
    currentUser.cart.products.push(product);
    currentUser.cart.price += product.price;
  }


  removeFromCart(product: ProductInterface): boolean {
    const index = currentUser.cart.products.findIndex(p => p.id === product.id);

    if (index !== -1) {
      currentUser.cart.products.splice(index, 1);
      currentUser.cart.price -= product.price;
      return true;
    }

    return false;
  }

  emptyCart(): void {
    currentUser.cart.products = [];
    currentUser.cart.price = 0;
  }
}
