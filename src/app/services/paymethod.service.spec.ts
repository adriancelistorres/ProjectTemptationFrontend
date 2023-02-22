import { TestBed } from '@angular/core/testing';

import { PaymethodService } from './paymethod.service';

describe('PaymethodService', () => {
  let service: PaymethodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymethodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
