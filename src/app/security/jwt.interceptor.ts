import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "../service/auth/auth.service";
import { Observable } from "rxjs";

@Injectable()
export class JwtInteceptor implements HttpInterceptor{

constructor(private _authService : AuthService){

}
intercept(request : HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>>{
   const user = this._authService.userData;

   if(user){
    request = request.clone({
        setHeaders: {
            Authorization: `Bearer ${user.token}`
        }
    })
   }

   return next.handle(request);
}
}