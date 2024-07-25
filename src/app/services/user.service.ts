import { Injectable } from '@angular/core';
import { UserInterface, UserServiceInterface } from '../interfaces/user';
import { ProductInterface } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})

export class UserService implements UserServiceInterface {

  constructor() {}

  private userLoggedIn: boolean = false;
  
  private currentUser: UserInterface = {
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    cart: {
        products: [],
        price: 0
    },
    phone: "",
    password: "",
    createdAt: new Date(),
    orders: []
  };

  private userList: UserInterface[] = [{
    firstname: "Dimitrije ",
    lastname: "Zdravkovic",
    email: "dz.com",
    address: "aaa bbb 2134",
    cart: {
        products: [],
        price: 0
    },
    phone: "1235834",
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
          user.cart = this.currentUser.cart;
          this.currentUser = user;
          this.userLoggedIn = true;
          return true;
        }
        return false;
      }
    }
    return false;
  }

  changeData(userData: UserInterface): boolean {
    for (const user of this.userList) {
      if (userData.email === user.email) {
        Object.assign(user, userData);
        return true;
      }
    }
    return false;
  }

  getCurrentUser(): UserInterface {
    return this.currentUser;
  }

  getUserLoggedIn(): boolean {
    return this.userLoggedIn;
  }

  logOut(): void {
    this.clearCurrentUser();
    this.userLoggedIn = false;
  }

  private clearCurrentUser(): void {
    this.currentUser = {
      firstname: "",
      lastname: "",
      email: "",
      address: "",
      cart: {
          products: [],
          price: 0
      },
      phone: "",
      password: "",
      createdAt: new Date(),
      orders: []
    };
  }

  // TODO: da li se uklanja sa stanja pre porudzbine ?

  addToCart(product: ProductInterface): void {
    this.currentUser.cart.products.push(product);
    this.currentUser.cart.price += product.price;
  }


  removeFromCart(product: ProductInterface): boolean {
    const index = this.currentUser.cart.products.findIndex(p => p.id === product.id);

    if (index !== -1) {
      this.currentUser.cart.products.splice(index, 1);
      this.currentUser.cart.price -= product.price;
      return true;
    }

    return false;
  }

  emptyCart(): void {
    this.currentUser.cart.products = [];
    this.currentUser.cart.price = 0;
  }

}
