import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { ClientParkingLotPost } from 'Models/ClientParkingLotPost';
import { Login } from 'Models/Login';
import { PropietaryParkPost } from 'Models/PropietaryParkPost';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ClientService } from 'src/app/service/client/client.service';
import { LenguageService } from 'src/app/service/lenguage/lenguage.service';
import { PropietaryParkService } from 'src/app/service/propietaryPark/propietary-park.service';
import { RolserviceService } from 'src/app/service/rol/rolservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  showPassword = false;
  password: string = '';
  form: FormGroup;
  selectedLanguage!: string;
  id!: string;

  constructor(private translocoservice: TranslocoService,  private languageService: LenguageService, private fb: FormBuilder, private _snackBar: MatSnackBar, private _clientService: ClientService, private _propietaryService: PropietaryParkService, private _apiauth: AuthService, private _rolService: RolserviceService, private _router: Router) {

    this.languageService.selectedLanguage$.subscribe(language => {
      this.selectedLanguage = language;
    });

    const selectedLanguage = this.languageService.getSelectedLanguage();
    localStorage.setItem('selectedLanguage', selectedLanguage);

    this.form = this.fb.group({
      name: [''],
      email: [''],
      identification: [''],
      telephone: [''],
      nameUser: [''],
      password: [''],
      rol: [''],
    })
  }

  ngOnInit(): void {
    const selectedLanguage = this.languageService.getSelectedLanguage();
    localStorage.setItem('selectedLanguage', selectedLanguage);
    this.translocoservice.setActiveLang(selectedLanguage)
  }

  register() {
    const rol = this.form.value.rol;

    try {
      if (rol === "Client") {
        const model: ClientParkingLotPost = {
          name: this.form.value.name,
          identification: this.form.value.identification,
          email: this.form.value.email,
          telephone: this.form.value.telephone,
          nameUser: this.form.value.nameUser,
          password: this.form.value.password,
          rol: this.form.value.rol,
        }
        this._clientService.AddClient(model).subscribe(response => {

          const log: Login = {
            nameUser: this.form.value.nameUser,
            Password: this.form.value.password,
          }

          this._apiauth.login(log).subscribe(response => {
            if (response.result == 0) {
              const user = this._apiauth.getTokenUserInfo()
              if (user) {
                this.id = user.RolId;
              }

              this._rolService.getRol(this.id).subscribe(data => {
                const roleName = data.name;
                if (roleName && roleName == 'Propietary Park') {
                  this._snackBar.open('Has sido registrado correctamente', 'Cerrar', {
                    duration: 3000, // Duración del mensaje (3 segundos)
                  });
                  this._router.navigate(['/ViewParkingLot']);
                }
                if (roleName && roleName == 'Client') {
                  this._snackBar.open('Has sido registrado correctamente', 'Cerrar', {
                    duration: 3000, // Duración del mensaje (3 segundos)
                  });
                  this._router.navigate(['/ParkingLot']);
                }
              });

            }
          });
        }
        );
      }

      if (rol === "Propietary Park") {
        const model: PropietaryParkPost = {
          name: this.form.value.name,
          identification: this.form.value.identification,
          email: this.form.value.email,
          telephone: this.form.value.telephone,
          nameUser: this.form.value.nameUser,
          password: this.form.value.password,
          rol: this.form.value.rol,
        }
        this._propietaryService.AddPropietary(model).subscribe(response => {

          const log: Login = {
            nameUser: this.form.value.nameUser,
            Password: this.form.value.password,
          }
  
          this._apiauth.login(log).subscribe(response => {
            if (response.result == 0) {
              const user = this._apiauth.getTokenUserInfo()
              if (user) {
                this.id = user.RolId;
              }
  
              this._rolService.getRol(this.id).subscribe(data => {
                const roleName = data.name;
                if (roleName && roleName == 'Propietary Park') {
                  this._snackBar.open('Has sido registrado correctamente', 'Cerrar', {
                    duration: 3000, // Duración del mensaje (3 segundos)
                  });
                  this._router.navigate(['/ViewParkingLot']);
                }
                if (roleName && roleName == 'Client') {
                  this._snackBar.open('Has sido registrado correctamente', 'Cerrar', {
                    duration: 3000, // Duración del mensaje (3 segundos)
                  });
                  this._router.navigate(['/ParkingLot']);
                }
              });
  
            }
          });

        });

        
      }


    }
    catch (Exception) {
      this._snackBar.open('No has sido registrado correctamente', 'Cerrar', {
        duration: 3000, // Duración del mensaje (3 segundos)
      });
    }



  }
}
