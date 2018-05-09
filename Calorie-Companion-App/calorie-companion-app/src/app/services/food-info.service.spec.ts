import { TestBed, inject } from '@angular/core/testing';

import { FoodInfoService } from './food-info.service';

describe('FoodInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FoodInfoService]
    });
  });

  it('should be created', inject([FoodInfoService], (service: FoodInfoService) => {
    expect(service).toBeTruthy();
  }));
});
