import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardItem } from './dashboard-item';

describe('DashboardItem', () => {
  let component: DashboardItem;
  let fixture: ComponentFixture<DashboardItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardItem],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
