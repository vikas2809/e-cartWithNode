import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOutPageComponent } from './check-out-page.component';

describe('CheckOutPageComponent', () => {
  let component: CheckOutPageComponent;
  let fixture: ComponentFixture<CheckOutPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckOutPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckOutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
