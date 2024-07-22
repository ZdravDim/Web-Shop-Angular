import { Injectable } from '@angular/core';
import { UserInterface, UserServiceInterface } from '../interfaces/user';
import { userList } from '../globals';

@Injectable({
  providedIn: 'root'
})

export class UserService implements UserServiceInterface {

  constructor() { }
  
  signup(userData: UserInterface): boolean {
    for (const user of userList) {
      if (userData.email === user.email) return false;
    }
    userList.push(userData);
    return true;
  }

  login(email: string, password: string): boolean {
    for (const user of userList) {
      if (email === user.email) {
        if (password === user.password) return true;
        return false;
      }
    }
    return false;
  }

  changeData(userData: UserInterface): boolean {
    for (const user of userList) {
      if (userData.email === user.email) {
        Object.assign(user, userData);
        return true;
      }
    }
    return false;
  }
}
