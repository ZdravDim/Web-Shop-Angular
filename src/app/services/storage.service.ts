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

  createNewProduct(name: string, price: number, category: Category, gender: Gender, manifacturer: string, imagePath?: string): void {

    const currentTimeStamp = new Date();

    this.storage.products.push({
      product: {
        id: this.productCnt++,
        name: name,
        price: price,
        category: category,
        gender: gender,
        manifacturer: manifacturer,
        imagePath: "/assets/" + (imagePath ?? currentTimeStamp.toISOString() + ".png"),
        reviews: [],
        rating: undefined,
        createdAt: currentTimeStamp,
        updatedAt: undefined
      },
      storage: [0, 0, 0, 0, 0, 0]
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

  addProductToStorage(productId: number, size: Size, count: number): boolean {
    for (const productInfo of this.storage.products) {
      if (productInfo.product.id === productId) {
        productInfo.storage[size] += count;
        return true;
      }
    }
    return false;
  }

  fillStorage(): void {
    this.createNewProduct("LINEN SHIRT", 4490, Category.CASUAL, Gender.MALE, "ZARA", "about.png");
    this.createNewProduct("POLO T-SHIRT", 2490, Category.CASUAL, Gender.MALE, "ZARA", "about.png");
    this.createNewProduct("MIDI DRESS", 3390, Category.CASUAL, Gender.FEMALE, "ZARA", "about.png");
    this.createNewProduct("MIDI SATEN SKIRT", 3990, Category.CASUAL, Gender.FEMALE, "ZARA", "about.png");
    this.createNewProduct("BERMUDA SHORTS", 2700, Category.CASUAL, Gender.MALE, "ZARA", "about.png");
    this.createNewProduct("TEXAS SHORTS", 2500, Category.CASUAL, Gender.FEMALE, "H&M", "about.png");
    this.createNewProduct("CARGO PANTS", 3390, Category.CASUAL, Gender.MALE, "H&M");
    this.createNewProduct("OVERSIZED T-SHIRT", 3990, Category.CASUAL, Gender.UNISEX, "ADIDAS");
    this.createNewProduct("SHORT SLEEVE SHIRT", 3490, Category.CASUAL, Gender.MALE, "NIKE");
    this.createNewProduct("RUNNING SET M", 5990, Category.CASUAL, Gender.MALE, "NIKE");
    this.createNewProduct("RUNNING SET W", 5990, Category.CASUAL, Gender.FEMALE, "NIKE");

    this.addProductToStorage(0, Size.S, 1);
    this.addProductToStorage(1, Size.M, 1);
    this.addProductToStorage(2, Size.L, 1);
    this.addProductToStorage(3, Size.XL, 1);
    this.addProductToStorage(4, Size.XXL, 1);
    this.addProductToStorage(5, Size.S, 1);
  }

  getAllProducts(): ProductStorageInterface[] {
    return this.storage.products;
  }
  
}
