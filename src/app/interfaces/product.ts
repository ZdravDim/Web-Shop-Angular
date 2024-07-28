import { Category, Gender, Size } from "../enums/product";
import { ReviewInterface } from "./review";

export interface ProductInterface {
    id: number;
    name: string;
    price: number;
    category: Category;
    gender: Gender;
    manifacturer: string;
    reviews: ReviewInterface[];
    rating: number;
    createdAt: Date;
    updatedAt?: Date;
}

export interface ProductStorageInterface {
    product: ProductInterface,
    // storage: [
    //     size: Size,
    //     count: number
    // ] []
    storage: number[]
}
