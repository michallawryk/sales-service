import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdsService } from '../services/ads.service';
import { Advertisement } from '../home/ads';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-ad-detail',
    imports: [CommonModule],
    templateUrl: './ad-detail.component.html',
    styleUrls: ['./ad-detail.component.css']
})
export class AdDetailComponent implements OnInit {
  ad: any ={};

  constructor(private route: ActivatedRoute, private adsService: AdsService) {}

  ngOnInit(): void {
    let adId = this.route.snapshot.params['id'];
    this.adsService.getAdById(adId).subscribe(response => {
      this.ad = response;
    })
  }
}
