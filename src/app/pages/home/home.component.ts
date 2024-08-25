import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { ProductStorageInterface } from '../../interfaces/product';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ChangeDetectionStrategy } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { Category, Size } from '../../enums/product';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatFormFieldModule, MatDatepickerModule, MatSliderModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeComponent {

  protected manufacturers: String[];
  protected products: ProductStorageInterface[];
  protected filteredProducts: ProductStorageInterface[];

  constructor(private storageService: StorageService) {
    this.products = this.storageService.getAllProducts();
    this.filteredProducts = this.products;
    this.manufacturers = this.storageService.getManufacturers();
  }

  arraySum(arr: number[]): number {
    return arr.reduce((a, b) => a + b, 0);
  }

  getAvailableProducts(): ProductStorageInterface[] {
    return this.filteredProducts.filter(product => this.arraySum(product.storage) > 0);
  }

  filterProducts(): void {
    const stylesCheched: Category[] = [];
    let anythingChecked: boolean = false;
    this.filteredProducts = this.products;

    if ((document.getElementById('WORK') as HTMLInputElement).checked) stylesCheched.push(Category.WORK);
    if ((document.getElementById('SPORTS') as HTMLInputElement).checked) stylesCheched.push(Category.SPORTS);
    if ((document.getElementById('FORMAL') as HTMLInputElement).checked) stylesCheched.push(Category.FORMAL);
    if ((document.getElementById('CASUAL') as HTMLInputElement).checked) stylesCheched.push(Category.CASUAL);

    if (stylesCheched.length > 0) {
      anythingChecked = true;
      this.filteredProducts = this.filteredProducts.filter(product => stylesCheched.includes(product.productInfo.category));
    }

    const sizesChecked: Size[] = [];

    if ((document.getElementById('XS') as HTMLInputElement).checked) sizesChecked.push(Size.XS);
    if ((document.getElementById('S') as HTMLInputElement).checked) sizesChecked.push(Size.S);
    if ((document.getElementById('M') as HTMLInputElement).checked) sizesChecked.push(Size.M);
    if ((document.getElementById('L') as HTMLInputElement).checked) sizesChecked.push(Size.L);
    if ((document.getElementById('XL') as HTMLInputElement).checked) sizesChecked.push(Size.XL);
    if ((document.getElementById('XXL') as HTMLInputElement).checked) sizesChecked.push(Size.XXL);

    if (sizesChecked.length > 0) {
      anythingChecked = true;
      this.filteredProducts = this.filteredProducts.filter(product => sizesChecked.some(size => product.storage[size] > 0));
    }

    const manufacturersChecked: String[] = [];

    for (const manufacturer of this.manufacturers) {
      if ((document.getElementById(manufacturer.toString()) as HTMLInputElement).checked) manufacturersChecked.push(manufacturer.toString());
    }

    if (manufacturersChecked.length > 0) {
      anythingChecked = true;
      this.filteredProducts = this.filteredProducts.filter(product => manufacturersChecked.includes(product.productInfo.manufacturer));
    }

    if (!anythingChecked) {
      this.filteredProducts = this.products;
    }

  }
}
