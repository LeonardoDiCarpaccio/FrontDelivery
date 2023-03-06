import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericTableOrderComponent } from './generic-table-order.component';

describe('GenericTableOrderComponent', () => {
  let component: GenericTableOrderComponent;
  let fixture: ComponentFixture<GenericTableOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericTableOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericTableOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
