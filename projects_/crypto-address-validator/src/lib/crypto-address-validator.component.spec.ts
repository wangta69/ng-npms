import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoAddressValidatorComponent } from './crypto-address-validator.component';

describe('CryptoAddressValidatorComponent', () => {
  let component: CryptoAddressValidatorComponent;
  let fixture: ComponentFixture<CryptoAddressValidatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CryptoAddressValidatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoAddressValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
