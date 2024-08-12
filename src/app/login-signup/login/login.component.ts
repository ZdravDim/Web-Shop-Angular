import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms'
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {

  someFieldsAreEmpty: boolean = false;
  failedToLogin: boolean = false;
  email: string = '';
  password: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onLogin(form: NgForm): void {
    this.someFieldsAreEmpty = this.failedToLogin = false;

    if (form.invalid) {
      this.someFieldsAreEmpty = true;
      return;
    }

    if (this.userService.login(this.email, this.password)) {
      this.router.navigate(['']);
    }
    else {
      this.failedToLogin = true;
    }
  }
}
