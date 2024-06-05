import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientParkingLotPost } from 'Models/ClientParkingLotPost';
import { Responses } from 'Models/Response';
import { User } from 'Models/User';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private Endpoint = environment.endPoint;
  private complement = "Api/ApiClientParkingLot";
  public get userData(): User | null{
    return this.userSubject.value;
  }
 // private userSubject = new BehaviorSubject<User>();
  private userSubject = new BehaviorSubject<User | null>(null);
  public useer! :Observable<User | null>;

  constructor(private _http: HttpClient) {
    const storedUser = localStorage.getItem('Usuario');
    if (storedUser !== null) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser) {
        this.userSubject = new BehaviorSubject<User | null>(parsedUser);
      } 
    } 
    this.useer = this.userSubject.asObservable();
   }

  public AddClient(client: ClientParkingLotPost): Observable<Responses> {
    return this._http.post<Responses>(this.Endpoint + this.complement, client);
  } 
}
