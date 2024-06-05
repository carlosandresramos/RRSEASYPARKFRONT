import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapsServiceService {

  private apiUrl = 'https://forward-reverse-geocoding.p.rapidapi.com/v1/forward';

  private headers = new HttpHeaders({
    'X-RapidAPI-Key': '2288725012mshe5996e68ea08631p11b74bjsn7258177e36c3',
      'X-RapidAPI-Host': 'forward-reverse-geocoding.p.rapidapi.com'
  });

  constructor(private http: HttpClient) { }

  getCoordinates(adress: string, city: string): Observable<any> {
    const params = {
    street: adress,
    city: city,
    country: 'Colombia',
    'accept-language': 'en',
    polygon_threshold: '0.0'
    };

    return this.http.get(this.apiUrl, { params, headers: this.headers });
  }

}
