import { Size } from "../enums/product";
import { ProductInterface } from "./product";

export interface CartItemInterface {
    productInfo: ProductInterface;
    size: Size;
}

export interface CartInterface {
    productList: CartItemInterface[]; 
    price: number;
}

export interface CartServiceInterface {
    addToCart(product: ProductInterface, size: Size): void;
    removeFromCart(product: CartItemInterface): boolean;
    emptyCart() : void;
}