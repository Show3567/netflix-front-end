import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/auth/register.service';

@Component({
  selector: 'app-page-two',
  templateUrl: './page-two.component.html',
  styleUrls: ['./page-two.component.scss'],
})
export class PageTwoComponent implements OnInit {
  form!: FormGroup;

  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }

  constructor(
    private fb: FormBuilder,
    private readonly router: Router,
    private readonly registerService: RegisterService
  ) {}

  ngOnInit(): void {
    const initemailVal = this.registerService.appUserRegister.email
      ? this.registerService.appUserRegister.email
      : '';

    this.form = this.fb.group({
      email: [initemailVal, Validators.email],
      password: [''],
    });
  }

  getErrorMessage() {
    if (this.email?.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email?.hasError('email') ? 'Not a valid email' : '';
  }

  onSubmit() {
    this.registerService.addUserInfo(this.form.value);
    this.router.navigate(['/register/step2ii']);
  }
}