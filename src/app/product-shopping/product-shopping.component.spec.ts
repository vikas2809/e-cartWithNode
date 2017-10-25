import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductShoppingComponent } from './product-shopping.component';

describe('ProductShoppingComponent', () => {
  let component: ProductShoppingComponent;
  let fixture: ComponentFixture<ProductShoppingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductShoppingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductShoppingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
