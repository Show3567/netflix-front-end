import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ApplyTmdbApiKey } from 'src/app/core/core.module';
import { AuthNgrxService } from 'src/app/Ngrx/Auth/auth-ngrx.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-page-two-ii',
  templateUrl: './page-two-ii.component.html',
  styleUrls: ['./page-two-ii.component.scss'],
})
export class PageTwoIiComponent implements OnInit {
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
    private readonly authService: AuthNgrxService,
    @Inject(ApplyTmdbApiKey) private applyTmdbApiKey: string
  ) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      username: [''],
      tmdb_key: ['', Validators.minLength(30)],
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
