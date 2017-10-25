import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverAddressComponent } from './deliver-address.component';

describe('DeliverAddressComponent', () => {
  let component: DeliverAddressComponent;
  let fixture: ComponentFixture<DeliverAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliverAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliverAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
