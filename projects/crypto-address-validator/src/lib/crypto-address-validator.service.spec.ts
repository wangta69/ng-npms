import { TestBed } from '@angular/core/testing';

import { CryptoAddressValidatorService } from './crypto-address-validator.service';

describe('CryptoAddressValidatorService', () => {
  let service: CryptoAddressValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptoAddressValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
