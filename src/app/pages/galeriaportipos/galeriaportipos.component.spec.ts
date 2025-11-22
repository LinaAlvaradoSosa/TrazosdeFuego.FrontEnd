import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaleriaportiposComponent } from './galeriaportipos.component';

describe('GaleriaportiposComponent', () => {
  let component: GaleriaportiposComponent;
  let fixture: ComponentFixture<GaleriaportiposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GaleriaportiposComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GaleriaportiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
