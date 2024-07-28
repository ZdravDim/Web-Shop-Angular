import { Category, Gender, Size } from "../enums/product";
import { ProductStorageInterface } from "./product";

export interface StorageInterface {
    products: ProductStorageInterface[]
}

export interface StorageServiceInterface {
    createNewProduct(name: string, price: number, category: Category, gender: Gender, manifacturer: string): void;
    getProductAvailability(productId: number): number[];
    setProductAvailability(productId: number, sizeCounts: number[]): boolean;
    reserveProduct(productId: number, size: Size): boolean;
    addProductToStorage(productId: number, size: Size, count: number): void;
    fillStorage(): void;
}