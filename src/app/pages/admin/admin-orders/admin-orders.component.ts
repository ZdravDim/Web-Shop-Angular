import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { UserInterface } from '../../../interfaces/user';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.scss'
})
export class AdminOrdersComponent {

  protected selectedUser: UserInterface;
  
  constructor(protected userService: UserService) {
    this.selectedUser = this.userService.getCurrentUser();
  }

  
}
