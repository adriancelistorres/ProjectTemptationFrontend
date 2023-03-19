import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashventasComponent } from './dashventas.component';

describe('DashventasComponent', () => {
  let component: DashventasComponent;
  let fixture: ComponentFixture<DashventasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashventasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashventasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
