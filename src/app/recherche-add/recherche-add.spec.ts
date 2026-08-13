import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheAdd } from './recherche-add';

describe('RechercheAdd', () => {
  let component: RechercheAdd;
  let fixture: ComponentFixture<RechercheAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RechercheAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(RechercheAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
