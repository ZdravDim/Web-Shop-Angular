import { Injectable } from '@angular/core';
import { StorageInterface, StorageServiceInterface } from '../interfaces/storage';
import { Category, Gender, Size } from '../enums/product';
import { ProductInterface, ProductStorageInterface } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class StorageService implements StorageServiceInterface {

  constructor() {}

  private productCnt: number = 0;

  private manifacturerList: string[] = []; 
  
  private storage: StorageInterface = {
    products: []
  }

  createNewProduct(name: string, price: number, category: Category, gender: Gender, manifacturer: string): void {
    this.storage.products.push({
      product: {
        id: this.productCnt++,
        name: name,
        price: price,
        category: category,
        gender: gender,
        manifacturer: manifacturer,
        reviews: [],
        rating: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      storage: [0,0,0,0,0]
    })

    if (!this.manifacturerExists(manifacturer)) {
      this.manifacturerList.push(manifacturer);
    }
  }

  manifacturerExists(newManifacturer: string): boolean {
    for (const manifacturer of this.manifacturerList)
      if (manifacturer === newManifacturer) return true;
    return false;
  }

  getProductAvailability(productId: number): number[] {
    for (const productInfo of this.storage.products) {
      if (productInfo.product.id === productId) 
        return productInfo.storage;
      }
      return [0,0,0,0,0];
  }

  setProductAvailability(productId: number, sizeCounts: number[]): boolean {
    for (const productInfo of this.storage.products) {
      if (productInfo.product.id === productId) {
        productInfo.storage = sizeCounts;
        return true;
      }
    }
    return false;
  }

  reserveProduct(productId: number, size: Size): boolean {
    for (const productInfo of this.storage.products) {
      if (productInfo.product.id === productId) {
        if (productInfo.storage[size] > 0) {
          productInfo.storage[size]--;
          return true;
        }
        return false;
      }
    }
    return false;
  }

  addProductToStorage(productId: number, size: Size, count: number = 1): void {
    const sizeCounts = [0,0,0,0,0];
    sizeCounts[size] = count;
    this.setProductAvailability(productId, sizeCounts);
  }

  fillStorage(): void {
      this.createNewProduct("LINEN SHIRT", 4490, Category.CASUAL, Gender.MALE, "ZARA");
      this.createNewProduct("POLO T-SHIRT", 2490, Category.CASUAL, Gender.MALE, "ZARA");
      this.createNewProduct("MIDI DRESS", 3390, Category.CASUAL, Gender.FEMALE, "ZARA");
      this.createNewProduct("MIDI SATEN SKIRT", 3990, Category.CASUAL, Gender.FEMALE, "ZARA");
      this.createNewProduct("BERMUDA SHORTS", 2700, Category.CASUAL, Gender.MALE, "ZARA");
      this.createNewProduct("TEXAS SHORTS", 2500, Category.CASUAL, Gender.FEMALE, "H&M");
      this.createNewProduct("CARGO PANTS", 3390, Category.CASUAL, Gender.MALE, "H&M");
      this.createNewProduct("OVERSIZED T-SHIRT", 3990, Category.CASUAL, Gender.UNISEX, "ADIDAS");
      this.createNewProduct("SHORT SLEEVE SHIRT", 3490, Category.CASUAL, Gender.MALE, "NIKE");
      this.createNewProduct("RUNNING SET M", 5990, Category.CASUAL, Gender.MALE, "NIKE");
      this.createNewProduct("RUNNING SET W", 5990, Category.CASUAL, Gender.FEMALE, "NIKE");
  }

  getAllProducts(): ProductStorageInterface[] {
    return this.storage.products;
  }
  
}
