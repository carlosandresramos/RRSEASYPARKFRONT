import { Component } from '@angular/core';
import { User } from 'Models/User';
import { AuthService } from './service/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'A-RRSEASYPARK';

  Nombre = "RRS EasyPark"
  user!: User | null;


  constructor(public _apiAuth: AuthService, private router: Router) {
    this._apiAuth.useer.subscribe(res => {
      this.user = res;
      console.log('cambio el objeto' + res);
    });
  }

}
