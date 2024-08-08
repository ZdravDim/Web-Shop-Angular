import { Injectable } from '@angular/core';
import { UserInterface, UserServiceInterface } from '../interfaces/user';
import { ProductInterface } from '../interfaces/product';
import { Size } from '../enums/product';

@Injectable({
  providedIn: 'root'
})

export class UserService implements UserServiceInterface {

  constructor() {
    this.currentUser = this.userList[0]; // TODO: remove
  }

  private userLoggedIn: boolean = true; // TODO: change to false
  
  private currentUser?: UserInterface = undefined;

  private userList: UserInterface[] = [{
    firstname: "Dimitrije",
    lastname: "Zdravkovic",
    email: "dz.com",
    address: "Some Address 123",
    cart: {
        products: [],
        price: 0
    },
    phone: "+3812345678",
    password: "123",
    createdAt: new Date(),
    orders: []
  }];
  
  signup(userData: UserInterface): boolean {
    for (const user of this.userList) {
      if (userData.email === user.email) return false;
    }
    this.userList.push(userData);
    return true;
  }

  login(email: string, password: string): boolean {
    for (const user of this.userList) {
      if (email === user.email) {
        if (password === user.password) {
          user.cart = this.currentUser!.cart;
          this.currentUser = user;
          this.userLoggedIn = true;
          return true;
        }
        return false;
      }
    }
    return false;
  }

  updateUser(email: string, userData: UserInterface): boolean {
    for (const user of this.userList) {
      if (userData.email === email) {
        Object.assign(user, userData);
        return true;
      }
    }
    return false;
  }

  getCurrentUser(): UserInterface {
    return this.currentUser!;
  }

  getUserLoggedIn(): boolean {
    return this.userLoggedIn;
  }

  logOut(): void {
    this.currentUser = undefined;
    this.userLoggedIn = false;
  }

  addToCart(product: ProductInterface, size: Size): void {
    this.currentUser!.cart.products.push(product);
    this.currentUser!.cart.price += product.price;
    // this.storageService.reserveProduct(product.id, size);
  }

  removeFromCart(product: ProductInterface): boolean {
    const index = this.currentUser!.cart.products.findIndex(p => p.id === product.id);

    if (index !== -1) {
      this.currentUser!.cart.products.splice(index, 1);
      this.currentUser!.cart.price -= product.price;
      // return product to storage, needs size attribute 
      return true;
    }
    return false;
  }

  emptyCart(): void {
    for (const product of this.currentUser!.cart.products) {
      this.removeFromCart(product); 
    }
    this.currentUser!.cart.price = 0;
  }
}
