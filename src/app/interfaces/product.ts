import { Category, Gender, Size } from "../Enums/product";

export interface Product {
    id: number;
    name: string;
    price: number;
    category: Category;
    size: Size;
    gender: Gender;
    manifacturer: string;
    createdAt: Date;
    updatedAt: Date;
}