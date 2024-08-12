 interface ReviewInterface {
    userEmail: string;
    rating: number;
    comment?: string;
    createdAt: Date;
    updatedAt?: Date;
}

export interface ProductReviewInterface extends ReviewInterface {
    productId: number;
}

export interface OrderReviewInterface extends ReviewInterface {
    orderId: number;
}