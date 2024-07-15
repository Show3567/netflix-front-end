import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  standalone: true,
  imports: [SharedModule, NgClass],
  selector: 'app-page-two-ii',
  templateUrl: './page-two-ii.component.html',
  styleUrls: ['./page-two-ii.component.scss'],
})
export class PageTwoIiComponent implements OnInit {
  applyTmdbApiKey =
    'https://developers.themoviedb.org/3/getting-started/authentication';
  form!: FormGroup;

  get username(): FormControl {
    return this.form.get('username') as FormControl;
  }
  // get tmdb_key() {
  //   return this.form.get('tmdb_key');
  // }

  constructor(
    private fb: UntypedFormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService,
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
