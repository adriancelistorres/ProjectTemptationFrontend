import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInactiveBrandComponent } from './edit-inactive-brand.component';

describe('EditInactiveBrandComponent', () => {
  let component: EditInactiveBrandComponent;
  let fixture: ComponentFixture<EditInactiveBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInactiveBrandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditInactiveBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
