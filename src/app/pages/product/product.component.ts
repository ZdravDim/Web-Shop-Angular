import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductInterface } from '../../interfaces/product';
import { StorageService } from '../../services/storage.service';
import { CommonModule } from '@angular/common';
import { Category } from '../../enums/product';
import { Size } from '../../enums/product';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ CommonModule, NgbRatingModule ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})

export class ProductComponent {

  Category = Category;
  Size = Size;
  productId?: number;
  productInfo?: ProductInterface;
  availabilityMap: any = {};

  constructor(private route: ActivatedRoute, private storageService: StorageService) {}
  
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.productId = +params.get('id')!;
      this.productInfo = this.storageService.getProductById(this.productId);
      const productAvailability = this.storageService.getProductAvailability(this.productId);

      this.availabilityMap = {
        XS: productAvailability[0],
        S: productAvailability[1],
        M: productAvailability[2],
        L: productAvailability[3],
        XL: productAvailability[4],
        XXL: productAvailability[5]
      };

      this.availabilityMap = Object.entries(this.availabilityMap);

    })
  }

  getAvailableSizes(): string[] {
    return this.availabilityMap.filter((size: any) => size[1] > 0).map((size: any) => size[0]);
  }
}
