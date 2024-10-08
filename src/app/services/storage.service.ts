import { Injectable } from '@angular/core';
import { StorageInterface, StorageServiceInterface } from '../interfaces/storage';
import { Category, Gender, Size } from '../enums/product';
import { ProductInterface, ProductStorageInterface } from '../interfaces/product';
import { ProductReviewInterface } from '../interfaces/review';
import { CartInterface } from '../interfaces/cart';

@Injectable({
  providedIn: 'root'
})
export class StorageService implements StorageServiceInterface {

  constructor() {}

  protected productCnt: number = 0;

  protected manifacturerList: string[] = [];
  
  protected storage: StorageInterface = {
    products: []
  }

  createNewProduct(name: string, price: number, category: Category, gender: Gender, manifacturer: string, description: string, imagePath?: string): void {

    const currentTimeStamp = new Date();

    const productStorage: ProductStorageInterface = {
      productInfo: {
        id: this.productCnt++,
        name: name,
        price: price,
        category: category,
        gender: gender,
        manufacturer: manifacturer,
        description: description,
        imagePath: "assets/products/",
        reviews: [],
        rating: 1,
        createdAt: currentTimeStamp,
        updatedAt: undefined
      },
      storage: [0, 0, 0, 0, 0, 0]
    }

    switch (gender) {
      case(Gender.MEN): {
        productStorage.productInfo.imagePath += "men/";
        break;
      }
      case(Gender.WOMEN): {
        productStorage.productInfo.imagePath += "women/";
        break;
      }
      default: {
        productStorage.productInfo.imagePath += "unisex/";
        break;
      }
    }

    productStorage.productInfo.imagePath += (imagePath ?? currentTimeStamp.toISOString());

    this.storage.products.push(productStorage);

    if (!this.manifacturerExists(manifacturer)) {
      this.manifacturerList.push(manifacturer);
    }
  }

  manifacturerExists(newManifacturer: string): boolean {
    for (const manifacturer of this.manifacturerList)
      if (manifacturer === newManifacturer) return true;
    return false;
  }
    
  getProductById(productId: number): ProductInterface | undefined {
    for (const productInfo of this.storage.products) {
      if (productInfo.productInfo.id === productId) 
        return productInfo.productInfo;
      }
    return undefined;
  }

  getProductAvailability(productId: number): number[] {
    for (const productInfo of this.storage.products) {
      if (productInfo.productInfo.id === productId) 
        return productInfo.storage;
      }
      return [0,0,0,0,0];
  }

  reserveProduct(productId: number, size: Size): boolean {
    for (const productInfo of this.storage.products) {
      if (productInfo.productInfo.id === productId) {
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
      if (productInfo.productInfo.id === productId) {
        productInfo.storage[size] += count;
        return true;
      }
    }
    return false;
  }

  fillStorage(): void {

    const productDescription = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer 
      took a galley of type and scrambled it to make a type specimen book. It has survived not only five 
      centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`;

    this.createNewProduct("LINEN SHIRT", 35.90, Category.CASUAL, Gender.MEN, "ZARA", productDescription, "linen-shirt-zara");
    this.createNewProduct("POLO T-SHIRT", 40.00, Category.WORK, Gender.MEN, "ZARA", productDescription, "polo-shirt-zara");
    this.createNewProduct("BERMUDA SHORTS", 24.50, Category.CASUAL, Gender.MEN, "ZARA", productDescription, "bermuda-shorts-zara");
    this.createNewProduct("SHORT SLEEVE SHIRT", 35.65, Category.CASUAL, Gender.MEN, "NIKE", productDescription, "short-sleeve-tshirt-nike");
    this.createNewProduct("RUNNING SET M", 109.99, Category.SPORTS, Gender.MEN, "NIKE", productDescription, "running-set-nike");
    this.createNewProduct("CARGO PANTS", 29.99, Category.CASUAL, Gender.MEN, "H&M", productDescription, "cargo-pants-h&m");

    this.createNewProduct("MIDI DRESS", 55.95, Category.FORMAL, Gender.WOMEN, "ZARA", productDescription, "midi-dress-zara");
    this.createNewProduct("RUNNING SET W", 109.99, Category.SPORTS, Gender.WOMEN, "NIKE", productDescription, "running-set-nike");
    this.createNewProduct("MIDI SATEN SKIRT", 25.99, Category.FORMAL, Gender.WOMEN, "ZARA", productDescription, "midi-saten-skirt-zara");
    this.createNewProduct("TEXAS SHORTS", 19.99, Category.CASUAL, Gender.WOMEN, "H&M", productDescription, "texas-shorts-h&m");

    this.createNewProduct("OVERSIZED T-SHIRT", 39.50, Category.CASUAL, Gender.UNISEX, "ADIDAS", productDescription, "oversized-tshirt-adidas");


    this.addProductToStorage(0, Size.S, 1);
    this.addProductToStorage(0, Size.M, 1);
    this.addProductToStorage(0, Size.XL, 1);

    this.addProductToStorage(1, Size.M, 1);

    this.addProductToStorage(2, Size.XS, 1);
    this.addProductToStorage(2, Size.S, 1);
    this.addProductToStorage(2, Size.M, 1);
    this.addProductToStorage(2, Size.L, 1);
    this.addProductToStorage(2, Size.XL, 1);
    this.addProductToStorage(2, Size.XXL, 1);

    this.addProductToStorage(3, Size.XL, 1);
    this.addProductToStorage(4, Size.XXL, 1);
    this.addProductToStorage(5, Size.XS, 1);
    this.addProductToStorage(6, Size.M, 1);
    this.addProductToStorage(7, Size.S, 1);
    this.addProductToStorage(8, Size.XL, 1);
    this.addProductToStorage(9, Size.L, 1);

    this.addProductToStorage(10, Size.L, 1);

    this.createProductReview("someuser@gmail.com", 0, 5, `There are many variations of passages of Lorem Ipsum available, 
      but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly 
      believable.`);  
    this.createProductReview("someuser@gmail.com", 0, 4, `There are many variations of passages of Lorem Ipsum available, 
      but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly 
      believable.`);
  }

  getAllProducts(): ProductStorageInterface[] {
    return this.storage.products;
  }
  
  getManufacturers(): string[] {
    return this.manifacturerList;
  }

  createProductReview(userEmail: string, productId: number, rating: number, comment?: string): void {
    const productReview: ProductReviewInterface = { 
      userEmail: userEmail,
      productId: productId,
      rating: rating,
      comment: comment,
      createdAt: new Date()
    };
    
    const productToReview = this.storage.products.find(product => product.productInfo.id == productId)!.productInfo;
    productToReview.reviews.unshift(productReview);
    productToReview.rating = productToReview.reviews.reduce((acc, review) => acc + review.rating, 0) / productToReview.reviews.length;
  }

  emptyCart(cart: CartInterface): void {
    for (let item of cart.productList) {
      this.addProductToStorage(item.productInfo.id, item.size, 1);
    }
    cart.productList = [];
    cart.price = 0;
  }
}