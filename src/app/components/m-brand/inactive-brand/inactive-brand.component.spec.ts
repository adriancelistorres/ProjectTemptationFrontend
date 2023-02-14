import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InactiveBrandComponent } from './inactive-brand.component';

describe('InactiveBrandComponent', () => {
  let component: InactiveBrandComponent;
  let fixture: ComponentFixture<InactiveBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InactiveBrandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InactiveBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
