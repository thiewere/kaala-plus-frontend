import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentList } from './payment-list';

describe('PaymentList', () => {
  let component: PaymentList;
  let fixture: ComponentFixture<PaymentList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentList],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
