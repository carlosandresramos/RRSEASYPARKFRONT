import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiveNavClientComponent } from './sive-nav-client.component';

describe('SiveNavClientComponent', () => {
  let component: SiveNavClientComponent;
  let fixture: ComponentFixture<SiveNavClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiveNavClientComponent]
    });
    fixture = TestBed.createComponent(SiveNavClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
