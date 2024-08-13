import { Component } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-price-slider',
  standalone: true,
  imports: [MatSliderModule],
  templateUrl: './price-slider.component.html',
  styleUrl: './price-slider.component.scss'
})
export class PriceSliderComponent {

}
