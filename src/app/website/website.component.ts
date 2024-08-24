import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { RouterOutlet } from '@angular/router';
import { NotificationComponent } from '../pages/product/notification/notification.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-website',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, NotificationComponent, CommonModule],
  templateUrl: './website.component.html',
  styleUrl: './website.component.scss'
})
export class WebsiteComponent {

  static notificationProductNames: string[] = [];

  public static pushNotification(productName: string): void {
    this.notificationProductNames.push(productName);
  }

  public static clearNotifications(): void {
    this.notificationProductNames = [];
  }

  get notificationProductNames(): string[] {
    return WebsiteComponent.notificationProductNames;
  }

}
