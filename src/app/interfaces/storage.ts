import { Category, Gender, Size } from "../enums/product";
import { ProductInterface, ProductStorageInterface } from "./product";

export interface StorageInterface {
    products: ProductStorageInterface[]
}

export interface StorageServiceInterface {
    createNewProduct(name: string, price: number, category: Category, gender: Gender, manifacturer: string, description: string): void;
    getProductById(productId: number): ProductInterface | undefined;
    getProductAvailability(productId: number): number[];
    reserveProduct(productId: number, size: Size): boolean;
    addProductToStorage(productId: number, size: Size, count: number): void;
    fillStorage(): void;
    createProductReview(userEmail: string, productId: number, rating: number, comment?: string): void;
}