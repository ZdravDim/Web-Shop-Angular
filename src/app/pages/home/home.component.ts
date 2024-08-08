import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { ProductStorageInterface } from '../../interfaces/product';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  protected products: ProductStorageInterface[];

  constructor(private storageService: StorageService) {
    this.products = this.storageService.getAllProducts();
  }

  arraySum(arr: number[]): number {
    return arr.reduce((a, b) => a + b, 0);
  }

  getAvailableProducts(): ProductStorageInterface[] {
    return this.products.filter(product => this.arraySum(product.storage) > 0);
  }

}
