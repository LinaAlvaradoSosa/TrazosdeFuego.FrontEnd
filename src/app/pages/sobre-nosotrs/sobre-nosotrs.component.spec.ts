import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SobreNosotrsComponent } from './sobre-nosotrs.component';

describe('SobreNosotrsComponent', () => {
  let component: SobreNosotrsComponent;
  let fixture: ComponentFixture<SobreNosotrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SobreNosotrsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SobreNosotrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
