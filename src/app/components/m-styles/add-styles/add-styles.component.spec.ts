import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStylesComponent } from './add-styles.component';

describe('AddStylesComponent', () => {
  let component: AddStylesComponent;
  let fixture: ComponentFixture<AddStylesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStylesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStylesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
