import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AdsService } from './services/ads.service';
import { Advertisement } from './home/ads';
import { SearchComponent } from './search/search.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AdDetailComponent } from './ad-detail/ad-detail.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, HomeComponent, SidebarComponent, SearchComponent, AdDetailComponent, CommonModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
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
