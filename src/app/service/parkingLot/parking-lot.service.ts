import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ParkingLot } from 'Models/ParkingLot';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ParkingLotEdit } from 'Models/ParkingLotEdit';

@Injectable({
  providedIn: 'root'
})
export class ParkingLotService {

  private Endpoint = environment.endPoint;
  private complement = "Api/ApiParkingLot";

  constructor(private _http: HttpClient) { }

  public getParkingLots(): Observable<ParkingLot[]> {
    return this._http.get<ParkingLot[]>(this.Endpoint + this.complement);
  }

  public getParkingLotsPropietary(): Observable<ParkingLot[]> {
    return this._http.get<ParkingLot[]>(`${this.Endpoint}${this.complement}/propietario/`);
  }
  
  public getParkingLot(id: string): Observable<ParkingLot> {
    return this._http.get<ParkingLot>(`${this.Endpoint}${this.complement}/obtener/${id}`);
  }
 
  public AddParkingLot(parkingLot: ParkingLot): Observable<ParkingLot> {
    return this._http.post<ParkingLot>(this.Endpoint + this.complement, parkingLot);
  } 

  public UpdateParkingLot(parkingLot: ParkingLotEdit): Observable<ParkingLotEdit> {
    return this._http.put<ParkingLotEdit>(this.Endpoint + this.complement, parkingLot);
  } 

   

}
