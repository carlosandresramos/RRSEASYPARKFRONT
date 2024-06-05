import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, Subject } from 'rxjs';
import { Responses } from 'Models/Response';
import { environment } from 'src/environments/environment.development';
import { User } from 'Models/User';
import { UserPost } from 'Models/UserPost';
import { Login } from 'Models/Login';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { Recovery } from 'Models/Recovery';
import { RecoveryPassword } from 'Models/RecoveryPassword';
import { Token } from 'Models/Token';
import { LenguageService } from '../lenguage/lenguage.service';
import { TranslocoService } from '@ngneat/transloco';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private Endpoint = environment.endPoint;
  private complement = "Api/ApiUser/Login";
  private complement1 = "Api/ApiUser";



  public get userData(): User | null {
    return this.userSubject.value;
  }
  // private userSubject = new BehaviorSubject<User>();
  private userSubject = new BehaviorSubject<User | null>(null);
  public useer!: Observable<User | null>;



  constructor(private translocoservice: TranslocoService, private _http: HttpClient, private router: Router, private languageService: LenguageService) {

    const storedUser = localStorage.getItem('Usuario');
    if (storedUser !== null) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser) {
        this.userSubject = new BehaviorSubject<User | null>(parsedUser);
      }
    }
    this.useer = this.userSubject.asObservable();
  }

  login(login: Login): Observable<Responses> {

    const Password = login.Password;
    const nameUser = login.nameUser;

    return this._http.post<Responses>(this.Endpoint + this.complement, { nameUser, Password }).pipe(
      map(res => {
        if (res.result == 0) {
          const user: User = res.data;
          localStorage.setItem('Usuario', JSON.stringify(user));
          this.userSubject.next(user);
          console.log(user);
          const selectedLanguage = this.languageService.getSelectedLanguage();
          this.translocoservice.setActiveLang(selectedLanguage)
        }
        return res;
      })
    );
  }

  recovery(email: Recovery): Observable<Responses>{

    return this._http.post<Responses>(`${this.Endpoint}${this.complement1}/Recovery`, email);

  }

  confirm(password: RecoveryPassword): Observable<Responses>{

    return this._http.post<Responses>(`${this.Endpoint}${this.complement1}/RecoveryPassword`, password);

  }

  validation(token: Token): Observable<Responses>{

    return this._http.post<Responses>(`${this.Endpoint}${this.complement1}/Validation`, token);

  }


  getTokenUserInfo(): UserPost | null {

    const token = localStorage.getItem('Usuario');

    if (token) {
      const user = jwt_decode(token) as UserPost;

      console.log(user.Id); // Acceso al ID del usuario
      console.log(user.Name); // Acceso al nombre del usuario
      console.log(user.RolId); // Acceso al ID del rol del usuario
      return user;
    }


    return null;

  }

  logout() {
    const selectedLanguage = this.languageService.getSelectedLanguage();
    localStorage.setItem('selectedLanguage', selectedLanguage);
    const selectedLanguag = localStorage.getItem('selectedLanguage') || 'es';
    this.translocoservice.setActiveLang(selectedLanguag)
    localStorage.removeItem('Usuario');
    this.userSubject.next(null);
    this.router.navigate(['']);
  }




}
