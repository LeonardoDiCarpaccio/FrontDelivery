import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericTableMyorderComponent } from './generic-table-myorder.component';

describe('GenericTableMyorderComponent', () => {
  let component: GenericTableMyorderComponent;
  let fixture: ComponentFixture<GenericTableMyorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericTableMyorderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericTableMyorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
