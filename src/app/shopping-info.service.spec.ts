import { TestBed, inject } from '@angular/core/testing';

import { ShoppingInfoService } from './shopping-info.service';

describe('ShoppingInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShoppingInfoService]
    });
  });

  it('should be created', inject([ShoppingInfoService], (service: ShoppingInfoService) => {
    expect(service).toBeTruthy();
  }));
});
