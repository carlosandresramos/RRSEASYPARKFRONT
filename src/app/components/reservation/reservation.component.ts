import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ParkingLot } from 'Models/ParkingLot';
import { Reservation } from 'Models/Reservation';
import { TypeVehicle } from 'Models/TypeVehicle';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Tile } from 'Interfaces/Tile';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ParkingLotService } from 'src/app/service/parkingLot/parking-lot.service';
import { ReservationService } from 'src/app/service/reservation/reservation.service';
import { TypeVehicleService } from 'src/app/service/typeVehicle/type-vehicle.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LenguageService } from 'src/app/service/lenguage/lenguage.service';
import { TranslocoService } from '@ngneat/transloco';


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {

  public ListVehicles: TypeVehicle[] = [];
  public ListVehiclesFilter: TypeVehicle[] = [];
  id!: string;
  park!: ParkingLot
  parking!: ParkingLot;
  reservationform: FormGroup;
  totalprice!: number;

  dataSource = new MatTableDataSource<Reservation>();
  displayedColumns: string[] = ['startdate', 'enddate', 'totalPrice', 'Disable', 'parkingType', 'vehicleType'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;//! le estamos diciendo que no es nulo
  //esta línea de código está configurando una referencia al paginador de Angular Material
  //para que pueda ser utilizado y manipulado en el componente donde se encuentra esta declaración

  UpdateList(NewValue: any) {

    console.log(NewValue)
    if (NewValue == "SI") {
      this.ListVehiclesFilter = this.ListVehicles.filter(x => x.disabilityEnable === true)
      //this.totalprice = this.parking.disabilityPrice
    } else {
      this.ListVehiclesFilter = this.ListVehicles
      //this.totalprice = this.parking.normalPrice
    }
  }
  constructor(private translocoservice: TranslocoService, private languageService: LenguageService, private _snackBar: MatSnackBar, private _typeVehicle: TypeVehicleService, private _ReservationService: ReservationService, private route: ActivatedRoute, private router: Router, private _parkingLot: ParkingLotService, private formBuilder: FormBuilder, private fb: FormBuilder) {

    this.reservationform = this.fb.group({

      date: [''],
      starttime: [''],
      endtime: [''],
      parkingType: [''],
      vehicleType: ['']
    })

  }
  AddReservation() {

    let date = this.reservationform.value.date ? new Date(this.reservationform.value.date) : new Date();
    let starttime = this.reservationform.value.starttime.toString() + ":00"
    console.log(starttime)
    let endtime = this.reservationform.value.endtime.toString() + ":00"
    console.log(endtime)
    console.log("Hola")
    console.log((date.getDate() + 1) + "/" + (date.getMonth() + 1) + "/" + date.getFullYear())

    const model: Reservation = {
      date: this.reservationform.value.date,
      starttime,
      endtime,
      disability: this.reservationform.value.parkingType,
      vehicleType: this.reservationform.value.vehicleType,
      id: '',
      totalPrice: this.totalprice,
      parkingLotId: this.parking.id ?? ""
    }
    console.log(model);
    this._ReservationService.AddReservation(model).subscribe(
      {

        next: (data) => {
          
          this.reservationform.reset();
          this._snackBar.open('Reserva Exitosa', 'Cerrar', {
            duration: 3000, 
          });
          
        }, error: (e) => { alert(e.error) }

      }
    )

    //this.aRoute.paramMap.subscribe(params => {
    // const elementJson = params.get('id');
    // if(elementJson){
    //  const element = JSON.parse(decodeURIComponent(elementJson));
    //  this.id = element;
    //}

    // });

  }
  ngOnInit(): void {
    this.getTypeVehicle();
    
    // Here we get the id that comes from the other view
    this.route.params.subscribe(params => {
      this.id = params['id']
    })

    this.getParkingLot();
    const selectedLanguage = this.languageService.getSelectedLanguage();
    localStorage.setItem('selectedLanguage', selectedLanguage);
    this.translocoservice.setActiveLang(selectedLanguage)

  }
  getTypeVehicle() {
    this._typeVehicle.getTypeVehicle().subscribe(response => { this.ListVehicles = response; this.ListVehiclesFilter = this.ListVehicles });
  }

  getParkingLot() {
    this._parkingLot.getParkingLot(this.id).subscribe(data => {
      this.parking = data;
      if (this.parking.disabilityservices == "NO") {
        this.reservationform.get('parkingType')?.setValue("NO")
      }
    })
  }

}