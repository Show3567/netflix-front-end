import { Inject, Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AUTHSERVER } from 'src/app/app.module';
import { debounceTime, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CustomValidator {
  constructor(
    private readonly http: HttpClient,
    @Inject(AUTHSERVER) private readonly authServerPath: string
  ) {}

  hasEmail(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const email = control.value;
      return this.http
        .post([this.authServerPath, 'auth', 'check-email'].join('/'), { email })
        .pipe(
          debounceTime(500),
          map((result: any) => {
            return result ? { hasemail: true } : null;
          })
        );
    };
  }
}
