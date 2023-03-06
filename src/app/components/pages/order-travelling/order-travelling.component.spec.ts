import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTravellingComponent } from './order-travelling.component';

describe('OrderTravellingComponent', () => {
  let component: OrderTravellingComponent;
  let fixture: ComponentFixture<OrderTravellingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderTravellingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTravellingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
