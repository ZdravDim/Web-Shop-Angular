import { Category, Gender, Size } from "../enums/product";
import { ReviewInterface } from "./revirew";

export interface ProductInterface {
    id: number;
    name: string;
    price: number;
    category: Category;
    size: Size;
    gender: Gender;
    manifacturer: string;
    reviews: ReviewInterface[];
    createdAt: Date;
    updatedAt?: Date;
}