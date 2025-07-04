import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Advertisement } from '../home/ads';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdsService {

  constructor(private http: HttpClient) { }

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  getAdsList() : Observable<Advertisement[]> {
    return this.http.get<Advertisement[]>('/api/ads/list');
  }

  searchAds(question: string) : Observable<Advertisement[]> {
    return this.http.post<Advertisement[]>('/api/ads/search', {question});
  }

  getAdById(id: number): Observable<any> {
    return this.http.get<any>(`/api/ads/${id}`);
  }
}
