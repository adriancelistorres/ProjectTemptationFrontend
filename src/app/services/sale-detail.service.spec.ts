import { TestBed } from '@angular/core/testing';

import { SaleDetailService } from './sale-detail.service';

describe('SaleDetailService', () => {
  let service: SaleDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaleDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
