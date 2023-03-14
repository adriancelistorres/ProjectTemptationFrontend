import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashproductComponent } from './dashproduct.component';

describe('DashproductComponent', () => {
  let component: DashproductComponent;
  let fixture: ComponentFixture<DashproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashproductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
