import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { userLoggedIn } from './globals';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    if (userLoggedIn) this.router.navigate(['login']);
    return userLoggedIn;
  }
}
