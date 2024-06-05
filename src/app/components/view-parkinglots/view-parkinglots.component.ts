import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { ParkingLot } from 'Models/ParkingLot';
import { LenguageService } from 'src/app/service/lenguage/lenguage.service';
import { ParkingLotService } from 'src/app/service/parkingLot/parking-lot.service';

@Component({
  selector: 'app-view-parkinglots',
  templateUrl: './view-parkinglots.component.html',
  styleUrls: ['./view-parkinglots.component.css']
})
export class ViewParkinglotsComponent implements OnInit{

  public list: ParkingLot[] = [];

  constructor(private translocoservice: TranslocoService, private languageService: LenguageService, private _ParkingLotService: ParkingLotService, private router: Router){

  }
  ngOnInit(): void {
    this.getParkingLots();
    const selectedLanguage = this.languageService.getSelectedLanguage();
    localStorage.setItem('selectedLanguage', selectedLanguage);
    this.translocoservice.setActiveLang(selectedLanguage)
  }
  getParkingLots() {
    this._ParkingLotService.getParkingLotsPropietary().subscribe(response => { this.list = response; });
  }
  reserva(parking: any) {
    this.router.navigate([`/viewReservation/${parking.id}`]);
  }
}
