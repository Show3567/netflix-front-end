import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainRowTwoComponent } from './main-row-two.component';

describe('MainRowTwoComponent', () => {
  let component: MainRowTwoComponent;
  let fixture: ComponentFixture<MainRowTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainRowTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainRowTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
