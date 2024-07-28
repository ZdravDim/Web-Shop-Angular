import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(private storageService: StorageService) {}

  title = 'Web-Shop-Angular'; 
  
  ngOnInit(): void {
    this.storageService.fillStorage();
  }
}
