import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseItem } from './expense-item';

describe('ExpenseItem', () => {
  let component: ExpenseItem;
  let fixture: ComponentFixture<ExpenseItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseItem],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpenseItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
