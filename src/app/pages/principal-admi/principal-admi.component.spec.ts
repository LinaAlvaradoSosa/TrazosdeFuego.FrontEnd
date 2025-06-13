import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalAdmiComponent } from './principal-admi.component';

describe('PrincipalAdmiComponent', () => {
  let component: PrincipalAdmiComponent;
  let fixture: ComponentFixture<PrincipalAdmiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrincipalAdmiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrincipalAdmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
