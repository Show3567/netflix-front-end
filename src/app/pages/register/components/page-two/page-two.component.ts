import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { AUTHSERVER } from 'src/app/core/core.module';
import { AuthNgrxService } from 'src/app/Ngrx/Auth/auth-ngrx.service';
import { CustomValidator } from 'src/app/services/validators/custom.validator';

@Component({
  selector: 'app-page-two',
  templateUrl: './page-two.component.html',
  styleUrls: ['./page-two.component.scss'],
})
export class PageTwoComponent implements OnInit {
  form!: FormGroup;
  isLoading = false;

  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly http: HttpClient,
    private readonly authService: AuthNgrxService,
    private readonly customValidator: CustomValidator,
    @Inject(AUTHSERVER) private readonly authServerPath: string
  ) {}
  ngOnInit(): void {
    const initemailVal = this.authService.appNewUser.email
      ? this.authService.appNewUser.email
      : '';

    this.form = this.fb.group({
      email: [
        initemailVal,
        [Validators.email],
        [this.customValidator.hasEmail(this)],
      ],
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
    this.authService.addUserInfo(this.form.value);
    this.router.navigate(['/register/step2ii']);
  }
}
