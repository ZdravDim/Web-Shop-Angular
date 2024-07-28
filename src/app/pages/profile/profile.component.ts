import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatIconModule, CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  protected user;

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
    // TODO ...s
    this.updatesEnabled = true;
  }

  showSection(section: string) {
    this.currentSection = section;
  }

  cancelUpdate(): void {
    // TODO ...
    this.updatesEnabled = false;
  }

  applyUpdates(): void {
    // TODO ...
    this.updatesEnabled = false;
  }

  cancel(): void {

  }

  resetPassword() {
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
