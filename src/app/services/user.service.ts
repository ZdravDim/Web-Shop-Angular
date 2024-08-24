import { Injectable } from '@angular/core';
import { UserInterface, UserServiceInterface } from '../interfaces/user';
import { OrderInterface } from '../interfaces/order';

@Injectable({
  providedIn: 'root'
})

export class UserService implements UserServiceInterface {

  constructor() {
    this.userList.set("dimitrijezdravkovic20@gmail.com", {
      firstname: "Dimitrije",
      lastname: "Zdravkovic",
      email: "dimitrijezdravkovic20@gmail.com",
      address: "Some Address 123",
      cart: {
          productList: [],
          price: 0
      },
      phone: "+3812345678",
      password: "123",
      createdAt: new Date(),
      orders: []
    });

    this.userList.set("dimicc.k@gmail.com", {
      firstname: "Katarina",
      lastname: "Dimic",
      email: "dimicc.k@gmail.com",
      address: "Bulevar Oslobodjenja 678/90",
      cart: {
          productList: [],
          price: 0
      },
      phone: "+3817894562",
      password: "123",
      createdAt: new Date(),
      orders: []
    });

    this.currentUser = this.userList.get("dimitrijezdravkovic20@gmail.com");
  }

  protected userLoggedIn: boolean = true;
  
  protected currentUser?: UserInterface = undefined;

  protected userList: Map<string, UserInterface> = new Map<string, UserInterface>();
  
  signup(userData: UserInterface): boolean {
    if (this.userList.has(userData.email)) return false;
    this.userList.set(userData.email, userData);
    return true;
  }

  login(email: string, password: string): boolean {
    if (!this.userList.has(email)) return false;
    if (this.userList.get(email)!.password !== password) return false;
    this.currentUser = this.userList.get(email);
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
    this.currentUser = undefined;
    this.userLoggedIn = false;
  }

  getUserList(): Map<string, UserInterface> {
    return this.userList;
  }

  currentUserOrderedProdut(productId: number): boolean {
    if (this.userLoggedIn) {
      const orders: OrderInterface[] = this.currentUser!.orders;
      for (const order of orders) {
        if (order.cart.productList.find(product => product.productInfo.id === productId)) {
          return true;
        }
      }
    }
    return false;
  }
}
