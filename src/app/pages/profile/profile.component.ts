import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserInterface } from '../../interfaces/user';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatIconModule, CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  @ViewChild('firstname') firstname!: ElementRef;
  @ViewChild('lastname') lastname!: ElementRef;
  @ViewChild('email') email!: ElementRef;
  @ViewChild('phone') phone!: ElementRef;
  @ViewChild('address') address!: ElementRef;

  protected user: UserInterface;

  currentSection: string = 'profile';
  updatesEnabled: boolean = false;

  oldPassword: string = '';
  newPassword: string = '';
  
  someFieldsAreEmpty: boolean = false;
  passwordNotMatching: boolean = false;
  passwordChanged: boolean = false;

  constructor(private userService: UserService, private router: Router) {
    this.user = this.userService.getCurrentUser();
  }

  logOut(): void {
    this.userService.logOut();
    this.router.navigate(['']);
  }

  enableUpdate(): void {
    this.updatesEnabled = true;
  }

  showSection(section: string) {
    this.currentSection = section;
  }

  cancelUpdate(): void {
    this.firstname.nativeElement.value = this.user.firstname;
    this.lastname.nativeElement.value = this.user.lastname;
    this.email.nativeElement.value = this.user.email;
    this.phone.nativeElement.value = this.user.phone;
    this.address.nativeElement.value = this.user.address
    
    this.updatesEnabled = false;
  }

  applyUpdates(): void {
    // TODO: handle empty fields and errors
    const tempMail = this.email.nativeElement.value;

    this.user = {
      firstname: this.firstname.nativeElement.value,
      lastname: this.lastname.nativeElement.value,
      email: this.email.nativeElement.value,
      phone: this.phone.nativeElement.value,
      address: this.address.nativeElement.value,
      password: this.user.password,
      createdAt: this.user.createdAt,
      orders: this.user.orders,
      cart: this.user.cart
    }

    this.userService.updateUser(tempMail, this.user);

    this.updatesEnabled = false;
  }

  cancel(): void {

  }

  resetPassword() {
    this.someFieldsAreEmpty = this.passwordNotMatching = this.passwordChanged = false;

    if (this.oldPassword === "" || this.newPassword === "") {
      this.someFieldsAreEmpty = true;
      return;
    }
    
    if (this.userService.getCurrentUser().password === this.oldPassword) {
      this.userService.getCurrentUser().password = this.newPassword;
      // success notification
    } else this.passwordNotMatching = true;
  }
}
