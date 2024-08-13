import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { ProductStorageInterface } from '../../interfaces/product';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ChangeDetectionStrategy } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Category, Gender, Size } from '../../enums/product';
import { PriceSliderComponent } from './price-slider/price-slider.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatFormFieldModule, MatDatepickerModule, MatButtonModule, PriceSliderComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProductsComponent {

  protected showFilters = false;

  protected dateFrom: Date | null = null;
  protected dateTo: Date | null = null;

  protected manufacturers: String[];
  protected products: ProductStorageInterface[];
  protected filteredProducts: ProductStorageInterface[];

  constructor(private storageService: StorageService, private router: Router) {
    this.products = this.storageService.getAllProducts();
    this.filteredProducts = this.products;
    this.manufacturers = this.storageService.getManufacturers();
  }

  ngOnInit(): void {
    const fullUrl = this.router.url;
    const lastString = fullUrl.substring(fullUrl.lastIndexOf('/') + 1);
    if (lastString === 'men') {
      this.filteredProducts = this.filteredProducts.filter(product => product.productInfo.gender === Gender.MEN || product.productInfo.gender === Gender.UNISEX);
      (document.getElementById("MEN") as HTMLInputElement).checked = true;
    }
    else if (lastString === 'women') {
      this.filteredProducts = this.filteredProducts.filter(product => product.productInfo.gender === Gender.WOMEN || product.productInfo.gender === Gender.UNISEX);
      (document.getElementById("WOMEN") as HTMLInputElement).checked = true;
    }
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }
  
  arraySum(arr: number[]): number {
    return arr.reduce((a, b) => a + b, 0);
  }

  getAvailableProducts(): ProductStorageInterface[] {
    return this.filteredProducts.filter(product => this.arraySum(product.storage) > 0);
  }

  dateInputEvent(startDate: boolean, event: MatDatepickerInputEvent<Date>) {
    if (startDate) {
      this.dateFrom = new Date(event.value!);
    } else {
      this.dateTo = new Date(event.value!);
    }
  }

  filterProducts(): void {
    this.filteredProducts = this.products;
    
    // Filter by gender
    const genderChecked: Gender[] = [];

    if ((document.getElementById("MEN") as HTMLInputElement).checked) genderChecked.push(Gender.MEN);
    if ((document.getElementById("WOMEN") as HTMLInputElement).checked) genderChecked.push(Gender.WOMEN);

    if (genderChecked.length > 0) {
      this.filteredProducts = this.filteredProducts.filter(product => genderChecked.includes(product.productInfo.gender) || product.productInfo.gender === Gender.UNISEX);
    }

    // Filter by category
    const stylesCheched: Category[] = [];

    if ((document.getElementById('WORK') as HTMLInputElement).checked) stylesCheched.push(Category.WORK);
    if ((document.getElementById('SPORTS') as HTMLInputElement).checked) stylesCheched.push(Category.SPORTS);
    if ((document.getElementById('FORMAL') as HTMLInputElement).checked) stylesCheched.push(Category.FORMAL);
    if ((document.getElementById('CASUAL') as HTMLInputElement).checked) stylesCheched.push(Category.CASUAL);

    if (stylesCheched.length > 0) {
      this.filteredProducts = this.filteredProducts.filter(product => stylesCheched.includes(product.productInfo.category));
    }

    // Filter by size
    const sizesChecked: Size[] = [];

    if ((document.getElementById('XS') as HTMLInputElement).checked) sizesChecked.push(Size.XS);
    if ((document.getElementById('S') as HTMLInputElement).checked) sizesChecked.push(Size.S);
    if ((document.getElementById('M') as HTMLInputElement).checked) sizesChecked.push(Size.M);
    if ((document.getElementById('L') as HTMLInputElement).checked) sizesChecked.push(Size.L);
    if ((document.getElementById('XL') as HTMLInputElement).checked) sizesChecked.push(Size.XL);
    if ((document.getElementById('XXL') as HTMLInputElement).checked) sizesChecked.push(Size.XXL);

    if (sizesChecked.length > 0) {
      this.filteredProducts = this.filteredProducts.filter(product => sizesChecked.some(size => product.storage[size] > 0));
    }

    // Filter by manufacturer
    const manufacturersChecked: String[] = [];

    for (const manufacturer of this.manufacturers) {
      if ((document.getElementById(manufacturer.toString()) as HTMLInputElement).checked) manufacturersChecked.push(manufacturer.toString());
    }

    if (manufacturersChecked.length > 0) {
      this.filteredProducts = this.filteredProducts.filter(product => manufacturersChecked.includes(product.productInfo.manufacturer));
    }

    // Filter by date
    if (this.dateFrom !== null) {
      this.filteredProducts = this.filteredProducts.filter(product => product.productInfo.createdAt >= this.dateFrom!);
    }
    if (this.dateTo !== null) {
      this.filteredProducts = this.filteredProducts.filter(product => product.productInfo.createdAt <= this.dateTo!);
    }

    // Filter by rating
    const ratingChecked: number[] = [];

    for (let i = 1; i <= 5; i++) {
      if ((document.getElementById(i.toString()) as HTMLInputElement).checked) ratingChecked.push(i);
    }

    if (ratingChecked.length > 0) {
      this.filteredProducts = this.filteredProducts.filter(product => ratingChecked.includes(Math.round(product.productInfo.rating)));
    }

    // Filter by price
    const priceFrom = (document.getElementById('sliderStart')! as HTMLInputElement).value;
    const priceTo = (document.getElementById('sliderEnd')! as HTMLInputElement).value;
    this.filteredProducts = this.filteredProducts.filter(product => product.productInfo.price >= parseInt(priceFrom) && product.productInfo.price <= parseInt(priceTo));

  }
}
