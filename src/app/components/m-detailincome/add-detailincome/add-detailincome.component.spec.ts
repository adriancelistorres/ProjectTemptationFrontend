import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDetailincomeComponent } from './add-detailincome.component';

describe('AddDetailincomeComponent', () => {
  let component: AddDetailincomeComponent;
  let fixture: ComponentFixture<AddDetailincomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDetailincomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDetailincomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
