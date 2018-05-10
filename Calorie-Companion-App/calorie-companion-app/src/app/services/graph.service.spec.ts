import { TestBed, inject } from '@angular/core/testing';

import { GraphServiceService } from './graph-service.service';

describe('GraphServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GraphServiceService]
    });
  });

  it('should be created', inject([GraphServiceService], (service: GraphServiceService) => {
    expect(service).toBeTruthy();
  }));
});
