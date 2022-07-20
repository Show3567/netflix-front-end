import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageTwoIiComponent } from './page-two-ii.component';

describe('PageTwoIiComponent', () => {
  let component: PageTwoIiComponent;
  let fixture: ComponentFixture<PageTwoIiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageTwoIiComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageTwoIiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
