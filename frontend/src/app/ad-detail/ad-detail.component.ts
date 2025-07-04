import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdsService } from '../services/ads.service';
import { Advertisement } from '../home/ads';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-ad-detail',
  standalone: true,
  imports: [NgIf, CommonModule],
  templateUrl: './ad-detail.component.html',
  styleUrl: './ad-detail.component.css'
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
