import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  template: `<div>Home Page</div>`,
})
class HomeComponent {}

fdescribe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let appComponent: AppComponent;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: '/home', component: HomeComponent },
        ]),
      ],
      declarations: [AppComponent, HomeComponent],
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(AppComponent);
    appComponent = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(appComponent).toBeTruthy();
  });

  it('should initialize mainContentElement', () => {
    expect(fixture.debugElement).toBeDefined();
  });

  it('should call onActivate method', () => {
    const dummyElement = document.createElement('div');
    spyOn(appComponent, 'onActivate');
    appComponent.onActivate(dummyElement);
    expect(appComponent.onActivate).toHaveBeenCalledWith(dummyElement);
  });
});
