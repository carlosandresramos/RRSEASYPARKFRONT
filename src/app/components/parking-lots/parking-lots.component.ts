import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { ParkingLot } from 'Models/ParkingLot';
import { LenguageService } from 'src/app/service/lenguage/lenguage.service';
import { ParkingLotService } from 'src/app/service/parkingLot/parking-lot.service';

@Component({
  selector: 'app-parking-lots',
  templateUrl: './parking-lots.component.html',
  styleUrls: ['./parking-lots.component.css']
})
export class ParkingLotsComponent {
  public list: ParkingLot[] = [];
  selectedLanguage!: string;

  constructor(private translocoservice: TranslocoService, private _ParkingLotService: ParkingLotService, private router: Router, private languageService: LenguageService){
    this.languageService.selectedLanguage$.subscribe(language => {
      this.selectedLanguage = language;
    });
  }
  ngOnInit(): void { 
    const selectedLanguage = this.languageService.getSelectedLanguage();
    localStorage.setItem('selectedLanguage', selectedLanguage);
    this.translocoservice.setActiveLang(selectedLanguage);
    this.getParkingLots();
   
  }
  getParkingLots() {
    this._ParkingLotService.getParkingLotsPropietary().subscribe(response => { this.list = response; });
  }
  modify(parking: any) {
    this.router.navigate([`/Modify/${parking.id}`]);
  }
}
