import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashcomprasComponent } from './dashcompras.component';

describe('DashcomprasComponent', () => {
  let component: DashcomprasComponent;
  let fixture: ComponentFixture<DashcomprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashcomprasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashcomprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
