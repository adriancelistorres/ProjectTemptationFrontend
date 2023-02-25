import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailincomeComponent } from './detailincome.component';

describe('DetailincomeComponent', () => {
  let component: DetailincomeComponent;
  let fixture: ComponentFixture<DetailincomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailincomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailincomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
