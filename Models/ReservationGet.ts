export interface ReservationGet {
    id: string;
    date: string;
    startTime: string;
    endTime: string;
    totalPrice: number;  
    vehicleType: string;
    typeVehicleId: string;    
    disability: string;  
    parkingLotName: string;
    adress: string;
}