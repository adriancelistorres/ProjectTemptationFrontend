import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRolComponent } from './add-rol.component';

describe('AddRolComponent', () => {
  let component: AddRolComponent;
  let fixture: ComponentFixture<AddRolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
