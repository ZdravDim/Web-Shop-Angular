import { ProductInterface } from "./interfaces/product";
import { StorageInterface } from "./interfaces/storage"

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