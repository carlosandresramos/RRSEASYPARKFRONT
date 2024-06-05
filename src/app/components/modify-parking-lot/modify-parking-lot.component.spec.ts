import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyParkingLotComponent } from './modify-parking-lot.component';

describe('ModifyParkingLotComponent', () => {
  let component: ModifyParkingLotComponent;
  let fixture: ComponentFixture<ModifyParkingLotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyParkingLotComponent]
    });
    fixture = TestBed.createComponent(ModifyParkingLotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
