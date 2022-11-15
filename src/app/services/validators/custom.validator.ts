import { Inject, Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { debounceTime, map, switchMap, take, tap } from 'rxjs/operators';
import { AUTHSERVER } from 'src/app/core/core.module';

@Injectable({
  providedIn: 'root',
})
export class CustomValidator {
  constructor(
    private readonly http: HttpClient,
    @Inject(AUTHSERVER) private readonly authServerPath: string
  ) {}

  hasEmail(obj: any): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const email = control.value;
      return control.valueChanges.pipe(
        tap((_) => {
          obj.isLoading = true;
        }),
        debounceTime(500),
        switchMap((_) => {
          return this.http.post<boolean>(
            [this.authServerPath, 'auth', 'check-email'].join('/'),
            { email }
          );
        }),
        map((result: boolean) => {
          obj.isLoading = false;
          return result ? { hasemail: true } : null;
        }),
        take(1)
      );
    };
  }
}
