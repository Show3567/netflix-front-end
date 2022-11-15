import { Inject, Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { AUTHSERVER } from 'src/app/core/core.module';

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
        .post<boolean>([this.authServerPath, 'auth', 'check-email'].join('/'), {
          email,
        })
        .pipe(
          debounceTime(500),
          map((result: boolean) => {
            return result ? { hasemail: true } : null;
          })
        );
    };
  }
}
