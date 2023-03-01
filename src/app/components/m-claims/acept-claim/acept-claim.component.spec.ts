import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AceptClaimComponent } from './acept-claim.component';

describe('AceptClaimComponent', () => {
  let component: AceptClaimComponent;
  let fixture: ComponentFixture<AceptClaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AceptClaimComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AceptClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
