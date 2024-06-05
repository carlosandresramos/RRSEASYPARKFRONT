import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ParkingLotService } from '../../service/parkingLot/parking-lot.service';
import { ParkingLot } from 'Models/ParkingLot';
import { FormBuilder, FormGroup } from '@angular/forms';
import { City } from 'Models/City';
import { CityService } from '../../service/city/city.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { Tile } from 'Interfaces/Tile';
import { AuthService } from 'src/app/service/auth/auth.service';
import { User } from 'Models/User';
import { TranslocoService } from '@ngneat/transloco';
import { LenguageService } from 'src/app/service/lenguage/lenguage.service';


@Component({
  selector: 'app-parking-lot',
  templateUrl: './parking-lot.component.html',
  styleUrls: ['./parking-lot.component.css'],

  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]

})

export class ParkingLotComponent implements OnInit, AfterViewInit {
  public list: ParkingLot[] = [];
  public ListCities: City[] = [];

  dataSource = new MatTableDataSource<ParkingLot>();
  displayedColumns: string[] = ['Icon', 'Name', 'Adress', 'City'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement!: ParkingLotComponent | null;
  user!: User | null;


  @ViewChild(MatPaginator) paginator!: MatPaginator;//! le estamos diciendo que no es nulo
  //esta línea de código está configurando una referencia al paginador de Angular Material
  //para que pueda ser utilizado y manipulado en el componente donde se encuentra esta declaración

  cityform!: FormGroup;
  form!: FormGroup;

  constructor(private translocoservice: TranslocoService, private languageService: LenguageService, private _ParkingLotService: ParkingLotService, private _CityService: CityService, private formBuilder: FormBuilder, private fb: FormBuilder,
    private router: Router, private _apiAuth: AuthService) {
    this._apiAuth.useer.subscribe(res => {
      this.user = res;
      console.log('cambio el objeto ' + res);
      console.log(this.user);
    });




    this.cityform = this.fb.group({
      selectedCity: [''],
      filterValue: [''],
      disabilityservice: ['']
    });

    
  }
  reserva(element: any) {
    this.router.navigate([`/Reservation/${element.id}`]);
  }

  coordinates(element: any){
    this.router.navigate([`/googleMaps`],{queryParams: {adress: element.adress, city: element.cityName}});
  }

  obtenerinfo() {
    this._apiAuth.getTokenUserInfo();
  }
 

  ngOnInit(): void {
    this.getParkingLots();
    this.getCity();
    this.obtenerinfo();
    const selectedLanguage = this.languageService.getSelectedLanguage();
    localStorage.setItem('selectedLanguage', selectedLanguage);
    this.translocoservice.setActiveLang(selectedLanguage)
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  getParkingLots() {
    this._ParkingLotService.getParkingLots().subscribe(response => { this.dataSource.data = response; });
  }
  getCity() {
    this._CityService.getCity().subscribe(response => { this.ListCities = response; });
  }
  logout() {
    this._apiAuth.logout();
    this.router.navigate(['/Login']);
  }
  
  /*
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filterPredicate = (data, filter) => {
      return data.adress.toLowerCase().includes(filter);
    };
  
        }
      )
    }
  
    ngOnInit(): void {
      this.getParkingLots();
      this.getCity();
    }
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }
    getParkingLots() {
      this._ParkingLotService.getParkingLots().subscribe(response => { this.dataSource.data = response; });
    }
  
    /*addParkingLot(newParkingLot) {
      this._ParkingLotService.addParkingLot(newParkingLot).subscribe(response => {
        // Aquí podrías actualizar tu lista de estacionamientos después de agregar uno nuevo.
        // Por ejemplo, si tienes una lista de estacionamientos almacenada en una variable llamada "parkingLots":
        // this.parkingLots.push(response);
      });
    }*/

  /*
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filterPredicate = (data, filter) => {
      return data.adress.toLowerCase().includes(filter);
    };
  
    // La función filterPredicate toma dos argumentos: data (que representa un elemento de tu fuente de datos) 
    //y filter (que es el valor que se está utilizando para filtrar).
  
    //En este caso, la función de filtro personalizada verifica si el name de data incluye el filtro proporcionado. 
  }
  
  applyFilterCity(event: MatSelectChange) {
    const selectedCity = event.value;
  
    if (selectedCity) {
      this.dataSource.filter = selectedCity.toString();
      this.dataSource.filterPredicate = (data, filter) => {
        return data.cityId.toString() === filter;
      };
    } else {
      this.dataSource.filter = '';
    }
  }
  */
  applyCityFilter() {
    const selectedCityControl = this.cityform.get('selectedCity');
    const filterValueControl = this.cityform.get('filterValue');
    const disabilityserviceControl = this.cityform.get('disabilityservice');

    if (selectedCityControl && filterValueControl && disabilityserviceControl) {
      const selectedCity = selectedCityControl.value;
      const filterValue = filterValueControl.value;
      const disabilityservice = disabilityserviceControl.value;

      this.dataSource.filter = JSON.stringify({ selectedCity, filterValue, disabilityservice });
      //esta cogiendo selectedCity y filterValue, y los une y los convierte en una cadena de texto. Esto le dice al programa qué buscar en los datos.
      //en resumen esta asignando como sera el filtro que necesita

      this.dataSource.filterPredicate = (data, filters) => {
        const { selectedCity, filterValue, disabilityservice } = JSON.parse(filters);

        //filterPredicate: aqui le decimos que muestre solo los objetos que cumplan con ciertas condiciones que yo extablesco
        //filterPredicate se ejecuta automáticamente en cada dato cuando se aplica el filtro en la interfaz de usuario.
        let cityFilter = true;
        if (selectedCity) {
          cityFilter = data.cityId.toString() === selectedCity.toString();
        }

        let textFilter = true;
        if (filterValue) {
          textFilter = data.adress.toLowerCase().includes(filterValue.toLowerCase());
        }

        let parkingTypeFilter = true;
        if (disabilityservice) {
          parkingTypeFilter = data.disabilityservices === disabilityservice;
        }

        return cityFilter && textFilter && parkingTypeFilter;

      };
      if (!filterValue) {
        this.dataSource.filter = JSON.stringify({ selectedCity, disabilityservice, filterValue: '' });
      }
    } else {
      console.error('Alguno de los controles no está definido.');
    }

  }

  //tiles: Tile[] = [
  //{text: 'One', cols: 3, rows: 1, color: 'lightblue'},
  //{text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
  //{text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
  //{text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  //];

}
