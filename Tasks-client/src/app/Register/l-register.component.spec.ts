import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LRegisterComponent } from './l-register.component';

describe('LRegisterComponent', () => {
  let component: LRegisterComponent;
  let fixture: ComponentFixture<LRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
