import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingLotsComponent } from './parking-lots.component';

describe('ParkingLotsComponent', () => {
  let component: ParkingLotsComponent;
  let fixture: ComponentFixture<ParkingLotsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParkingLotsComponent]
    });
    fixture = TestBed.createComponent(ParkingLotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
