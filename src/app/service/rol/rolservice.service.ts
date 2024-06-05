
import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Rol } from 'Models/Rol';

@Injectable({
  providedIn: 'root'
})
export class RolserviceService {

  private Endpoint = environment.endPoint;
  private complement = "Api/ApiRol";

  constructor(private _http: HttpClient) { }

  public getRols(): Observable<Rol[]> {
    return this._http.get<Rol[]>(this.Endpoint + this.complement);
  }
  
  public getRol(id: string): Observable<Rol> {
    return this._http.get<Rol>(`${this.Endpoint}${this.complement}/obtener/${id}`);
  } 

}