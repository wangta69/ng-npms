import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoAddressValidatorComponent } from './crypto-address-validator.component';

describe('CryptoAddressValidatorComponent', () => {
  let component: CryptoAddressValidatorComponent;
  let fixture: ComponentFixture<CryptoAddressValidatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CryptoAddressValidatorComponent]
    });
    fixture = TestBed.createComponent(CryptoAddressValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
