import { Component, inject } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductInterface } from '../../interfaces/product';
import { StorageService } from '../../services/storage.service';
import { CommonModule } from '@angular/common';
import { Category } from '../../enums/product';
import { Size } from '../../enums/product';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { WebsiteComponent } from '../../website/website.component';
import { T } from '@angular/cdk/keycodes';
import { StickyDirection } from '@angular/cdk/table';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, NgbRatingModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})

export class ProductComponent {

  Category = Category;
  Size = Size;
  productId?: number;
  productInfo?: ProductInterface;
  availabilityMap: any = {};
  availableSizes: string[] = [];

  selectedSize: string | null = null;
  sizeNotSelected: boolean = false;
  productNotAvailable: boolean = false;
  userRating: number = 0;
  userComment: string = '';
  emptyReviewFields: boolean = false;

  constructor(private route: ActivatedRoute, private storageService: StorageService, protected userService: UserService, private cartService: CartService) {}
  
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.productId = +params.get('id')!;
      this.productInfo = this.storageService.getProductById(this.productId);
  
      this.getAvailableSizes();

    })
  }

  getAvailableSizes(): void {

    const productAvailability = this.storageService.getProductAvailability(this.productId!);

      this.availabilityMap = {
        XS: productAvailability[0],
        S: productAvailability[1],
        M: productAvailability[2],
        L: productAvailability[3],
        XL: productAvailability[4],
        XXL: productAvailability[5]
      };

      this.availabilityMap = Object.entries(this.availabilityMap);
      this.availableSizes = this.availabilityMap.filter((size: any) => size[1] > 0).map((size: any) => size[0]);
  }

  submitReview(): boolean {
    if (this.userRating === 0 || this.userComment === "" || this.userService.isUserLoggedIn() === false) {
      this.emptyReviewFields = true;
      return false;
    }
    this.storageService.createProductReview(this.userService.getCurrentUser().email, this.productId!, this.userRating, this.userComment);
    this.clearReviewSection();
    return false;
  }

  clearReviewSection(): void {
    this.emptyReviewFields = false;
    this.userRating = 0;
    this.userComment = "";
  }

  addToCart(): void {
    if (this.selectedSize === null) {
      this.sizeNotSelected = true;
      return;
    }
    
    this.cartService.addToCart(this.productInfo!, Size[this.selectedSize as keyof typeof Size]);
    WebsiteComponent.pushNotification(this.productInfo!.name);
    this.getAvailableSizes();
    this.sizeNotSelected = false;
    if (this.availableSizes.length === 0) {
      this.productNotAvailable = true;
    }
  }
}
