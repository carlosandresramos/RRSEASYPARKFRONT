import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewParkinglotsComponent } from './view-parkinglots.component';

describe('ViewParkinglotsComponent', () => {
  let component: ViewParkinglotsComponent;
  let fixture: ComponentFixture<ViewParkinglotsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewParkinglotsComponent]
    });
    fixture = TestBed.createComponent(ViewParkinglotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
