import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientItem } from './client-item';

describe('ClientItem', () => {
  let component: ClientItem;
  let fixture: ComponentFixture<ClientItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientItem],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
