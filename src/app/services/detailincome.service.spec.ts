import { TestBed } from '@angular/core/testing';

import { DetailincomeService } from './detailincome.service';

describe('DetailincomeService', () => {
  let service: DetailincomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailincomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
