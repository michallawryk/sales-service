import { Component, OnInit, Input } from '@angular/core';
import { Advertisement } from './ads';
import { AdsService } from '../services/ads.service';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AdDetailComponent } from '../ad-detail/ad-detail.component';

@Component({
    selector: 'app-home',
    imports: [NgIf, NgFor, CommonModule, AdDetailComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  adsList: Advertisement[] = [];
  @Input() adDetail: any;

  constructor(private adsService: AdsService, private router: Router) {}

  ngOnInit(): void {
    this.getAds();
  }

  getAds() {
    this.adsService.getAdsList().subscribe(ads => {
      this.adsList = ads;
   });
  }

  onClickAd(adId: number) {
    this.adsService.getAdById(adId).subscribe(response => {
      console.log(response);
      this.router.navigate(['/ads', adId]);
    })
  }
}
