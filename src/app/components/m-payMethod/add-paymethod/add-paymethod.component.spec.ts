import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPaymethodComponent } from './add-paymethod.component';

describe('AddPaymethodComponent', () => {
  let component: AddPaymethodComponent;
  let fixture: ComponentFixture<AddPaymethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPaymethodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPaymethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
