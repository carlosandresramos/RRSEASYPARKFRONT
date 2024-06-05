import { Component, Input } from '@angular/core';
import { ParkingLot } from 'Models/ParkingLot';
import { ParkingLotService } from 'src/app/service/parkingLot/parking-lot.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MapsServiceService } from 'src/app/service/maps/maps-service.service';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})
export class GoogleMapsComponent {

  // @Input() parkingData: ParkingLot = {
  //   name: '',
  //   adress: '',
  //   lat: 0,
  //   lng: 0,
  //   nit: '',
  //   telephone: 0,
  //   normalPrice: 0,
  //   disabilityPrice: 0,
  //   info: '',
  //   cantSpacesMotorcycle: 0,
  //   cantSpacesCar: 0,
  //   cantSpacesDisability: 0,
  //   disabilityservices: '',
  //   image: '',
  //   cityId: '',
  //   cityName: '',
  //   propietaryParkId: ''
  // };

  title = 'gmaps';
  adress!: string;
  city!: string;
  lat!: number;
  lng!: number;
  // positionC!: position;
  test: boolean = false;

  // position = {
  //   lat: 4.7095764,
  //   lng: -74.2200847
  // };

  position = {
    lat: 0,
    lng: 0
  };

  label = {
    color: 'red',
    text: 'Marcador'
  };

  constructor(private route: ActivatedRoute, private _parkingLot: ParkingLotService, private _maps: MapsServiceService) {

  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.adress = params['adress']
      this.city = params['city']
    })
    console.log(this.adress);
    console.log(this.city);
    this.getcoordenates();

    // this.route.params.subscribe(params => {
    //   this.lng = params['lon']
    //   this.lat = params['lat']
    // })
    // console.log(this.lng);
    // console.log(this.lat);
    // console.log("Si los atrape");

  }

  getcoordenates() {
    this._maps.getCoordinates(this.adress, this.city).subscribe(Response => {
      console.log(Response),
      console.log(Response[0].lat),
      // this.lat = Response[0].lat;
      // this.lng = Response[0].lon;
      console.log("Si los atrape");
      console.log(this.lat);
      console.log(this.lng);
      console.log("Si los atrape");

      this.position.lat = parseFloat(Response[0].lat);
      this.position.lng = parseFloat(Response[0].lon);
      console.log(this.position);
      this.test = true;
    })
  }

  

  // position = {
  //   lat: this.positionC.lat,
  //   lng: this.positionC.lng
  // };


  // getParkingLot() {

  //     if (this.parking.adress != null) {
  //       this.reservationform.get('parkingType')?.setValue("NO")
  //     }
  //   })
  // }


}
