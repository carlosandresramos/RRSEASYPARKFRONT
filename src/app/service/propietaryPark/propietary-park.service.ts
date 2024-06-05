import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PropietaryParkPost } from 'Models/PropietaryParkPost';
import { Responses } from 'Models/Response';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PropietaryParkService {

  private Endpoint = environment.endPoint;
  private complement = "Api/ApiPropietaryPark";

  constructor(private _http: HttpClient) { }

  public AddPropietary(propietary: PropietaryParkPost): Observable<Responses> {
    return this._http.post<Responses>(this.Endpoint + this.complement, propietary);
  } 
}
