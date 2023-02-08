import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSizeComponent } from './edit-size.component';

describe('EditSizeComponent', () => {
  let component: EditSizeComponent;
  let fixture: ComponentFixture<EditSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSizeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
