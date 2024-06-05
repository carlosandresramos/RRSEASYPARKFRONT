import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParkingLotComponent } from './components/parking-lot/parking-lot.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { PrincipalPageComponent } from './components/principal-page/principal-page.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ViewReservationComponent } from './components/view-reservation/view-reservation.component';
import { AuthGuard } from './security/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { RoleGuard } from './security/role.guard';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { RegisterParkinglotComponent } from './components/register-parkinglot/register-parkinglot.component';
import { ViewParkinglotsComponent } from './components/view-parkinglots/view-parkinglots.component';
import { RegisterComponent } from './components/register/register.component';
import { PasswordRecoveryComponent } from './components/password-recovery/password-recovery.component';
import { ConfirmPasswordComponent } from './components/confirm-password/confirm-password.component';

import { GoogleMapsComponent } from './components/google-maps/google-maps.component';

import { SiveNavClientComponent } from './components/sive-nav-client/sive-nav-client.component';
import { GetReservationsComponent } from './components/get-reservations/get-reservations.component';
import { ParkingLotsComponent } from './components/parking-lots/parking-lots.component';
import { ModifyParkingLotComponent } from './components/modify-parking-lot/modify-parking-lot.component';



const routes: Routes = [
  {path: 'ParkingLot', component:ParkingLotComponent, canActivate : [AuthGuard, RoleGuard], data: { requiredRole: 'Client' }},
  {path: 'GetReservations', component:GetReservationsComponent, canActivate : [AuthGuard, RoleGuard], data: { requiredRole: 'Client' }},
  {path: 'Reservation/:id', component:ReservationComponent, canActivate : [AuthGuard, RoleGuard], data: { requiredRole: 'Client' }},
  {path: '', component:PrincipalPageComponent},
  {path: 'SideNav', component:SideNavComponent, canActivate : [AuthGuard]},
  {path: 'SideNavClient', component:SiveNavClientComponent, canActivate : [AuthGuard]},
  {path: 'viewReservation/:id', component:ViewReservationComponent, canActivate : [AuthGuard, RoleGuard], data: { requiredRole: 'Propietary Park' }},
  {path: 'RegisterParkingLot', component:RegisterParkinglotComponent, canActivate : [AuthGuard, RoleGuard], data: { requiredRole: 'Propietary Park' }},
  {path: 'Login', component:LoginComponent},
  {path: 'PasswordRecovery', component:PasswordRecoveryComponent},
  {path: 'ConfirmPassword/:token', component:ConfirmPasswordComponent},
  {path: 'Register', component:RegisterComponent},
  {path: 'Unauthorized', component:UnauthorizedComponent},
  {path: 'ViewParkingLot', component:ViewParkinglotsComponent, canActivate : [AuthGuard, RoleGuard], data: { requiredRole: 'Propietary Park' }},

  {path: 'googleMaps', component:GoogleMapsComponent, canActivate : [AuthGuard, RoleGuard], data: { requiredRole: 'Client' }},

  {path: 'View', component:ParkingLotsComponent, canActivate : [AuthGuard, RoleGuard], data: { requiredRole: 'Propietary Park' }},
  {path: 'Modify/:id', component:ModifyParkingLotComponent, canActivate : [AuthGuard, RoleGuard], data: { requiredRole: 'Propietary Park' }},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
