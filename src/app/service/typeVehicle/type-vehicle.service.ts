import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypeVehicle } from 'Models/TypeVehicle';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TypeVehicleService {

  private Endpoint = environment.endPoint;
  private complement = "Api/ApiTypeVehicle";


  constructor(private _http: HttpClient) {}

    public getTypeVehicle(): Observable<TypeVehicle[]> {
      return this._http.get<TypeVehicle[]>(this.Endpoint + this.complement);
    }

}
