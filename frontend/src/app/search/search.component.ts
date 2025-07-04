import { Component, Input, OnInit } from '@angular/core';
import { Advertisement } from '../home/ads';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AdsService } from '../services/ads.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [NgIf, NgFor, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{

  searchResults: Advertisement[] = [];
  searchQuery: string = '';
  
  constructor(private adsService: AdsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        this.searchQuery = params['query'] || '';
        this.performSearch();
      })
  }
  performSearch(){
    this.adsService.searchAds(this.searchQuery).subscribe(ads => {
      this.searchResults = ads;
    });
  }
}
