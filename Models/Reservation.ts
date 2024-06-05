import { Time } from "@angular/common";

export interface Reservation {
    id: string;
    date: string;
    starttime: string;
    endtime: string;
    totalPrice: number;  
    vehicleType: string;
    parkingLotId: string;    
    disability: string;  
}