import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { ProductStorageInterface } from '../../interfaces/product';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  protected products: ProductStorageInterface[];

  constructor(private storageService: StorageService) {
    this.products = this.storageService.getAllProducts();
  }

}
