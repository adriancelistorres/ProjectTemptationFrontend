import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailClaimComponent } from './detail-claim.component';

describe('DetailClaimComponent', () => {
  let component: DetailClaimComponent;
  let fixture: ComponentFixture<DetailClaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailClaimComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
