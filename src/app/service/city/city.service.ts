import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City } from 'Models/City';
import { ParkingLot } from 'Models/ParkingLot';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private Endpoint = environment.endPoint;
  private complement = "Api/ApiCity";

  constructor(private _http: HttpClient) { }

  public getCity():Observable<City[]>{
    return this._http.get<City[]>(this.Endpoint + this.complement);
  }
}
