import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { ProductStorageInterface } from '../../interfaces/product';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Category, Gender, Size } from '../../enums/product';
import { PriceSliderComponent } from './price-slider/price-slider.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule, PriceSliderComponent, DatePickerComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})

export class ProductsComponent implements OnInit {

  @ViewChild(DatePickerComponent) protected datePickerComponent!: DatePickerComponent;

  protected showFilters = true;

  protected manufacturers: String[];
  protected products: ProductStorageInterface[];
  protected filteredProducts: ProductStorageInterface[];

  private queryParamsSubscription!: Subscription;

  constructor(private storageService: StorageService, private router: Router, private route: ActivatedRoute) {
    this.products = this.storageService.getAllProducts();
    this.filteredProducts = this.products;
    this.manufacturers = this.storageService.getManufacturers();
  }

  ngOnInit(): void {

    this.queryParamsSubscription = this.route.queryParams.subscribe((params) => {
      const search = params['search'];
      if (search) {
        this.filteredProducts = this.filteredProducts.filter(product => product.productInfo.name.toLowerCase().includes(search.toLowerCase()));
        return;
      }
    });

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

  ngOnDestroy() {
    this.queryParamsSubscription.unsubscribe();
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
    (document.getElementById('left-div') as HTMLElement).style.display = this.showFilters ? 'block' : 'none';
    (document.getElementById('right-div') as HTMLElement).style.display = this.showFilters ? 'block' : 'none';
  }
  
  arraySum(arr: number[]): number {
    return arr.reduce((a, b) => a + b, 0);
  }

  getAvailableProducts(): ProductStorageInterface[] {
    return this.filteredProducts.filter(product => this.arraySum(product.storage) > 0);
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
    const dateFrom = this.datePickerComponent.getDateFrom();
    if (dateFrom !== null) {
      this.filteredProducts = this.filteredProducts.filter(product => product.productInfo.createdAt >= dateFrom!);
    }
    const dateTo = this.datePickerComponent.getDateTo();
    if (dateTo !== null) {
      this.filteredProducts = this.filteredProducts.filter(product => product.productInfo.createdAt <= dateTo!);
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
