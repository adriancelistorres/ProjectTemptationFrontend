import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StylessComponent } from './styless.component';

describe('StylessComponent', () => {
  let component: StylessComponent;
  let fixture: ComponentFixture<StylessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StylessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StylessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
