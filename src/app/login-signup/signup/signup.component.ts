import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserInterface } from '../../interfaces/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})

export class SignupComponent {

  constructor(private userService: UserService, private router: Router) {}

  failedToSignup: boolean = false;
  someFieldsAreEmpty: boolean = false;
  passwordNotMatching: boolean = false;
  confirmPassword: string = '';
  
  userData: UserInterface = {
    firstname: '',
    lastname: '',
    email: '',
    address: '',
    phone: '',
    password: '',
    createdAt: new Date(),
    updatedAt: undefined,
    orders: [],
    cart: {
      productList: [],
      price: 0
    }
  }

  onSignup(form: NgForm): void {

    this.failedToSignup = this.passwordNotMatching = this.someFieldsAreEmpty = false;
    if (form.invalid) {
      this.someFieldsAreEmpty = true;
      return;
    }
    if (this.userData.password !== this.confirmPassword) {
      this.passwordNotMatching = true;
      return;
    }
    this.userData.createdAt = new Date();
    if (this.userService.signup(this.userData)) {
      this.router.navigate(['login']);
    }
    else {
      this.failedToSignup = true;
    }
  }
}
