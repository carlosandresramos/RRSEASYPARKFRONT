import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterParkinglotComponent } from './register-parkinglot.component';

describe('RegisterParkinglotComponent', () => {
  let component: RegisterParkinglotComponent;
  let fixture: ComponentFixture<RegisterParkinglotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterParkinglotComponent]
    });
    fixture = TestBed.createComponent(RegisterParkinglotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
