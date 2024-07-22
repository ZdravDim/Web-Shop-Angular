export interface UserInterface {
    firstname: string;
    lastname: string;
    email: string;
    address: string;
    phone: string;
    password: string;
    createdAt: Date;
    updatedAt?: Date;
}

export interface UserServiceInterface {
    signup(userData: UserInterface): boolean;
    login(email: string, password: string): boolean;
    changeData(userData: UserInterface): boolean;
}