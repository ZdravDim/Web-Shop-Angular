import { ProductInterface } from "./interfaces/product";
import { UserInterface } from "./interfaces/user"
import { StorageInterface } from "./interfaces/storage"

export const userLoggedIn: boolean = false;
export const currentUser: UserInterface = {
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    cart: {
        products: [],
        price: 0
    },
    phone: "",
    password: "",
    createdAt: new Date(),
    orders: []
};
export const userList: UserInterface[] = [];
export const productList: ProductInterface[] = [];
export const manifacturerList: string[] = [];
export const storage: StorageInterface = {
    products: [
        //TODO: ubaci bar 10 proizvoda
    ]
}

export let orderCnt: number = 0;
export let productCnt: number = 0;

export const incrementOrderCnt = () => orderCnt++;
export const incrementProductCnt = () => productCnt++;