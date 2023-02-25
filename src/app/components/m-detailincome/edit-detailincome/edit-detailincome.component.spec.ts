import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDetailincomeComponent } from './edit-detailincome.component';

describe('EditDetailincomeComponent', () => {
  let component: EditDetailincomeComponent;
  let fixture: ComponentFixture<EditDetailincomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDetailincomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDetailincomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
