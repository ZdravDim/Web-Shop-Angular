import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { CartInterface } from '../interfaces/cart';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, MatIconModule, MatBadgeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  @ViewChild('searchInput') searchInput!: ElementRef;

  cart: CartInterface;

  constructor(protected userService: UserService, private renderer: Renderer2, private router: Router) {
    this.cart = userService.getCurrentUser().cart;
  }

  search() {
    const searchName = this.searchInput.nativeElement.value;
    if (!searchName) {
      this.renderer.setStyle(this.searchInput.nativeElement, 'border', '1px solid red');
      setTimeout(() => {
        this.renderer.removeStyle(this.searchInput.nativeElement, 'border');
      }, 200);
      return;
    }
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/products'], { queryParams: { search: searchName } });
    });
  }

}
