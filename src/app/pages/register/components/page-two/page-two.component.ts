import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { WithLocalstorageService } from '../../../../services/auth/with-localstorage.service';
import { CustomValidator } from '../../../../services/validators/custom.validator';
import { HttpClient } from '@angular/common/http';
import { AUTHSERVER } from 'src/app/app.module';
import { debounceTime, map, switchMap, tap, take } from 'rxjs/operators';

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
    private fb: FormBuilder,
    private readonly router: Router,
    private readonly http: HttpClient,
    private readonly authService: WithLocalstorageService,
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
