import { ProductInterface } from "./product";

export interface CartInterface {
    products: ProductInterface[]; 
    price: number;
}

export interface CartServiceInterface {
    addToCart(product: ProductInterface): void;
    removeFromCart(product: ProductInterface): boolean;
    emptyCart() : void;
}