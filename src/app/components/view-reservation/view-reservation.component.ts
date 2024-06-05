import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Reservation } from 'Models/Reservation';
import { LenguageService } from 'src/app/service/lenguage/lenguage.service';
import { ReservationService } from 'src/app/service/reservation/reservation.service';

@Component({
  selector: 'app-view-reservation',
  templateUrl: './view-reservation.component.html',
  styleUrls: ['./view-reservation.component.css']
})
export class ViewReservationComponent {
  dataSource = new MatTableDataSource<Reservation>();
  displayedColumns: string[] = ['Name','Telephone','Price', 'Disabled','StartDate','EndDate', 'Date'];
  id!: string;

  fechaSeleccionada!: Date | null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private translocoservice: TranslocoService, private languageService: LenguageService,private _reservation:ReservationService, private route: ActivatedRoute){

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']
    })

    this.getReservations();
    const selectedLanguage = this.languageService.getSelectedLanguage();
    localStorage.setItem('selectedLanguage', selectedLanguage);
    this.translocoservice.setActiveLang(selectedLanguage);
    
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  getReservations(){
    this._reservation.getReservationsParkingLot(this.id).subscribe(response =>{ this.dataSource.data = response;});
  }

  onFechaSeleccionada(event: any) {

     this.fechaSeleccionada = event.value;
     if(this.fechaSeleccionada){
      const mes = (this.fechaSeleccionada.getMonth() + 1).toString().padStart(2, '0');
      const dia = this.fechaSeleccionada.getDate().toString().padStart(2, '0');
      const selectedDate = `${mes}-${dia}-${this.fechaSeleccionada.getFullYear()}`;
      console.log(selectedDate);
      this.dataSource.filter = selectedDate
     }
  }

  quitarFiltroFecha() {
    this.dataSource.filter = '';
    this.fechaSeleccionada = null; // También puedes reiniciar la fecha seleccionada si lo deseas
  }

}
