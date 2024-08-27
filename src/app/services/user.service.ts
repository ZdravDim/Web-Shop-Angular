import { Injectable } from '@angular/core';
import { UserInterface, UserServiceInterface } from '../interfaces/user';
import { OrderInterface } from '../interfaces/order';
import { OrderStatus } from '../enums/order';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})

export class UserService implements UserServiceInterface {

  private emptyUser: UserInterface = {
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    cart: {
        productList: [],
        price: 0
    },
    phone: "",
    password: "",
    createdAt: new Date(),
    orders: []
  };

  constructor(private storageService: StorageService) {
    this.currentUser = this.emptyUser;
    this.userLoggedIn = false;
  }

  protected userLoggedIn: boolean;
  
  protected currentUser: UserInterface;

  protected userList: Map<string, UserInterface> = new Map<string, UserInterface>();
  
  signup(userData: UserInterface): boolean {
    if (this.userList.has(userData.email)) return false;
    this.userList.set(userData.email, userData);
    return true;
  }

  login(email: string, password: string): boolean {
    if (!this.userList.has(email)) return false;
    if (this.userList.get(email)!.password !== password) return false;
    this.currentUser = this.userList.get(email)!;
    this.currentUser.cart = this.emptyUser.cart;
    this.userLoggedIn = true;
    return true;
  }

  updateUser(email: string, userData: UserInterface): boolean {
    if (!this.userList.has(email)) return false;
    this.userList.set(email, userData);
    return true;
  }

  getCurrentUser(): UserInterface {
    return this.currentUser!;
  }

  isUserLoggedIn(): boolean {
    return this.userLoggedIn;
  }

  logOut(): void {
    this.storageService.emptyCart(this.currentUser.cart);
    this.currentUser = this.emptyUser;
    this.userLoggedIn = false;
  }

  getUserList(): Map<string, UserInterface> {
    return this.userList;
  }

  currentUserRecievedProduct(productId: number): boolean {
    if (this.userLoggedIn) {
      const orders: OrderInterface[] = this.currentUser!.orders;
      for (const order of orders) {
        if (order.status == OrderStatus.DELIVERED && order.cart.productList.find(product => product.productInfo.id === productId)) {
          return true;
        }
      }
    }
    return false;
  }
}
