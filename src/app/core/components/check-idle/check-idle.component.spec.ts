import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckIdleComponent } from './check-idle.component';

describe('CheckIdleComponent', () => {
  let component: CheckIdleComponent;
  let fixture: ComponentFixture<CheckIdleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckIdleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckIdleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
