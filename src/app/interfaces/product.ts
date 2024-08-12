import { Category, Gender } from "../enums/product";
import { ProductReviewInterface } from "./review";

export interface ProductInterface {
    id: number;
    name: string;
    price: number;
    category: Category;
    gender: Gender;
    manufacturer: string;
    imagePath: string;
    description: string;
    reviews: ProductReviewInterface[];
    rating: number;
    createdAt: Date;
    updatedAt?: Date;
}

export interface ProductStorageInterface {
    productInfo: ProductInterface,
    storage: number[]
}
