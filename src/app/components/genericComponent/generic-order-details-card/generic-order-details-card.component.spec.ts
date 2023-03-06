import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericOrderDetailsCardComponent } from './generic-order-details-card.component';

describe('GenericOrderDetailsCardComponent', () => {
  let component: GenericOrderDetailsCardComponent;
  let fixture: ComponentFixture<GenericOrderDetailsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericOrderDetailsCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericOrderDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
