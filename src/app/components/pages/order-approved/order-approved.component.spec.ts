import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderApprovedComponent } from './order-approved.component';

describe('OrderApprovedComponent', () => {
  let component: OrderApprovedComponent;
  let fixture: ComponentFixture<OrderApprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderApprovedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
