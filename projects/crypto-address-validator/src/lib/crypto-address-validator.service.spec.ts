import { TestBed } from '@angular/core/testing';

import { CryptoAddressValidatorService } from './crypto-address-validator.service';

describe('CryptoAddressValidatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CryptoAddressValidatorService = TestBed.get(CryptoAddressValidatorService);
    expect(service).toBeTruthy();
  });
});
