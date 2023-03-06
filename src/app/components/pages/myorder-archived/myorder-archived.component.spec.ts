import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyorderArchivedComponent } from './myorder-archived.component';

describe('MyorderArchivedComponent', () => {
  let component: MyorderArchivedComponent;
  let fixture: ComponentFixture<MyorderArchivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyorderArchivedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyorderArchivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
