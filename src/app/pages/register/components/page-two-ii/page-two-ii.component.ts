import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../../../services/auth/register.service';

@Component({
  selector: 'app-page-two-ii',
  templateUrl: './page-two-ii.component.html',
  styleUrls: ['./page-two-ii.component.scss'],
})
export class PageTwoIiComponent implements OnInit {
  applyTmdbApiKey =
    'https://developers.themoviedb.org/3/getting-started/authentication';
  form!: FormGroup;

  get username() {
    return this.form.get('username');
  }
  get tmdb_key() {
    return this.form.get('tmdb_key');
  }

  constructor(
    private fb: FormBuilder,
    private readonly router: Router,
    private readonly registerService: RegisterService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [''],
      tmdb_key: [''],
    });
  }

  errorMessageUsername() {
    return this.username?.hasError('required') ? 'You need a username' : '';
  }
  errorMessageApiKey() {
    return this.tmdb_key?.hasError('required')
      ? 'We need your tmdb api_key'
      : '';
  }

  gotoApplyApiKey() {
    window.location.href = this.applyTmdbApiKey;
  }

  onSubmit() {
    this.registerService.addUserInfo(this.form.value);
    this.router.navigate(['/register/step3']);
  }
}
