import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericFormgroupComponent } from './generic-formgroup.component';

describe('GenericFormgroupComponent', () => {
  let component: GenericFormgroupComponent;
  let fixture: ComponentFixture<GenericFormgroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericFormgroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericFormgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
