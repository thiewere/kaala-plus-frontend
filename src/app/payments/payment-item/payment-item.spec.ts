import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentItem } from './payment-item';

describe('PaymentItem', () => {
  let component: PaymentItem;
  let fixture: ComponentFixture<PaymentItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentItem],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
