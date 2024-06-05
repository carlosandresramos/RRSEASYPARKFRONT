
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { RecoveryPassword } from 'Models/RecoveryPassword';
import { Token } from 'Models/Token';
import { AuthService } from 'src/app/service/auth/auth.service';
import { LenguageService } from 'src/app/service/lenguage/lenguage.service';

function passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const password = control.get('password');
  const password1 = control.get('password1');

  return password && password1 && password.value !== password1.value ? { 'passwordMismatch': true } : null;
}

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.css']
})
export class ConfirmPasswordComponent implements OnInit {

  token!: string;
  showPassword = false;
  showPassword1 = false;
  password1: string = '';
  password: string = '';
  form: FormGroup;


  constructor(private translocoservice: TranslocoService, private languageService: LenguageService, private _snackBar: MatSnackBar, private route: ActivatedRoute, private fb: FormBuilder, public _apiauth: AuthService, private _router: Router){

    this.form = this.fb.group({
      password: ['', Validators.required],
      password1: ['', Validators.required]
    }, { validator: passwordMatchValidator });

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.token = params['token']
    })
    this.validation();
    const selectedLanguage = this.languageService.getSelectedLanguage();
    localStorage.setItem('selectedLanguage', selectedLanguage);
    this.translocoservice.setActiveLang(selectedLanguage);
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  togglePasswordVisibility1() {
    this.showPassword1 = !this.showPassword1;
  }

  validation(){

    const model: Token = {
      token: this.token,
    }

    this._apiauth.validation(model).subscribe({ 
      next: (data) => {
        
        console.log(data);
    
        if(data.result == 0){
             
        }else{
          this._snackBar.open('Token Expirado', 'Cerrar', {
            duration: 3000, 
          });
          this._router.navigate(['/Login']);
        }
    
      }, error: (e) => {
        console.error(e);
        console.log(model.token);
        this._snackBar.open('Error al obtener el token', 'Cerrar', {
          duration: 3000, 
        });
        this._router.navigate(['/Login']);
       }
     });
  }

  confirm(){
    const pass: RecoveryPassword = {
      token: this.token,
      password: this.form.value.password,
      password2: this.form.value.password1
    }

    this._apiauth.confirm(pass).subscribe({ 
      next: (data) => {
        
        console.log(data);
    
        if(data.result == 0){
          this._snackBar.open('contraseña cambiada correctamente', 'Cerrar', {
            duration: 3000, 
          });
          this._router.navigate(['/Login']);    
        }else{
          this._snackBar.open('contraseña no cambiada correctamente', 'Cerrar', {
            duration: 3000, 
          });
          this._router.navigate(['/Login']);
        }
    
      }, error: (e) => {
        console.error(e);
        this._snackBar.open('contraseña no cambiada correctamente', 'Cerrar', {
          duration: 3000, 
        });
        this._router.navigate(['/Login']);
       }
     });
  }



}

