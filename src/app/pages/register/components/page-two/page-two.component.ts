import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  UntypedFormBuilder,
  UntypedFormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { debounceTime, map, switchMap, tap, take } from 'rxjs/operators';

import { AuthService } from 'src/app/services/auth/auth.service';
import { AUTHSERVER } from 'src/app/core/core.module';

@Component({
  selector: 'app-page-two',
  templateUrl: './page-two.component.html',
  styleUrls: ['./page-two.component.scss'],
})
export class PageTwoComponent implements OnInit {
  form!: UntypedFormGroup;
  isLoading = false;

  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }

  constructor(
    private fb: UntypedFormBuilder,
    private readonly router: Router,
    private readonly http: HttpClient,
    private readonly authService: AuthService,
    @Inject(AUTHSERVER) private readonly authServerPath: string
  ) {}
  ngOnInit(): void {
    const initemailVal = this.authService.appNewUser.email
      ? this.authService.appNewUser.email
      : '';

    this.form = this.fb.group({
      email: [initemailVal, [Validators.email], [this.hasEmail()]],
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

  /* customValidator */
  hasEmail(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const email = control.value;
      return control.valueChanges.pipe(
        tap((_) => {
          this.isLoading = true;
        }),
        debounceTime(500),
        switchMap((_) => {
          return this.http.post(
            [this.authServerPath, 'auth', 'check-email'].join('/'),
            { email }
          );
        }),
        map((result: any) => {
          this.isLoading = false;
          return result ? { hasemail: true } : null;
        }),
        take(1)
      );
    };
  }
}
