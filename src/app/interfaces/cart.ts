import { Size } from "../enums/product";
import { ProductInterface } from "./product";

export interface CartItemInterface {
    product: ProductInterface;
    size: Size;
}

export interface CartInterface {
    products: CartItemInterface[]; 
    price: number;
}

export interface CartServiceInterface {
    addToCart(product: ProductInterface, size: Size): void;
    removeFromCart(product: CartItemInterface): boolean;
    emptyCart() : void;
}