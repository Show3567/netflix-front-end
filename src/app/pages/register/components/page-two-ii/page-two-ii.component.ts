import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-page-two-ii',
  templateUrl: './page-two-ii.component.html',
  styleUrls: ['./page-two-ii.component.scss'],
})
export class PageTwoIiComponent implements OnInit {
  applyTmdbApiKey =
    'https://developers.themoviedb.org/3/getting-started/authentication';
  form!: UntypedFormGroup;

  get username() {
    return this.form.get('username');
  }
  // get tmdb_key() {
  //   return this.form.get('tmdb_key');
  // }

  constructor(
    private fb: UntypedFormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      username: [''],
      // tmdb_key: ['', Validators.minLength(30)],
    });
  }

  errorMessageUsername() {
    return this.username?.hasError('required') ? 'You need a username' : '';
  }

  gotoApplyApiKey() {
    window.location.href = this.applyTmdbApiKey;
  }
  onSubmit() {
    this.authService.addUserInfo(this.form.value);
    this.router.navigate(['/register/step3']);
  }
}
