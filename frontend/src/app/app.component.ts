import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AdsService } from './services/ads.service';
import { Advertisement } from './home/ads';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  searchResults: Advertisement[] = [];

  constructor(private adsService: AdsService, private router: Router) {}

  searchAds(question: string): void {
    this.adsService.searchAds(question).subscribe(ads => {
      this.searchResults = ads;
    })
    
  }
}
