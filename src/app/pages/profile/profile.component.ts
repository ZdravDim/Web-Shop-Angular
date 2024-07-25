import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  protected user;

  constructor(private userService: UserService, private router: Router) {
    this.user = this.userService.getCurrentUser();
  }

  logOut(): void {
    this.userService.logOut();
    this.router.navigate(['']);
  }

  updateInfo(): boolean {
    // TODO ...
    return true;
  }

}
