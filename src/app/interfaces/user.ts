import { CartInterface } from "./cart";
import { OrderInterface } from "./order";

export interface UserInterface {
    firstname: string;
    lastname: string;
    email: string;
    address: string;
    phone: string;
    password: string;
    orders: OrderInterface[];
    cart: CartInterface;
    createdAt: Date;
    updatedAt?: Date;
}

export interface UserServiceInterface {
    signup(userData: UserInterface): boolean;
    login(email: string, password: string): boolean;
    updateUser(email: string, userData: UserInterface): boolean;
    getCurrentUser(): UserInterface;
    isUserLoggedIn(): boolean;
    logOut(): void;
    getUserList(): Map<string, UserInterface>;
    currentUserRecievedProduct(productId: number): boolean;
}