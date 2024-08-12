import { CartInterface } from "./cart";
import { OrderInterface } from "./order";

export interface UserInterface {
    firstname: string;
    lastname: string;
    email: string;
    address: string;
    phone: string;
    password: string;
    createdAt: Date;
    updatedAt?: Date;
    orders: OrderInterface[];
    cart: CartInterface;
}

export interface UserServiceInterface {
    signup(userData: UserInterface): boolean;
    login(email: string, password: string): boolean;
    updateUser(email: string, userData: UserInterface): boolean;
    getUserList(): Map<string, UserInterface>;
}