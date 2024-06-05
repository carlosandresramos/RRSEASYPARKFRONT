import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParkingLotComponent } from './components/parking-lot/parking-lot.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import {Component} from '@angular/core';
import {NgFor} from '@angular/common';
import {MatGridListModule} from '@angular/material/grid-list';
import { PrincipalPageComponent } from './components/principal-page/principal-page.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ViewReservationComponent } from './components/view-reservation/view-reservation.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import { LoginComponent } from './components/login/login.component';
import { JwtInteceptor } from './security/jwt.interceptor';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import {MatMenuModule} from '@angular/material/menu';
import { RegisterParkinglotComponent } from './components/register-parkinglot/register-parkinglot.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ViewParkinglotsComponent } from './components/view-parkinglots/view-parkinglots.component';
import { RegisterComponent } from './components/register/register.component';
import { PasswordRecoveryComponent } from './components/password-recovery/password-recovery.component';
import { ConfirmPasswordComponent } from './components/confirm-password/confirm-password.component';

import { GoogleMapsComponent } from './components/google-maps/google-maps.component';
import { GoogleMapsModule } from '@angular/google-maps';


import { SiveNavClientComponent } from './components/sive-nav-client/sive-nav-client.component';
import { GetReservationsComponent } from './components/get-reservations/get-reservations.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ParkingLotsComponent } from './components/parking-lots/parking-lots.component';
import { ModifyParkingLotComponent } from './components/modify-parking-lot/modify-parking-lot.component';
import { TranslocoRootModule } from './transloco-root.module';
import { ComboComponent } from './components/combo/combo.component';


@NgModule({
  declarations: [
    AppComponent,
    ParkingLotComponent,
    PrincipalPageComponent,
    ReservationComponent,
    SideNavComponent,
    ViewReservationComponent,
    LoginComponent,
    UnauthorizedComponent,
    RegisterParkinglotComponent,
    ViewParkinglotsComponent,
    RegisterComponent,
    PasswordRecoveryComponent,
    ConfirmPasswordComponent,

    GoogleMapsComponent,

    SiveNavClientComponent,
    GetReservationsComponent,
    ConfirmDialogComponent,
    ParkingLotsComponent,
    ModifyParkingLotComponent,
    ComboComponent

  ],
  imports: [
    NgFor,
    MatGridListModule,
    BrowserModule,   
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatPaginatorModule,
    MatTableModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatIconModule,
    MatExpansionModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatListModule,
    MatButtonToggleModule,
    MatToolbarModule,
    MatMenuModule,
    MatSnackBarModule,
    GoogleMapsModule,
    MatDialogModule,
    TranslocoRootModule

  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInteceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
