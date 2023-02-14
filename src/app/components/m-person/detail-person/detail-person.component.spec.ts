import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPersonComponent } from './detail-person.component';

describe('DetailPersonComponent', () => {
  let component: DetailPersonComponent;
  let fixture: ComponentFixture<DetailPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailPersonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
