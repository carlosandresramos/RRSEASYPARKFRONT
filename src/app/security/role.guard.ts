import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth/auth.service';
import { RolserviceService } from '../service/rol/rolservice.service';
import { Rol } from 'Models/Rol';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {

    id!: string;
    role!: string;
    
  constructor(
    private authService: AuthService,
    private router: Router,
    private _rolService: RolserviceService
  ) {}

   canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot, 
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

   
        const requiredRole = route.data['requiredRole'];    
        const user = this.authService.getTokenUserInfo(); // Supongo que tienes una función para obtener el usuario
        //const requiredRole = route.data.requiredRole; // Define el rol requerido en la configuración de la ruta
        if(user){
            this.id = user.RolId;
        }
    
        return this._rolService.getRol(this.id).pipe(map(data => {
            const roleName = data.name;
            console.log(roleName);
            if (roleName && roleName === requiredRole) {
                return true;
            }
          
              // Si el usuario no tiene el rol requerido, redirige a una página de acceso no autorizado o a donde desees
              this.router.navigate(['/Unauthorized']);
              return false;
        }),
        catchError(error => {
            console.error('Error al obtener el rol', error);
            this.router.navigate(['/Unauthorized']);
            return [false];
          }));    
   
  }

    getRole() {
    this._rolService.getRol(this.id).subscribe(data => {
      this.role = data.name;
    })
  }
}